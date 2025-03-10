<script setup lang="ts">
const router = useRouter();
import { useAuth } from "../../store/auth";
const authStore = useAuth();
import { usePrenotazioni } from "../../store/prenotazioni";
import { usePostazioni } from "../../store/postazioni";
import type { Prenotazione } from "~/store/models/Prenotazione";
const prenotazioniStore = usePrenotazioni();
prenotazioniStore.ordinaData();
const postazioniStore = usePostazioni();

let filtrato = [] as Array<Prenotazione>;

  const aggiorna = ref();
const opzione = ref(0);
const route = useRoute();
if(route.query.option){//prendo i parametri passati alla pagina
  opzione.value = route.query.option as any;
}
selezionaOpzione(opzione.value);

function selezionaOpzione(n : number){
  //sceglie cosa visualizzare (oggi, tutte, calendario)
  //0 = oggi
  //1 = tutte
  //2 = calendario

  const today = new Date();
  const yy = String(today.getFullYear()); 
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const formattedDate = yy+"-"+mm+"-"+dd;
  prenotazioniStore.ordinaData();
  filtrato = [];

  opzione.value= n;
  if(n == 0)
  filtrato = prenotazioniStore.filtraData(formattedDate);
  if(n == 1){
    prenotazioniStore.ordinaData();
  filtrato = prenotazioniStore.prenotazioni;
  }
  if(n == 2)
  filtrato = [];
  aggiorna.value+=" ";
}

async function ricarica(){
  //filtrato.splice(0,filtrato.length);
  filtrato = prenotazioniStore.prenotazioni;
  console.log(prenotazioniStore.prenotazioni);
  prenotazioniStore.ordinaData();
  selezionaOpzione(opzione.value);
  aggiorna.value+=" ";
}
  

</script>


<template>

<input type = "text" v-model = "aggiorna" style = "display:none">
    <head>
    <!-- Caricamento del font e dei CSS -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Sulphur+Point:wght@300;400;700&display=swap"
      rel="stylesheet"
    />
  </head>
    
      
      <div style="margin-left: auto; margin-right: auto;" >
        <div class="header">
    
          <div style = "display: flex; display: box; width: fit-content; position: relative;">
            <img class="profile-1" src="../../img/profilo.png" />
            <img class="rectangle-27" src="../../img/rectangle.svg" />


            <div class = "informazioni">
                <span style="font-size: 30px;">{{ authStore.utente.cognome +" "+ authStore.utente.nome}}</span>
                <span>matricola</span>
                <span>{{ authStore.utente.id_utente}}</span>
                <span>password</span>
                <span>********</span>

            </div>
          </div>
    
        </div>
    
        <div style = "display: box; justify-items: center; width: 100%; margin-top: 27px; position: relative;">
          <div class="menu">
            <div class="menu-rect" 
            :style="opzione == 0 ? 'background: linear-gradient(90deg,rgba(0, 105, 186, 1) 0%,rgba(0, 47, 84, 1) 100%); color: white': ''"
            @click="selezionaOpzione(0)"
            >in scadenza oggi</div>


            <div class="menu-rect"
            :style="opzione == 1 ? 'background: linear-gradient(90deg,rgba(0, 105, 186, 1) 0%,rgba(0, 47, 84, 1) 100%); color: white' : ''"
            @click="selezionaOpzione(1)"
            >tutte le prenotazioni</div>

            <div class="menu-rect" 
            :style="opzione == 2 ? 'background: linear-gradient(90deg,rgba(0, 105, 186, 1) 0%,rgba(0, 47, 84, 1) 100%); color: white' : ''"
            @click="selezionaOpzione(2)"
            >calendario</div>

          </div>
        
     
       
    <div class = "area-prenotazioni" v-if = "opzione != 2">
        <PrenotazioneElement @notifica = "ricarica()"
        v-for = "prenotazione in filtrato"
        :prenotazione="prenotazione"
        style="margin: 10px; color: #00345c;"
        :key = aggiorna
        >
        </PrenotazioneElement>
        <div v-if = "filtrato.length == 0 && opzione != 2" 
        style="align-self: center; justify-self: center; color: #00345c; font-size: 20px;"> nessuna prenotazione </div>

      </div>

      <div style = "transform: scale(1.05); margin-top: 40px;" v-if = "opzione == 2">
          <CalendarioProva :key = aggiorna></CalendarioProva>
        </div>
    </div>
  </div> 
      
    </template>
    
    
    
<style scooped>

*{
  font-family: "Sulphur Point", serif;
  
}

.area-prenotazioni{
  overflow-y: auto; 
  height: 430px; 
  width: 560px; 
  margin-top: 30px;
}

.area-prenotazioni::-webkit-scrollbar{
   width: 15px;
   border: 4px;
  border-color: #CCE1F1;
}

.area-prenotazioni::-webkit-scrollbar-track {
  background: #CCE1F1; /* Colore di sfondo */
  border-radius: 10px;
  border: 4px;
}

.area-prenotazioni::-webkit-scrollbar-thumb {
  background:#00345c;
  border-radius: 10px;
  border: 4px;
  border-color: #edccf1;
}

.area-prenotazioni::-webkit-scrollbar-thumb:hover {
  background:#001c31;
}


.header{
  display: box;
  justify-items: center;
  background: #ffffff;
  padding: 45px;
  height: 240px;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.15);
}

.profile-1 {
  width: 210px;
  height: 210px;
  padding: 10px;
}

.rectangle-27 {
  border-radius: 0px;
  width: 339px;
  height: 204px;
  padding: 10px;
  overflow: visible;
  margin-left: -30px;
}
.menu {
  background: #CCE1F1;
  border-radius: 0.625rem;
  width: 580px;
  height: 35px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  /*box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.15);*/
}
.menu-rect{
  color: #002F54;
  text-align: center;
  font-family: "Sulphur Point", serif;
  font-style: normal;
  font-size: 16px;
  line-height: 24px;  
  font-weight: 1000;
  width: 178px;
  height: 35px;

  border-radius: 0.625rem;
  background: #CCE1F1;
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
    padding: 0.2rem;
    background: linear-gradient(90deg, rgba(0, 105, 186, 1), rgba(0, 47, 84, 1));
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    z-index: -1;
  }




.calendario {
  color: #002f54;
  text-align: left;
  font-family: "SulphurPoint-Bold", sans-serif;
  font-size: 16px;
  line-height: 24px;
  font-weight: 700;
  width: 203px;
  height: 30px;
}
.tutte-le-prenotazioni {
  color: #002f54;
  text-align: left;
  font-family: "SulphurPoint-Bold", sans-serif;
  font-size: 16px;
  line-height: 24px;
  font-weight: 700;
  width: 203px;
  height: 30px;
}

.informazioni{
  color: #002f54;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 55px;
  right: 105px;
  font-weight: 700;
}
</style>