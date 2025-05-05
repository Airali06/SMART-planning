<script setup lang="ts">
const router = useRouter();
import { useAuth } from "../../../store/auth";
const authStore = useAuth();
import { usePrenotazioni } from "../../../store/prenotazioni";
import { usePostazioni } from "../../../store/postazioni";
import { useDipendenti } from "../../../store/dipendenti";
import type { Prenotazione } from "~/store/models/Prenotazione";
import type { Utente } from "~/store/models/Utente";
const prenotazioniStore = usePrenotazioni();
prenotazioniStore.ordinaData();
const dipendentiStore = useDipendenti();
const route = useRoute();
const aggiorna = ref();
let coordinatore = {} as Utente;
let prenotazioniDipendente = [] as Array<Prenotazione>;
let dipendente = {} as Utente;
if(route.query.utente != ""){
    prenotazioniDipendente = await dipendentiStore.getPrenotazioniDipendente(route.query.utente as any) as any;
    dipendente = dipendentiStore.getDipendenteById(route.query.utente as any) as Utente;
    console.log(prenotazioniDipendente, "PRENOTAZIONI DIPENDENTE")
}

if( dipendente.livello == 1){
coordinatore = await dipendentiStore.loadDipendenteById(dipendente.id_coordinatore);
}


async function ricarica(){
  prenotazioniDipendente = await dipendentiStore.getPrenotazioniDipendente(route.query.utente as any) as any;
  aggiorna.value += " ";
}



</script>


<template>
 <input type = "text" v-model = "aggiorna" style = "display: none">
<input type = "text" v-model = "aggiorna" style = "display:none">
 
    
      
      <div style="margin-left: auto; margin-right: auto;" >
        <div class="header">
    
          <div style = "display: flex; display: box; width: fit-content; position: relative;">
            <div>
              <img v-if = "dipendente.genere == 'M'" class="profile-1" src="../../../img/profilo.png" />
              <img v-else  class="profile-1" src="../../../img/profiloF2.png" />
              
              <img class="rectangle-27" src="../../../img/rectangle.svg" />

                <div v-if = "authStore.utente.livello == 3" class = "modifica"  @click="router.push({ path:'/admin/nuovo_dipendente', query: { idDaModificare : dipendente.id_utente} })">
                  <img src="../../../img/edit.png" style ="width: 40px;">
                </div>

            </div>

            <div class = "informazioni">
                <span style="font-size: 25px;">{{ dipendente.cognome +" "+ dipendente.nome}}</span>
                <span>matricola</span>
                <span>{{ dipendente.id_utente}}</span>
                <span>password</span>
                <span>********</span>
                <span style = "font-size: 22px;display:flex;color: #4292cf" v-if ="dipendente.livello == 2"> 
                coordinatore 
                </span>
                <span v-if ="dipendente.livello == 1"> 
                coordinatore 
                </span>
                <span v-if ="dipendente.livello == 1"> 
                {{ coordinatore?.username }}
                </span>

            </div>
          </div>
    
        </div>
    
        <div style = "display: box; justify-items: center; width: 100%; margin-top: 27px; position: relative;">
       
            <div class = "area-prenotazioni">
                <PrenotazioneElement v-if = "authStore.utente.livello == 2"
                v-for = "prenotazione in prenotazioniDipendente"
                :prenotazione="prenotazione"
                style="margin: 10px; color: #00345c;"
                :key = aggiorna
                >
                </PrenotazioneElement>

                <PrenotazioneAdmin @notifica = "ricarica()"
                v-if = "authStore.utente.livello == 3"
                v-for = "prenotazione in prenotazioniDipendente"
                :prenotazione="prenotazione"
                style="margin: 10px; color: #00345c;"
                :key = aggiorna
                >
                </PrenotazioneAdmin>
            </div>
  </div> 
</div> 
      
    </template>
    
    
    
<style scoped>

*{
  font-family: "Sulphur Point", serif;
  
}

.area-prenotazioni{
  overflow-y: auto; 
  height: 470px; 
  width: 660px; 
  margin-top: 30px;
}

.area-prenotazioni::-webkit-scrollbar{
   width: 15px;
   border: 4px;
  border-color: #CCE1F1;
}

.modifica{
  background: linear-gradient(
    90deg,
    rgb(0, 120, 211) 0%,
    rgb(0, 58, 102) 100%
  );
  height: 45px;
  width: 55px;
  margin-top: 5px;
  border: 0px;
  padding-top: 5px;
  padding-bottom: 5px;
  text-align: center;
  color: white;
  border-radius: 20px;
  font-family: "Sulphur Point", serif;
  font-weight: 400;
  font-style: normal;
  justify-self: center;
  font-size: 17px;
  display: block;
  cursor:pointer;
  position: absolute;
  left: 0px;
  top: 150px;
  transition: transform 0.3s ease-in-out;
}
.modifica:hover {
  transform: scale(1.08);
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
  top: 50px;
  left: 290px;
  font-weight: 700;
}
</style>