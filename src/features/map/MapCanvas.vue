<script setup>
import L from "leaflet";
import { onMounted, onUnmounted, ref, watch } from "vue";
import "leaflet/dist/leaflet.css";

const props = defineProps({
  items: { type: Array, required: true },
  era: { type: String, required: true },
  dark: { type: Boolean, required: true },
});

const emit = defineEmits(["markerSelect", "sourcesSelect"]);

const element = ref(null);
const tileStatus = ref("loading");

const tileUrls = {
  esri: {
    light:
      "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}",
    dark: "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}",
  },
  ign1950:
    "https://data.geopf.fr/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=GEOGRAPHICALGRIDSYSTEMS.MAPS.SCAN50.1950&STYLE=normal&FORMAT=image/jpeg&TILEMATRIXSET=PM&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}",
  etatmajor:
    "https://data.geopf.fr/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=GEOGRAPHICALGRIDSYSTEMS.ETATMAJOR40&STYLE=normal&FORMAT=image/jpeg&TILEMATRIXSET=PM&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}",
};

let map;
let tileLayer;
let tileUrl;
let markerLayer;
let resizeObserver;
let pendingFocus;
let resizeFrame;

function invalidateMapSize() {
  if (resizeFrame) cancelAnimationFrame(resizeFrame);

  resizeFrame = requestAnimationFrame(() => {
    map?.invalidateSize({ pan: false });
    resizeFrame = undefined;
  });
}

function makePopup(item) {
  const content = document.createElement("div");
  const badge = document.createElement("span");
  const title = document.createElement("h3");
  const date = document.createElement("div");
  const detail = document.createElement("div");
  const description = document.createElement("p");

  content.className = "popup-bubble";
  badge.className = "popup-badge";
  badge.style.backgroundColor = item.markerColor || "#8b4513";
  badge.textContent = item.categoryName || `Étape ${(item.index ?? 0) + 1}`;
  title.className = "popup-title";
  title.textContent = item.titre || item.nom;
  date.className = "popup-date";
  date.textContent = item.date || item.dates || "";
  detail.className = "popup-place";
  detail.textContent = item.lieu || item.adresse || "";
  description.className = "popup-text";
  description.textContent = item.desc || item.role || "";
  content.append(badge, title);

  if (date.textContent) content.append(date);

  if (detail.textContent) content.append(detail);

  if (description.textContent) content.append(description);

  const sources = item.sources || (item.source ? [item.source] : []);

  if (sources.length) {
    const sourceBox = document.createElement("div");
    const sourceButton = document.createElement("button");

    sourceBox.className = "popup-source-box";
    sourceBox.textContent = sources.join(", ");
    sourceButton.type = "button";
    sourceButton.className = "btn-popup-source-link";
    sourceButton.textContent = "Consulter les sources";
    sourceButton.addEventListener("click", (event) => {
      L.DomEvent.stopPropagation(event);
      emit("sourcesSelect");
    });
    content.append(sourceBox, sourceButton);
  }

  return content;
}

function updateTiles() {
  if (!map) return;

  const url =
    props.era === "esri" ? tileUrls.esri[props.dark ? "dark" : "light"] : tileUrls[props.era];
  element.value?.classList.toggle("map-dark-filter", props.dark && props.era !== "esri");

  if (tileLayer && tileUrl === url) return;

  tileLayer?.remove();

  const nextTileLayer = L.tileLayer(url, {
    attribution: props.era === "esri" ? "&copy; Esri" : "&copy; IGN",
    maxZoom: props.era === "esri" ? 16 : 18,
    maxNativeZoom: props.era === "esri" ? 16 : 15,
    minZoom: props.era === "esri" ? 1 : 6,
  });

  tileLayer = nextTileLayer;
  tileUrl = url;
  tileStatus.value = "loading";
  nextTileLayer.on("load", () => {
    if (tileLayer === nextTileLayer) tileStatus.value = "ready";
  });
  nextTileLayer.on("tileerror", () => {
    if (tileLayer === nextTileLayer) tileStatus.value = "error";
  });
  nextTileLayer.addTo(map);
}

function updateMarkers() {
  if (!map) return;

  markerLayer.clearLayers();
  const markers = props.items.map((item) => {
    const icon = L.divIcon({
      className: "history-marker",
      html: `<span style="background-color: ${item.markerColor || "#8b4513"}"><b>${(item.index ?? 0) + 1}</b></span>`,
      iconSize: [32, 40],
      iconAnchor: [16, 40],
      popupAnchor: [0, -38],
    });
    const marker = L.marker(item.coords, { icon }).bindPopup(makePopup(item), {
      autoPan: false,
      className: "custom-leaflet-popup",
    });
    marker.on("click", () => emit("markerSelect", item));

    return marker;
  });
  markers.forEach((marker) => markerLayer.addLayer(marker));

  if (props.items.length) {
    const bounds = L.latLngBounds(props.items.map((item) => item.coords));
    map.fitBounds(bounds, { padding: [60, 60], maxZoom: 15 });
  }
}

function focus(item) {
  if (!item) return;

  if (!map) {
    pendingFocus = item;
    return;
  }

  let selectedMarker;
  markerLayer.eachLayer((marker) => {
    if (!selectedMarker && marker.getLatLng().equals(item.coords)) selectedMarker = marker;
  });
  if (!selectedMarker) return;

  map.setView(item.coords, 16);
  selectedMarker.openPopup();
  invalidateMapSize();
}

defineExpose({ focus });

watch(() => [props.era, props.dark], updateTiles);
watch(() => props.items, updateMarkers);

onMounted(() => {
  map = L.map(element.value, { zoomControl: false }).setView([45.7578, 4.832], 13);
  L.control.zoom({ position: "bottomright" }).addTo(map);
  markerLayer = L.layerGroup().addTo(map);
  updateTiles();
  updateMarkers();

  if (pendingFocus) {
    focus(pendingFocus);
    pendingFocus = undefined;
  }

  if (typeof ResizeObserver !== "undefined") {
    resizeObserver = new ResizeObserver(invalidateMapSize);
    resizeObserver.observe(element.value);
  }
});

onUnmounted(() => {
  resizeObserver?.disconnect();
  if (resizeFrame) cancelAnimationFrame(resizeFrame);
  map?.remove();
  map = undefined;
  tileLayer = undefined;
  tileUrl = undefined;
  markerLayer = undefined;
});
</script>

<template>
  <div class="map-canvas-container">
    <div ref="element" class="map-canvas" role="region" aria-label="Carte interactive de Lyon" />
    <p v-if="tileStatus === 'loading'" class="map-load-message" role="status">
      Chargement du fond cartographique…
    </p>
    <p v-else-if="tileStatus === 'error'" class="map-load-message" role="alert">
      Le fond cartographique ne répond pas. Vérifiez votre connexion ou choisissez une autre époque.
    </p>
  </div>
</template>
