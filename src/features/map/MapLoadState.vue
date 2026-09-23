<script setup>
import { computed } from "vue";

const props = defineProps({
  error: { type: Error, default: null },
});

const message = computed(() =>
  props.error
    ? "La carte n’a pas pu être initialisée. Rechargez la page pour réessayer."
    : "Préparation de la carte…",
);
</script>

<template>
  <div class="map-component-state" :role="error ? 'alert' : 'status'">
    {{ message }}
  </div>
</template>
