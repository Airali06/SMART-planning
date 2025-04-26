<script setup lang="ts">
import { usePrenotazioni } from "~/store/prenotazioni";
import { useAuth } from "../../store/auth";
import type { Prenotazione } from "~/store/models/Prenotazione";
const prenotazioniStore = usePrenotazioni();
let date = prenotazioniStore.getDatePrenotate();

let filtrato = [] as Array<Prenotazione>;
const aggiorna = ref(0);
const data = ref("");

async function filtra(dataRicevuta: string) {
  data.value = dataRicevuta;
  console.log("data ", data.value);

  if (data.value) {
    const dataformattata = data.value + "";
    console.log("dataformattata ", dataformattata);
    //await nextTick();
    aggiorna.value++;
    filtrato = prenotazioniStore.filtraData(dataformattata);
    console.log(filtrato);
  }

  aggiorna.value + " ";
}
</script>

<template>
  <div class="contenitore1">
    <input type="text" v-model="aggiorna" style="display: none" />

    <div style="display: flex; transform: scale(1.6); margin-top: 110px">
      <CalendarioElement @notifica="filtra" :prenotati="date">
      </CalendarioElement>
    </div>

    <div style="transform: scale(0.82); margin-top: 40px" class="scorrimento">
      <PrenotazioneElement
        v-for="prenotazione in filtrato"
        :prenotazione="prenotazione"
        :key="aggiorna"
        style="margin-bottom: 10px"
      >
      </PrenotazioneElement>

      <div
        v-if="filtrato.length == 0 && data != ''"
        class="testo"
        style="color: #00467c"
      >
        nessuna prenotazione
      </div>
      <div v-if="data == ''" class="testo" style="color: #00467c">
        seleziona una data
      </div>
    </div>
  </div>
</template>

<style scoped>
.data1 {
  color: #00467c;
  border-radius: 10px;
  background: #ffffff;
  box-shadow: 0rem 0rem 1.25rem 0rem rgba(0, 0, 0, 0.15);
  position: relative;
  padding: 12px;
  z-index: 0;
  display: block;
  justify-items: center;
  align-items: center;
  align-content: center;
  justify-content: center;
  border: 0px;
  width: fit-content;
  height: fit-content;
}

.data1::before {
  content: "";
  border: 0px;
  position: absolute;
  inset: 0;
  border-radius: 10px;
  padding: 0.13rem;
  background: linear-gradient(90deg, rgba(0, 105, 186, 1), rgb(0, 60, 105));
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  z-index: -1;
}

.testo {
  font-size: 20px;
  margin-top: 10px;
}

.contenitore1 {
  display: block;
  justify-content: center;
  justify-items: center;
  width: fit-content;
  width: 500px;
  height: 690px;
  background: #ffffff;
  box-shadow: 0rem 0rem 1.25rem 0rem rgba(0, 0, 0, 0.15);
  border-radius: 12px;
  padding-top: 10px;
}

.scorrimento {
  overflow-y: auto;
  height: 200px;
}

.scorrimento::-webkit-scrollbar {
  width: 15px;
  border: 4px;
  border-color: #cce1f1;
}

.scorrimento::-webkit-scrollbar-track {
  background: #cce1f1; /* Colore di sfondo */
  border-radius: 10px;
  border: 4px;
}

.scorrimento::-webkit-scrollbar-thumb {
  background: #00345c;
  border-radius: 10px;
  border: 4px;
  border-color: #edccf1;
}

.scorrimento::-webkit-scrollbar-thumb:hover {
  background: #001c31;
}
</style>
