<template>
  <VCalendar is-expanded :attributes="attributes" title-position="center" />
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  occupati: {
    type: Array,
    default: () => [],
  },
  prenotati: {
    type: Array,
    default: () => [],
  },
});

const attributes = ref([]);

// Attributo per i giorni occupati (rosso)
if (props.occupati.length) {
  attributes.value.push({
    key: "occupati",
    dates: props.occupati.map((date) => new Date(date)),
    content: {
      style: {
        backgroundColor: "#ef4444",
        color: "white",
        borderRadius: "30%",
        padding: "0.5em",
        textAlign: "center",
      },
    },
    popover: {
      label: "Occupato",
    },
  });
}

// Attributo per i giorni prenotati (blu)
if (props.prenotati.length) {
  attributes.value.push({
    key: "prenotati",
    dates: props.prenotati.map((date) => new Date(date)),
    content: {
      style: {
        backgroundColor: "#3b82f6",
        color: "white",
        borderRadius: "50%",
        padding: "0.5em",
        textAlign: "center",
      },
    },
    popover: {
      label: "Prenotato",
    },
  });
}
</script>
