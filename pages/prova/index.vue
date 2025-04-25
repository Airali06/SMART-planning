<script setup lang = "ts">
import { usePrenotazioni } from '~/store/prenotazioni';
import  { useAuth } from '../../store/auth';
const prenotazioniStore = usePrenotazioni();

</script>

<template>

    <div style = "margin-left: 500px;">
        
        <DipendenteElement></DipendenteElement>
        <CalendarioProva></CalendarioProva>
        <CaricamentoElement></CaricamentoElement>
        <CaricamentoPopup></CaricamentoPopup>
        <OptionPostazione 
        tipo="Parcheggio" 
        :add = true></OptionPostazione>
        <PrenotazioneAdmin :prenotazione="prenotazioniStore.prenotazioni[0]"></PrenotazioneAdmin>
        <CalendarioElement></CalendarioElement>
    </div>
</template>
