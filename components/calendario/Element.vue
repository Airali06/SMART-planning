<script setup lang="ts">
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
  evidenzia: "" as string,
});

import { defineEmits } from "vue";
const emit = defineEmits(["notifica"]);
const notifica = (data) => {
  emit("notifica", data);
};

const attributes = ref([]);

// Attributo per i giorni prenotati (blu)
if (props.prenotati.length) {
  attributes.value.push({
    key: "prenotati",
    dates: props.prenotati.map((date) => new Date(date)),
    content: {
      style: {
        backgroundColor: "#00467c",
        color: "white",
        borderRadius: "30%",
        padding: "0.5em",
        textAlign: "center",
      },
    },
    popover: {
      label: "Prenotato",
    },
  });
}

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

if (props.evidenzia) {
  attributes.value.push({
    key: "occupati",
    dates: new Date(props.evidenzia),
    content: {
      style: {
        backgroundColor: "#b5daff",
        color: "#00467c",
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

function inviaData(data: Date) {
  const year = data.date.getFullYear();
  const month = String(data.date.getMonth() + 1).padStart(2, "0");
  const day = String(data.date.getDate()).padStart(2, "0");
  let data_formattata = year + "-" + month + "-" + day;
  console.log(data_formattata);
  notifica(data_formattata);
}
</script>

<template>
  <VCalendar
    expande
    :attributes="attributes"
    borderless
    title-position="center"
    @dayclick="inviaData"
    style="display: block"
    color="#00467c"
  />
</template>

<style scoped></style>
