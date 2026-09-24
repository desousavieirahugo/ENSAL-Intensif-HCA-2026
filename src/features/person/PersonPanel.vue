<script setup>
defineProps({
  person: { type: Object, required: true },
  steps: { type: Array, required: true },
  maxGpsPoints: { type: Number, required: true },
});

const emit = defineEmits(["stepSelect", "gps"]);

const baseUrl = import.meta.env.BASE_URL;
</script>

<template>
  <section id="sidebar-detail-view" aria-label="Détails du parcours">
    <div class="profil-hero">
      <img :src="`${baseUrl}${person.img}`" :alt="`Portrait de ${person.nom}`" decoding="async" />
      <div class="profil-info">
        <h3>{{ person.nom }}</h3>
        <span>{{ person.role }}</span>
      </div>
    </div>

    <blockquote class="quote-box">{{ person.quote }}</blockquote>
    <p class="bio-text">{{ person.bio }}</p>

    <section class="etapes-section" aria-label="Étapes chronologiques du parcours">
      <div class="etapes-title">
        <span>Étapes du parcours</span>
        <small>Sélectionnez une étape pour la situer sur la carte</small>
      </div>
      <div id="liste-etapes" class="timeline-container">
        <button
          v-for="(step, index) in steps"
          :key="`${index}-${step.titre}`"
          type="button"
          class="etape-card"
          :data-index="index"
          @click="emit('stepSelect', step)"
        >
          <span class="etape-number" :style="`background-color: ${person.color}`">{{
            index + 1
          }}</span>
          <span class="etape-info">
            <span class="etape-header">
              <span class="etape-titre">{{ step.titre }}</span>
              <span class="etape-date">{{ step.date }}</span>
            </span>
            <span class="etape-lieu">{{ step.lieu }}</span>
            <span class="etape-desc">{{ step.desc }}</span>
            <span v-if="step.sources?.length || step.source" class="point-source-box">
              <span class="point-source-text">
                <strong>{{
                  (step.sources || [step.source]).length > 1
                    ? "Sources utilisées :"
                    : "Source utilisée :"
                }}</strong>
                {{ (step.sources || [step.source]).join(", ") }}
              </span>
            </span>
          </span>
        </button>
        <p v-if="!steps.length" class="empty-state">
          Aucune étape n’est visible pour cette période cartographique.
        </p>
      </div>
    </section>

    <section class="sidebar-gps-global-section" aria-label="Navigation GPS piétonne">
      <button type="button" class="btn-gps-global" :disabled="!steps.length" @click="emit('gps', steps)">
        {{ steps.length > maxGpsPoints
          ? `Itinéraire des ${maxGpsPoints} premières étapes (sur ${steps.length})`
          : 'Lancer l’itinéraire piéton dans le GPS' }}
      </button>
    </section>
  </section>
</template>
