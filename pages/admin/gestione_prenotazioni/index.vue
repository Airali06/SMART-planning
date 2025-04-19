<script setup lang = "ts">

import { useAuth } from '~/store/auth';
const authStore = useAuth();
import { useDipendenti } from "~/store/dipendenti";

const dipendentiStore = useDipendenti();
await dipendentiStore.getDipendentiCoordinatore(authStore.utente.id_utente);
import { usePrenotazioni } from '~/store/prenotazioni';
import { usePostazioni } from '~/store/postazioni';
import type { Postazione } from '~/store/models/Postazione';
import type { Prenotazione } from '~/store/models/Prenotazione';
const data = ref("");
const aggiorna = ref("");
const prenotazioniStore = usePrenotazioni();
await prenotazioniStore.getPrenotazioni();
let filtrato = prenotazioniStore.prenotazioni;
aggiorna.value+=" ";
let categoria_selezionata = "";
let stato_selezionato = -1;

function selezionaCategoria(n : string){

    console.log("categorie","n "+n, "cat "+categoria_selezionata)
    if(categoria_selezionata == n){
        categoria_selezionata = "";
        aggiorna.value+=" ";
        filtra();
        return;
    }
    categoria_selezionata = n;
    aggiorna.value+=" ";
    filtra();

}

function selezionaStato(n : number){
    if(stato_selezionato == n){
        stato_selezionato = -1;
        return;
    }
    stato_selezionato = n;
}


function filtra(){
    filtrato = [...prenotazioniStore.prenotazioni];

    if(data.value != ""){
    filtrato = [...prenotazioniStore.filtraData(data.value)];
    aggiorna.value += " ";
    }

    if(categoria_selezionata != ""){
        let temp = [] as Array<Prenotazione>
            //temp.splice(0, temp.length);
            console.log("TEMPPPPP: ",temp);
        const postazioniStore = usePostazioni();



        filtrato.forEach((pren) => {

            console.log( postazioniStore.getPostazioneById(
                pren.id_postazione
                ).id_categoria, ";",categoria_selezionata);

            if (
                postazioniStore.getPostazioneById(
                pren.id_postazione
                ).id_categoria == categoria_selezionata
            ){
                temp.push({...pren});
                console.log(pren)
            
            }
            console.log("temp: ",temp);
            })
            
            filtrato = [];
            filtrato = [...temp];
            console.log("filtrato: ",filtrato);
    }

    if(stato_selezionato != -1){ //seleziona prenotazioni abilitate o disabilitate
        filtrato =  filtrato.filter((obj) => obj.flag  == stato_selezionato);
    }
    aggiorna.value+=" ";



}

function reset(){
    data.value = "";
    categoria_selezionata = "";
    stato_selezionato = 0;
    filtrato = [...prenotazioniStore.prenotazioni];
    aggiorna.value+=" ";
}

</script>

<template>

    <input type = "text" v-model = "aggiorna" style = "display: none">

    <div style = "justify-self: center; width: fit-content; display: flex; flex-direction: row;">

        <div class = "scorrimento" style = "transform: scale(0.8); width: 680px">
  
                <PrenotazioneAdmin
                v-for = "prenotazione in filtrato"
                :key = aggiorna
                :prenotazione= prenotazione
                >

                </PrenotazioneAdmin>
        </div>

            <div style = "margin-top: 130px;">
               

                    <div style  ="display:flex; flex-wrap: wrap; width: 330px; height: fit-content; transform: scale(0.8);">
                        
                        <OptionPostazione
                        @click = "selezionaCategoria('A1')"
                        :add="false"
                        tipo="ScrivaniaStandard"
                        style = "margin: 10px;"  
                        :style="{ transform: categoria_selezionata == 'A1' ? 'scale(1.26)' : 'scale(1)' }"           
                        ></OptionPostazione>

                        <OptionPostazione
                        @click = "selezionaCategoria('A2')"
                        :add="false"
                        style = "margin: 10px;"
                        tipo="ScrivaniaMonitor"    
                        :style="{ transform: categoria_selezionata == 'A2' ? 'scale(1.26)' : 'scale(1)' }"          
                        ></OptionPostazione>

                        <OptionPostazione
                        @click = "selezionaCategoria('B')"
                        style = "margin: 10px;"
                        :add="false"
                        tipo="SalaRiunioni"
                        :style="{ transform: categoria_selezionata == 'B' ? 'scale(1.26)' : 'scale(1)' }"             
                        ></OptionPostazione>

                        <OptionPostazione
                        @click = "selezionaCategoria('C')"
                        style = "margin: 10px;"
                        :add="false"
                        tipo="Parcheggio"
                        :style="{ transform: categoria_selezionata == 'C' ? 'scale(1.26)' : 'scale(1)' }"
                        ></OptionPostazione>
                    </div>

                    <input type = "date" class = "data1" @change="filtra()" v-model = "data" style = "margin-top: 35px; font-size: 25px; font-weight: 700; height: 50px; width: 340px; margin-left: -20px;" >
                    
                    
                    <div class = "rectangle" @click = "reset()">
                        reset
                    </div>
            
                </div>
    </div>

</template>

<style scoped>
* {
  font-family: "Sulphur Point", serif;
  color: #002f54;
}


.data1 {
    color: #00467c;
    border-radius: 10px;
    background: #ffffff;
    box-shadow: 0rem 0rem 1.25rem 0rem rgba(0, 0, 0, 0.15);
    position: relative;
    padding: 6px;
    z-index: 0;
    display: block;
    justify-items: center;
    align-items: center;
    align-content: center;
    justify-content: center;
    border: 0px;
    width: 50px;
    height: fit-content;
    transform: scale(0.67);
  }
  
  .data1::before {
    content: "";
    border: 0px;
    position: absolute;
    inset: 0;
    border-radius: 10px;
    padding: 0.23rem;
    background: linear-gradient(90deg, rgba(0, 105, 186, 1), rgb(0, 60, 105));
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    z-index: -1;
  }

  .rectangle{
    color: #00467c;
    border-radius: 10px;
    background: #ffffff;
    box-shadow: 0rem 0rem 1.25rem 0rem rgba(0, 0, 0, 0.15);
    position: relative;
    padding: 6px;
    z-index: 0;
    display: block;
    justify-items: center;
    align-items: center;
    align-content: center;
    justify-content: center;
    border: 0px;
    width: 230px;
    height: fit-content;
    text-align: center;
    margin-left: 36px

  }

  .rectangle::before {
    content: "";
    border: 0px;
    position: absolute;
    inset: 0;
    border-radius: 10px;
    padding: 0.23rem;
    background: linear-gradient(90deg, rgba(0, 105, 186, 1), rgb(0, 60, 105));
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    z-index: -1;
  }


.scorrimento{
  overflow-y: auto; 
  height: 80%;
  width: 515px;
}

.scorrimento::-webkit-scrollbar{
   width: 15px;
   border: 4px;
  border-color: #CCE1F1;
}

.scorrimento::-webkit-scrollbar-track {
  background: #CCE1F1; /* Colore di sfondo */
  border-radius: 10px;
  border: 4px;
}

.scorrimento::-webkit-scrollbar-thumb {
  background:#00345c;
  border-radius: 10px;
  border: 4px;
  border-color: #edccf1;
}

.scorrimento::-webkit-scrollbar-thumb:hover {
  background:#001c31;
}

.scorrimento{
    height: 45.5rem;
    width: fit-content;
}

</style>