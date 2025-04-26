<script setup lang="ts">
import { usePrenotazioni } from "~/store/prenotazioni";
import { useAuth } from "../../store/auth";
const prenotazioniStore = usePrenotazioni();
let date = prenotazioniStore.getDatePrenotate();
</script>

<template>
  <div style="width: fit-content; justify-self: center">
    <!-- <DipendenteElement></DipendenteElement>
    <CalendarioProva></CalendarioProva>
    <CaricamentoElement></CaricamentoElement>
    
    <CaricamentoPopup></CaricamentoPopup>
    <OptionPostazione tipo="Parcheggio" :add="true"></OptionPostazione>
    <PrenotazioneAdmin
      :prenotazione="prenotazioniStore.prenotazioni[0]"
    ></PrenotazioneAdmin>
    
  
    <Captcha></Captcha> -->
    <CalendarioPrenotazioni> </CalendarioPrenotazioni>
  </div>
</template>
