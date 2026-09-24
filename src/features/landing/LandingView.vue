<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

defineProps({
  people: { type: Array, required: true },
  results: { type: Array, required: true },
  modelValue: { type: String, required: true },
})

const emit = defineEmits(['update:modelValue', 'choose', 'legal'])

const baseUrl = import.meta.env.BASE_URL
const searchContainer = ref(null)
const showResults = ref(false)

function updateSearch(event) {
  emit('update:modelValue', event.target.value)
  showResults.value = event.target.value.trim().length >= 2
}

function closeResultsOutsideSearch(event) {
  if (!searchContainer.value?.contains(event.target)) showResults.value = false
}

onMounted(() => document.addEventListener('click', closeResultsOutsideSearch))
onUnmounted(() => document.removeEventListener('click', closeResultsOutsideSearch))
</script>

<template>
  <main
    id="landing"
    aria-label="Page d'accueil des parcours historiques de Lyon"
  >
    <div class="landing-content">
      <header class="landing-header">
        <span class="landing-badge">Mémoire &amp; Patrimoine</span>
        <h1>Lyon</h1>
        <p class="landing-subtitle">
          Découvrez les parcours de personnes historiques à Lyon, ainsi que le patrimoine carcéral
          et judiciaire lyonnais.
        </p>
        <div
          ref="searchContainer"
          class="landing-search-container"
        >
          <label
            class="sr-only"
            for="landing-search-input"
          >
            Rechercher dans tout le patrimoine historique
          </label>
          <span
            class="search-icon"
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 24 24"
              width="17"
              height="17"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle
                cx="11"
                cy="11"
                r="8"
              />
              <line
                x1="21"
                y1="21"
                x2="16.65"
                y2="16.65"
              />
            </svg>
          </span>
          <input
            id="landing-search-input"
            :value="modelValue"
            placeholder="Rechercher un lieu, une date..."
            autocomplete="off"
            @input="updateSearch"
          />
          <div
            v-if="showResults && results.length"
            class="active landing-search-results search-results"
          >
            <button
              v-for="result in results"
              :key="result.key"
              type="button"
              class="search-result-item"
              @click="emit('choose', result)"
            >
              <span class="search-result-title">{{ result.label }}</span>
              <span class="search-result-desc">{{ result.description }}</span>
            </button>
          </div>
          <p
            v-else-if="showResults"
            class="active landing-search-results search-empty search-results"
            role="status"
          >
            Aucun résultat pour cette recherche.
          </p>
        </div>
      </header>

      <nav
        class="buttons-container"
        aria-label="Sélectionner un parcours historique"
      >
        <button
          type="button"
          class="img-btn img-btn-justice"
          aria-label="Explorer les lieux de justice et prisons historiques"
          @click="emit('choose', { type: 'justice' })"
        >
          <img
            :src="`${baseUrl}images/palais_justice.jpg`"
            alt="Palais de Justice des 24 Colonnes à Lyon"
            decoding="async"
          />
          <span class="btn-overlay">
            <span class="btn-label">Lieux de Justice</span>
            <span class="btn-action">
              Explorer les lieux
              <span
                class="arrow"
                aria-hidden="true"
              >
                →
              </span>
            </span>
          </span>
        </button>

        <button
          v-for="[id, person] in people"
          :key="id"
          type="button"
          class="img-btn"
          :aria-label="`Découvrir le parcours de ${person.nom}`"
          @click="emit('choose', { type: 'person', id })"
        >
          <img
            :src="`${baseUrl}${person.img}`"
            :alt="`Portrait de ${person.nom}`"
            decoding="async"
          />
          <span class="btn-overlay">
            <span class="btn-label">{{ person.nom }}</span>
            <span class="btn-action">
              Découvrir le parcours
              <span
                class="arrow"
                aria-hidden="true"
              >
                →
              </span>
            </span>
          </span>
        </button>
      </nav>
    </div>

    <footer class="landing-footer">
      <span>© 2026 ENSAL</span>
      <span aria-hidden="true">•</span>
      <button
        type="button"
        class="footer-legal-link"
        @click="emit('legal')"
      >
        Mentions légales &amp; sources
      </button>
    </footer>
  </main>
</template>
