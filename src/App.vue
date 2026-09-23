<script setup>
import { computed, defineAsyncComponent, nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import { dataLieuxJustice, dataPersonnes } from "./domain/datasets.js";
import { pointExistePourFond } from "./domain/dateFilters.js";
import { rechercherPatrimoine } from "./domain/search.js";
import JusticePanel from "./features/justice/JusticePanel.vue";
import LandingView from "./features/landing/LandingView.vue";
import LegalDialog from "./features/legal/LegalDialog.vue";
import MapLoadState from "./features/map/MapLoadState.vue";
import PersonPanel from "./features/person/PersonPanel.vue";

const MapCanvas = defineAsyncComponent({
  loader: () => import("./features/map/MapCanvas.vue"),
  loadingComponent: MapLoadState,
  errorComponent: MapLoadState,
  delay: 0,
  timeout: 10000,
});

const view = ref("landing");
const selectedId = ref(null);
const justiceFilter = ref("tous");
const era = ref("esri");
const dark = ref(false);
const search = ref("");
const showSearch = ref(false);
const mapSearchInput = ref(null);
const showLegal = ref(false);
const sidebarOpen = ref(false);
const activeItem = ref(null);
const mapCanvas = ref(null);
const drawerDragOffset = ref(0);
const isDraggingDrawer = ref(false);
let drawerTouchStart;

const categories = dataLieuxJustice;
const people = computed(() =>
  Object.entries(dataPersonnes).filter(([id]) => id !== "chaban_delmas"),
);
const person = computed(() => (selectedId.value ? dataPersonnes[selectedId.value] : null));
const visibleSteps = computed(
  () =>
    person.value?.etapes
      .filter((step) => pointExistePourFond(step, era.value))
      .map((step, index) => ({ ...step, markerColor: person.value.color, index })) || [],
);

const places = computed(() =>
  Object.entries(categories).flatMap(([category, group]) =>
    group.lieux
      .map((place, index) => ({
        ...place,
        category,
        categoryName: group.nomCategorie,
        markerColor: group.color,
        index,
      }))
      .filter((place) => pointExistePourFond(place, era.value))
      .filter((place) => justiceFilter.value === "tous" || place.category === justiceFilter.value),
  ),
);

const mapItems = computed(() => (person.value ? visibleSteps.value : places.value));
const eraOptions = [
  { key: "esri", label: "Aujourd’hui" },
  { key: "ign1950", label: "1950" },
  { key: "etatmajor", label: "1820–1866" },
];

const searchResults = computed(() =>
  rechercherPatrimoine(search.value, view.value, selectedId.value),
);

function openPerson(id) {
  if (!dataPersonnes[id]) return;

  selectedId.value = id;
  view.value = "map";
  justiceFilter.value = "tous";
  sidebarOpen.value = false;
  activeItem.value = null;
}

function openJustice() {
  selectedId.value = null;
  view.value = "justice";
  justiceFilter.value = "tous";
  sidebarOpen.value = false;
  activeItem.value = null;
}

function goHome() {
  view.value = "landing";
  selectedId.value = null;
  search.value = "";
  showSearch.value = false;
  showLegal.value = false;
  sidebarOpen.value = false;
  activeItem.value = null;
}

async function focusItem(item) {
  if (!item) return;

  activeItem.value = item;
  await nextTick();
  mapCanvas.value?.focus(item);
}

watch(mapCanvas, (canvas) => {
  if (canvas && activeItem.value) canvas.focus(activeItem.value);
});

async function selectResult(result) {
  search.value = "";
  showSearch.value = false;

  if (result.type === "person") {
    openPerson(result.id);
    return;
  }

  if (result.type === "step") {
    openPerson(result.id);
    await nextTick();
    await focusItem(result.item);
    return;
  }

  openJustice();
  justiceFilter.value = result.category;
  await nextTick();
  await focusItem(result.item);
}

function openGps(items) {
  const points = items.map((item) => item.coords).filter(Boolean);

  if (!points.length) return;

  const isApple =
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

  if (points.length === 1) {
    const [lat, lng] = points[0];
    const url = isApple
      ? `https://maps.apple.com/?daddr=${lat},${lng}&dirflg=w`
      : `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=walking`;

    window.open(url, "_blank", "noopener,noreferrer");
    return;
  }

  const [originLat, originLng] = points[0];
  const [destinationLat, destinationLng] = points.at(-1);
  const waypoints = points
    .slice(1, -1)
    .slice(0, 9)
    .map((point) => point.join(","))
    .join("|");
  const url = isApple
    ? `https://maps.apple.com/?saddr=${originLat},${originLng}&daddr=${points
        .slice(1)
        .map((point) => point.join(","))
        .join("+to:")}&dirflg=w`
    : `https://www.google.com/maps/dir/?api=1&origin=${originLat},${originLng}&destination=${destinationLat},${destinationLng}${waypoints ? `&waypoints=${encodeURIComponent(waypoints)}` : ""}&travelmode=walking`;

  window.open(url, "_blank", "noopener,noreferrer");
}

function onKeydown(event) {
  if (event.key === "Escape") {
    showLegal.value = false;
    showSearch.value = false;
    sidebarOpen.value = false;
  }
}

function startDrawerGesture(event) {
  if (window.innerWidth >= 769 || !sidebarOpen.value || event.touches.length !== 1) return;

  const target = event.target;
  const sidebar = event.currentTarget;
  const startedInHandle = target.closest(".drawer-handle-zone");
  const startedInHeader = target.closest(".sidebar-header");
  const canDrag = startedInHandle || startedInHeader || sidebar.scrollTop <= 2;

  if (!canDrag) return;

  const touch = event.touches[0];

  drawerTouchStart = {
    x: touch.clientX,
    y: touch.clientY,
    time: Date.now(),
  };
}

function moveDrawerGesture(event) {
  if (!drawerTouchStart || window.innerWidth >= 769 || event.touches.length !== 1) return;

  const touch = event.touches[0];
  const deltaY = touch.clientY - drawerTouchStart.y;
  const deltaX = touch.clientX - drawerTouchStart.x;

  if (deltaY <= 0 || Math.abs(deltaY) <= Math.abs(deltaX)) return;

  if (!isDraggingDrawer.value && event.currentTarget.scrollTop > 2) return;

  if (event.cancelable) event.preventDefault();

  isDraggingDrawer.value = true;
  drawerDragOffset.value = deltaY;
}

function finishDrawerGesture() {
  if (!drawerTouchStart) return;

  const elapsed = Math.max(1, Date.now() - drawerTouchStart.time);
  const velocity = drawerDragOffset.value / elapsed;
  const shouldClose =
    drawerDragOffset.value > 50 || (drawerDragOffset.value > 25 && velocity > 0.35);

  drawerTouchStart = undefined;
  isDraggingDrawer.value = false;
  drawerDragOffset.value = 0;

  if (shouldClose) sidebarOpen.value = false;
}

watch(dark, (value) => {
  document.body.dataset.theme = value ? "dark" : "light";
});

watch(showSearch, (isOpen) => {
  if (isOpen) nextTick(() => mapSearchInput.value?.focus());
});

watch(era, () => {
  if (activeItem.value && !pointExistePourFond(activeItem.value, era.value)) {
    activeItem.value = null;
  }
});

onMounted(() => {
  document.body.dataset.theme = "light";
  window.addEventListener("keydown", onKeydown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", onKeydown);
});
</script>

<template>
  <div class="application-shell">
    <div class="sr-only" aria-live="polite" aria-atomic="true">
      {{ activeItem ? `${activeItem.titre || activeItem.nom} sélectionné` : "" }}
    </div>

    <a class="skip-link" href="#app" @click.prevent="openPerson('jean_moulin')">
      Passer directement à la carte interactive
    </a>

    <LandingView
      v-if="view === 'landing'"
      v-model="search"
      :people="people"
      :results="searchResults"
      @choose="(result) => (result.type === 'justice' ? openJustice() : selectResult(result))"
      @legal="showLegal = true"
    />

    <main v-else id="app" class="map-app">
      <div id="map-wrapper">
        <MapCanvas
          ref="mapCanvas"
          id="map"
          :items="mapItems"
          :era="era"
          :dark="dark"
          @marker-select="focusItem"
          @sources-select="showLegal = true"
        />

        <header class="app-header" aria-label="Navigation cartographique">
          <div class="app-header-left">
            <button type="button" class="header-btn back-btn" @click="goHome">
              <span aria-hidden="true">‹</span>
              Accueil
            </button>
            <div class="header-title-wrapper">
              <span class="header-badge-sub">{{ person ? "Parcours" : "Patrimoine" }}</span>
              <h1 class="header-context-title">{{ person?.nom || "Lieux de Justice" }}</h1>
            </div>
          </div>
          <div class="app-header-right">
            <button
              type="button"
              class="theme-toggle-square-btn"
              :aria-expanded="showSearch"
              aria-controls="header-search-modal"
              aria-label="Rechercher dans la page"
              @click="showSearch = !showSearch"
            >
              <span class="search-toggle-icon" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </span>
            </button>
            <button
              type="button"
              class="theme-toggle-square-btn"
              :aria-label="dark ? 'Activer le mode clair' : 'Activer le mode sombre'"
              :aria-pressed="dark"
              @click="dark = !dark"
            >
              <span class="theme-toggle-icon" aria-hidden="true">
                <svg
                  v-if="dark"
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="12" cy="12" r="4" />
                  <path
                    d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"
                  />
                </svg>
                <svg
                  v-else
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              </span>
            </button>
          </div>
        </header>

        <section
          v-if="showSearch"
          id="header-search-modal"
          class="header-search-modal-container"
          aria-label="Recherche cartographique"
        >
          <button
            type="button"
            class="header-search-backdrop"
            aria-label="Fermer la recherche"
            @click="showSearch = false"
          />
          <div class="header-search-centered">
            <div class="header-search-box">
              <span class="search-box-icon" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </span>
              <label class="sr-only" for="map-search-input">
                Rechercher dans la vue active
              </label>
              <input
                id="map-search-input"
                ref="mapSearchInput"
                v-model="search"
                autofocus
                placeholder="Rechercher dans cette page..."
              >
              <button
                type="button"
                class="header-search-close-btn"
                aria-label="Fermer la recherche"
                @click="showSearch = false"
              >
                ×
              </button>
            </div>
            <div
              v-if="searchResults.length"
              class="search-results header-search-results active"
            >
              <button
                v-for="result in searchResults"
                :key="result.key"
                type="button"
                class="search-result-item"
                @click="selectResult(result)"
              >
                <span class="search-result-title">{{ result.label }}</span>
                <span class="search-result-desc">{{ result.description }}</span>
              </button>
            </div>
          </div>
        </section>

        <button
          v-if="sidebarOpen"
          type="button"
          class="backdrop-overlay active sidebar-backdrop-button"
          :style="
            drawerDragOffset ? { opacity: Math.max(0, 1 - drawerDragOffset / 280) } : undefined
          "
          aria-label="Fermer le volet"
          @click="sidebarOpen = false"
        />

        <nav class="map-bottom-dock" aria-label="Contrôles cartographiques et étapes">
          <div class="epoch-pills" role="group" aria-label="Choisir l’époque cartographique">
            <button
              v-for="option in eraOptions"
              :key="option.key"
              type="button"
              class="epoch-pill"
              :class="era === option.key ? 'active' : ''"
              :aria-pressed="era === option.key"
              @click="era = option.key"
            >
              {{ option.label }}
            </button>
          </div>
          <span class="dock-divider" aria-hidden="true" />
          <button
            type="button"
            class="dock-menu-btn"
            :aria-expanded="sidebarOpen"
            @click="sidebarOpen = !sidebarOpen"
          >
            {{ sidebarOpen ? "Masquer" : person ? "Voir les étapes" : "Voir les lieux" }}
          </button>
        </nav>
      </div>

      <aside
        id="sidebar"
        :class="[sidebarOpen ? 'open' : 'desktop-collapsed', { dragging: isDraggingDrawer }]"
        :style="drawerDragOffset ? { transform: `translateY(${drawerDragOffset}px)` } : undefined"
        aria-label="Informations historiques et étapes du parcours"
        @touchstart.passive="startDrawerGesture"
        @touchmove="moveDrawerGesture"
        @touchend="finishDrawerGesture"
        @touchcancel="finishDrawerGesture"
      >
        <div class="drawer-handle-zone" aria-hidden="true">
          <span class="drawer-handle" />
        </div>
        <header class="sidebar-header">
          <div class="brand"><h2>Lyon</h2></div>
          <button
            type="button"
            class="sidebar-close-btn"
            aria-label="Fermer le volet latéral"
            @click="sidebarOpen = false"
          >
            ×
          </button>
        </header>

        <PersonPanel
          v-if="person"
          :person="person"
          :steps="visibleSteps"
          @step-select="focusItem"
          @gps="openGps"
        />
        <JusticePanel
          v-else
          :categories="categories"
          :places="places"
          :filter="justiceFilter"
          @filter="justiceFilter = $event"
          @item-select="focusItem"
          @gps="openGps"
        />

        <footer class="sidebar-legal-footer">
          <span>© 2026 ENSAL</span>
          <span aria-hidden="true">•</span>
          <button type="button" class="footer-legal-link" @click="showLegal = true">
            Mentions légales &amp; sources
          </button>
        </footer>
      </aside>
    </main>

    <LegalDialog :open="showLegal" @close="showLegal = false" />
  </div>
</template>
