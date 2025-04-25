<script setup lang="ts">
import { usePrenotazioni } from "~/store/prenotazioni";
import { useAuth } from "../../store/auth";
const prenotazioniStore = usePrenotazioni();
</script>

<template>
  <div style="width: fit-content; justify-self: center;">
    <!-- <DipendenteElement></DipendenteElement>
    <CalendarioProva></CalendarioProva>
    <CaricamentoElement></CaricamentoElement>
    
    <CaricamentoPopup></CaricamentoPopup>
    <OptionPostazione tipo="Parcheggio" :add="true"></OptionPostazione>
    <PrenotazioneAdmin
      :prenotazione="prenotazioniStore.prenotazioni[0]"
    ></PrenotazioneAdmin>
    <CalendarioElement
      :occupati="['2025-04-28', '2025-04-30']"
      :prenotati="['2025-05-01', '2025-05-03']"
    > </CalendarioElement>
   -->
    <Captcha></Captcha>

  </div>
</template>
