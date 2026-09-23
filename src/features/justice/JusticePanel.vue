<script setup>
import { computed } from "vue";

const props = defineProps({
  categories: { type: Object, required: true },
  places: { type: Array, required: true },
  filter: { type: String, required: true },
});

const emit = defineEmits(["filter", "itemSelect", "gps"]);

const filters = [
  { id: "tous", label: "Tous les lieux" },
  { id: "juridiques", label: "Palais de Justice" },
  { id: "carceraux", label: "Prisons" },
  { id: "memoire", label: "Lieux de mémoire" },
  { id: "execution", label: "Lieux d’exécution" },
];

const activeFilterLabel = computed(
  () => filters.find((option) => option.id === props.filter)?.label || "Tous les lieux",
);
</script>

<template>
  <section id="sidebar-justice-view" aria-label="Lieux de justice">
    <div class="profil-hero justice-hero">
      <div class="profil-info">
        <h3>Lieux de Justice</h3>
        <span>Édifices judiciaires, prisons historiques et lieux de mémoire à Lyon.</span>
      </div>
    </div>

    <div
      class="justice-filter-section"
      role="group"
      aria-label="Filtrer les édifices par catégorie"
    >
      <span class="filter-label">Filtrer par catégorie :</span>
      <div class="filter-pills">
        <button
          v-for="option in filters"
          :key="option.id"
          type="button"
          class="filter-pill"
          :class="filter === option.id ? 'active' : ''"
          :aria-pressed="filter === option.id"
          @click="emit('filter', option.id)"
        >
          {{ option.label }}
        </button>
      </div>
    </div>

    <section class="etapes-section" aria-label="Liste des édifices historiques">
      <div class="etapes-title">
        <span>{{ activeFilterLabel }}</span>
        <small>Cliquez sur un édifice pour le centrer sur la carte</small>
      </div>
      <div id="liste-lieux-justice">
        <button
          v-for="place in places"
          :key="`${place.category}-${place.nom}`"
          type="button"
          class="lieu-justice-card"
          @click="emit('itemSelect', place)"
        >
          <span
            class="lieu-badge"
            :style="`background-color: ${categories[place.category].color}`"
            >{{ place.index + 1 }}</span
          >
          <span class="lieu-info">
            <span class="lieu-header">
              <span class="lieu-titre">{{ place.nom }}</span>
              <span class="lieu-cat-tag" :style="`color: ${categories[place.category].color}`">
                {{ place.categoryName }}
              </span>
            </span>
            <span v-if="place.dates" class="lieu-dates-tag">{{ place.dates }}</span>
            <span class="lieu-adresse">{{ place.adresse }}</span>
            <span class="lieu-desc">{{ place.role }}</span>
            <span v-if="place.sources?.length || place.source" class="point-source-box">
              <span class="point-source-text">
                <strong>Source :</strong> {{ (place.sources || [place.source]).join(", ") }}
              </span>
            </span>
          </span>
        </button>
        <p v-if="!places.length" class="empty-state">
          Aucun lieu n’existe pour cette période et ce filtre.
        </p>
      </div>
    </section>

    <section
      class="sidebar-gps-global-section"
      aria-label="Navigation GPS vers les lieux de justice"
    >
      <button type="button" class="btn-gps-global" @click="emit('gps', places)">
        Lancer l’itinéraire dans le GPS
      </button>
    </section>
  </section>
</template>
