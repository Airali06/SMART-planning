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
    }else{
      stato_selezionato = n;
    }
    
    aggiorna.value+= " ";
    filtra();
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

async function ricarica(){
  //filtrato.splice(0,filtrato.length);


  console.log("sto ricaricando");

  //--------------reset forzato per forzare il render
  await nextTick();
  filtra();
  aggiorna.value+=" ";

}

function reset(){
    data.value = "";
    categoria_selezionata = "";
    filtrato = [...prenotazioniStore.prenotazioni];
    aggiorna.value+=" ";
}

async function reloadPrenotazioni(){
  reset();
  await prenotazioniStore.getPrenotazioni();
}

</script>

<template>

    <input type = "text" v-model = "aggiorna" style = "display: none">

    <div style = "justify-self: center; width: fit-content; display: flex; flex-direction: row; margin-top: 80px">

      <div style = "display: flex; flex-direction: column;">

                <div class = "titolo">
                    <span style = "font-size: 30px">Gestione</span>
                    <span>Prenotazioni</span>
                </div>

                <div class = "counter" style = "position: relative;">
                  <img src = "../../../img/ricarica.png" width="35px" style = "position: absolute; z-index: 50; left: -50px; cursor: pointer" @click="reloadPrenotazioni()">
                    <span class = "n-prenotazioni" style = "font-size: 23px; color : #ffffff; width: 30px;">{{ filtrato.length }}</span>
                    <span >prenotazioni trovate</span>
                </div>

          <div class = "scorrimento" style = "transform: scale(1); width: 680px; margin-top: 10px; height: 550px;">

                  <PrenotazioneAdmin @notifica = "ricarica()"
                  v-for = "prenotazione in filtrato"
                  :key = aggiorna
                  :prenotazione= prenotazione
                  >

                  </PrenotazioneAdmin>
                  <div style = "justify-self: center; font-size: 25px;" v-if = "filtrato.length == 0">nessuna prenotazione trovata</div>
          </div>
        </div>



            <div style = "margin-top: 140px;">

              <div style = "margin-left: 40px; font-weight: 700; font-size: 28px; margin-bottom: 15px">
                filtra prenotazioni
              </div>

              <div style = "margin-left: 40px; font-weight: 400; font-size: 20px;">
                filtra categoria
              </div>
               

                    <div style  ="display:flex; flex-wrap: wrap; width: 330px; height: fit-content; transform: scale(0.8); margin-top: -20px">
                        
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

                    <div style = "margin-left: 40px; font-weight: 400; font-size: 20px; margin-top: -20px">
                        filtra data
                    </div>

                    <input type = "date" class = "data1" @change="filtra()" v-model = "data" style = "margin-top: 0px; font-size: 25px; font-weight: 700; height: 50px; width: 340px; margin-left: -20px;" >
                    

                    <div style = "margin-left: 40px; font-weight: 400; font-size: 20px; margin-top: 5px">
                        filtra stato
                    </div>


            <div class="rectangle" style = "display: flex; flex-direction: row; margin-top: 10px;;">
                  <div class="menu-rect" 
                  :style="stato_selezionato == 0 ? 'background: linear-gradient(90deg,rgba(0, 105, 186, 1) 0%,rgba(0, 47, 84, 1) 100%); color: white': ''"
                  @click="selezionaStato(0)"
                  >abilitate</div>


                  <div class="menu-rect"
                  :style="stato_selezionato == 1 ? 'background: linear-gradient(90deg,rgba(0, 105, 186, 1) 0%,rgba(0, 47, 84, 1) 100%); color: white' : ''"
                  @click="selezionaStato(1)"
                  >disabilitate</div>
          </div>



                    
                    <div class = "reset" @click = "reset()" style = "margin-top: 25px;">
                        annulla filtri
                    </div>
            
                </div>
    </div>

</template>

<style scoped>
* {
  font-family: "Sulphur Point", serif;
  color: #002f54;
}

.titolo{
  background: linear-gradient(
    90deg,
    rgba(0, 105, 186, 1) 0%,
    rgba(0, 47, 84, 1) 100%
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 60px;
  display: flex;
  flex-direction: column;
  margin: 0px;
  margin-left: 90px;
}

.counter{
  font-size: 20px;
  margin-left: 90px;
  margin-top: 20px;;

  
}


.menu-rect{
  color: #002F54;
  text-align: center;
  font-family: "Sulphur Point", serif;
  font-style: normal;
  font-size: 16px;
  line-height: 24px;  
  font-weight: 1000;
  margin-left: 7px;
  margin-right: 7px;
  width: 95px;
  height: 30px;

  border-radius: 0.625rem;
  position: relative;
  padding: 2px;
  z-index: 0;
  display: block;
  justify-items: center;
  align-items: center;
  align-content: center;
  justify-content: center;

}

.menu-rect::before {
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

  .reset{
    margin-top: 20px;
    background: linear-gradient(
    90deg,
    rgba(0, 105, 186, 1) 0%,
    rgba(0, 47, 84, 1) 100%
  );
    color: white;
    border-radius: 10px;
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
    margin-left: 36px;
    font-weight: 700;

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
    padding: 0.13rem;
    background: linear-gradient(90deg, rgba(0, 105, 186, 1), rgb(0, 60, 105));
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    z-index: -1;
  }


.scorrimento{
  overflow-y: auto; 
  height: 70%;
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


.n-prenotazioni{
    background: linear-gradient(
    90deg,
    rgba(0, 105, 186, 1) 0%,
    rgba(0, 47, 84, 1) 100%
  );
    color: white;
    border-radius: 10px;
    padding: 5px;
    padding-left: 7px;
    padding-right: 7px;
    margin-right: 13px;

  }

</style>