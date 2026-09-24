<script setup>
import { nextTick, ref, watch } from 'vue'

const props = defineProps({ open: { type: Boolean, required: true } })

const emit = defineEmits(['close'])
const closeButton = ref(null)
let previouslyFocused

watch(
  () => props.open,
  async open => {
    if (open) {
      previouslyFocused = document.activeElement
      await nextTick()
      closeButton.value?.focus()
      return
    }

    previouslyFocused?.focus?.()
  },
)

function trapFocus(event) {
  if (event.key !== 'Tab') return

  const dialog = event.currentTarget
  const focusable = dialog.querySelectorAll('a[href], button:not([disabled]), [tabindex="0"]')
  const first = focusable[0]
  const last = focusable[focusable.length - 1]

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last?.focus()
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first?.focus()
  }
}
</script>

<template>
  <div
    v-show="open"
    class="legal-overlay"
    @click.self="emit('close')"
  >
    <section
      class="floating-panel legal-modal open"
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
      @keydown="trapFocus"
    >
      <header class="panel-header">
        <!-- Preserve the line break required by vue/singleline-html-element-content-newline. -->
        <!-- prettier-ignore -->
        <h2 id="legal-modal-title">
          Mentions légales &amp; sources
        </h2>
        <button
          ref="closeButton"
          type="button"
          class="close-panel-btn"
          aria-label="Fermer"
          @click="emit('close')"
        >
          ×
        </button>
      </header>
      <div class="legal-modal-body panel-body">
        <section class="legal-section">
          <h3>Conception &amp; direction scientifique</h3>
          <p>
            Projet cartographique et mémoriel développé dans le cadre des enseignements et
            recherches de l’ENSAL, dédié à l’histoire urbaine, à la mémoire de la Résistance, aux
            lieux de répression et aux procès historiques à Lyon (1940–1944).
          </p>
          <p>
            Ce site propose une restitution spatiale et chronologique des réseaux clandestins, des
            sites de détention et des lieux de justice sous l’Occupation.
          </p>
        </section>

        <section class="legal-section">
          <h3>Hébergement &amp; diffusion</h3>
          <p>Le site est diffusé sous forme statique sur GitHub Pages, GitHub, Inc.</p>
          <p>
            88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA.
            <a
              href="https://pages.github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Site GitHub Pages
            </a>
          </p>
        </section>

        <section
          id="legal-sources-section"
          class="legal-section"
        >
          <h3>Fonds d’archives &amp; références historiques</h3>
          <ul class="legal-sources-list">
            <li>
              Centre d’Histoire de la Résistance et de la Déportation (CHRD Lyon) : fonds
              iconographiques, témoignages oraux, documents d’époque sur l’École de Santé Militaire
              et le réseau Libération-Sud.
            </li>
            <li>
              Mémorial National de la Prison de Montluc : archives des registres d’écrou, parcours
              des internés et dossiers de la cellule de Jean Moulin.
            </li>
            <li>
              Archives du Département du Rhône et de la Métropole de Lyon : séries W et Y,
              administration sous l’Occupation, procès Barbie et police de Vichy.
            </li>
            <li>
              Archives Nationales et Cour d’Assises du Rhône : minutes et enregistrements
              audiovisuels du procès de Klaus Barbie (1987).
            </li>
            <li>
              Institut National de l’Information Géographique et Forestière (IGN) : flux WMTS, carte
              topographique 1950 et carte d’État-Major (1820–1866).
            </li>
          </ul>
        </section>

        <section class="legal-section">
          <h3>Propriété intellectuelle &amp; droits d’usage</h3>
          <p>
            Les données cartographiques anciennes sont issues du domaine public et des données
            ouvertes de l’IGN. Les photographies et notices biographiques sont présentées à des fins
            pédagogiques, de mémoire et de valorisation patrimoniale.
          </p>
        </section>
      </div>
    </section>
  </div>
</template>
