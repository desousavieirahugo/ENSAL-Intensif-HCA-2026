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
let markerLayer;
let resizeObserver;
let pendingFocus;

function makePopup(item) {
  const content = document.createElement("div");
  const title = document.createElement("strong");
  const date = document.createElement("p");
  const detail = document.createElement("p");
  const description = document.createElement("p");

  title.textContent = item.titre || item.nom;
  date.textContent = item.date || item.dates || "";
  detail.textContent = item.lieu || item.adresse || "";
  description.textContent = item.desc || item.role || "";
  content.append(title);

  if (date.textContent) content.append(date);

  if (detail.textContent) content.append(detail);

  if (description.textContent) content.append(description);

  const sources = item.sources || (item.source ? [item.source] : []);

  if (sources.length) {
    const sourceButton = document.createElement("button");
    const sourceText = document.createElement("p");

    sourceText.textContent = sources.join(", ");
    sourceButton.type = "button";
    sourceButton.textContent = "Consulter les sources";
    sourceButton.addEventListener("click", (event) => {
      L.DomEvent.stopPropagation(event);
      emit("sourcesSelect");
    });
    content.append(sourceText, sourceButton);
  }

  return content;
}

function updateTiles() {
  if (!map) return;

  tileLayer?.remove();
  const url =
    props.era === "esri" ? tileUrls.esri[props.dark ? "dark" : "light"] : tileUrls[props.era];

  const nextTileLayer = L.tileLayer(url, {
    attribution: props.era === "esri" ? "&copy; Esri" : "&copy; IGN",
    maxZoom: props.era === "esri" ? 16 : 18,
    minZoom: props.era === "esri" ? 1 : 6,
  });

  tileLayer = nextTileLayer;
  tileStatus.value = "loading";
  nextTileLayer.on("load", () => {
    if (tileLayer === nextTileLayer) tileStatus.value = "ready";
  });
  nextTileLayer.on("tileerror", () => {
    if (tileLayer === nextTileLayer) tileStatus.value = "error";
  });
  nextTileLayer.addTo(map);

  element.value?.classList.toggle("map-dark-filter", props.dark && props.era !== "esri");
}

function updateMarkers() {
  if (!map) return;

  markerLayer?.clearLayers();
  const markers = props.items.map((item) => {
    const icon = L.divIcon({
      className: "history-marker",
      html: `<span style="background-color: ${item.markerColor || "#8b4513"}"><b>${(item.index ?? 0) + 1}</b></span>`,
      iconSize: [32, 40],
      iconAnchor: [16, 40],
      popupAnchor: [0, -38],
    });
    const marker = L.marker(item.coords, { icon }).bindPopup(makePopup(item), { autoPan: false });
    marker.on("click", () => emit("markerSelect", item));

    return marker;
  });
  markerLayer = L.layerGroup(markers).addTo(map);

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

  map.setView(item.coords, 16);
  markerLayer.eachLayer((marker) => {
    if (marker.getLatLng().equals(item.coords)) marker.openPopup();
  });
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
    resizeObserver = new ResizeObserver(() => map?.invalidateSize());
    resizeObserver.observe(element.value);
  }
});

onUnmounted(() => {
  resizeObserver?.disconnect();
  map?.remove();
  map = undefined;
  tileLayer = undefined;
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
