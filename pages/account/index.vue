<script setup lang="ts">
const router = useRouter();
import { useAuth } from "../../store/auth";
const authStore = useAuth();
import { usePrenotazioni } from "../../store/prenotazioni";
import { usePostazioni } from "../../store/postazioni";
import type { Prenotazione } from "~/store/models/Prenotazione";
import { useDipendenti } from "~/store/dipendenti";
const dipendentiStore = useDipendenti();
const prenotazioniStore = usePrenotazioni();
prenotazioniStore.ordinaData();
const postazioniStore = usePostazioni();
let modifica_password = false;
let filtrato = [] as Array<Prenotazione>;
const password0 = ref("");
const password1 = ref("");
const aggiorna = ref();
const opzione = ref(0);
const route = useRoute();
let errore = "";
let coordinatore = {} as any; 

if(authStore.utente.livello == 1){
coordinatore = await dipendentiStore.loadDipendenteById(authStore.utente.id_coordinatore);
}
if (route.query.option) {
  //prendo i parametri passati alla pagina
  opzione.value = route.query.option as any;
}
selezionaOpzione(opzione.value);

function selezionaOpzione(n: number) {
  //sceglie cosa visualizzare (oggi, tutte, calendario)
  //0 = oggi
  //1 = tutte
  //2 = calendario

  const today = new Date();
  const yy = String(today.getFullYear());
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const formattedDate = yy + "-" + mm + "-" + dd;
  prenotazioniStore.ordinaData();
  filtrato = [];

  opzione.value = n;
  if (n == 0) filtrato = prenotazioniStore.filtraData(formattedDate);
  if (n == 1) {
    prenotazioniStore.ordinaData();
    filtrato = prenotazioniStore.prenotazioni;
  }
  if (n == 2) filtrato = [];
  aggiorna.value += " ";
}

async function ricarica() {
  //filtrato.splice(0,filtrato.length);
  filtrato = prenotazioniStore.prenotazioni;
  console.log(prenotazioniStore.prenotazioni);
  prenotazioniStore.ordinaData();
  selezionaOpzione(opzione.value);
  aggiorna.value += " ";
}

async function updatePassword(){
  errore = "";
    if(password0.value != password1.value){
      errore = "le password non corrispondono";
      password0.value = "";
      password1.value = "";
      aggiorna.value += " ";
      return;
    }

    if(!authStore.testaPassword(password0.value)){
      errore = "deve contenere maiuscole, minuscole, caratteri speciali, numeri"
      aggiorna.value += " ";
      return;
    }
    console.log("passo")
    modifica_password = false;
    aggiorna.value += " ";
    await authStore.updateUtente(password0.value);
}
</script>

<template>
  <input type="text" v-model="aggiorna" style="display: none" />
  <head>
    <!-- Caricamento del font e dei CSS -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Sulphur+Point:wght@300;400;700&display=swap"
      rel="stylesheet"
    />
  </head>

  <div style="margin-left: auto; margin-right: auto">
    <div class="header">
      <div
        style="
          display: flex;
          display: box;
          width: fit-content; 
          position: relative;
        "
      >
        <img v-if = "authStore.utente.genere == 'M'" class="profile-1" src="../../img/profilo.png" />
        <img v-if = "authStore.utente.genere == 'F'"  class="profile-1" src="../../img/profiloF2.png" />
        <img class="rectangle-27" src="../../img/rectangle.svg" />

        <div class="informazioni">
          <span style="font-size: 30px">{{
            authStore.utente.cognome + " " + authStore.utente.nome
          }}</span>
          <span>matricola</span>
          <span>{{ authStore.utente.id_utente }}</span>
          <span>password</span>
            <div style = "display: flex; flex-direction: row;">
              <span>********</span>
              <div @click = "modifica_password = true; aggiorna+= ' '" style = "background: #00345c; padding: 2px; height: 26px; border-radius: 10px; width: 26px; position: absolute; right: 40px; bottom: 15px;"><img src = "../../img/edit.png" width="25px"></div>
            </div>
            <span style = "position: absolute; bottom: -33px; width: 300px; display:flex; flex-direction:column" v-if = "authStore.utente.livello == 1"> 
                <span style = "display:flex"> coordinatore</span> <span> {{coordinatore?.username}} </span> 
            </span>

            <span style = "position: absolute; font-size: 25px; bottom: -30px; width: 300px; display:flex; flex-direction:column; color: #4292cf" v-if = "authStore.utente.livello == 2"> 
                coordinatore 
            </span>

          </div>
      </div>
    </div>

    <div
      style="
        display: box;
        justify-items: center;
        width: 100%;
        margin-top: 27px;
        position: relative;
      "
    >
      <div class="menu">
        <div
          class="menu-rect"
          :style="
            opzione == 0
              ? 'background: linear-gradient(90deg,rgba(0, 105, 186, 1) 0%,rgba(0, 47, 84, 1) 100%); color: white'
              : ''
          "
          @click="selezionaOpzione(0)"
        >
          in scadenza oggi
        </div>

        <div
          class="menu-rect"
          :style="
            opzione == 1
              ? 'background: linear-gradient(90deg,rgba(0, 105, 186, 1) 0%,rgba(0, 47, 84, 1) 100%); color: white'
              : ''
          "
          @click="selezionaOpzione(1)"
        >
          tutte le prenotazioni
        </div>

        <div
          class="menu-rect"
          :style="
            opzione == 2
              ? 'background: linear-gradient(90deg,rgba(0, 105, 186, 1) 0%,rgba(0, 47, 84, 1) 100%); color: white'
              : ''
          "
          @click="selezionaOpzione(2)"
        >
          calendario
        </div>
      </div>

      <div class="area-prenotazioni" v-if="opzione != 2">
        <PrenotazioneElement
          @notifica="ricarica()"
          v-for="prenotazione in filtrato"
          :prenotazione="prenotazione"
          style="margin: 10px; color: #00345c"
          :key="aggiorna"
        >
        </PrenotazioneElement>
        <div
          v-if="filtrato.length == 0 && opzione != 2"
          style="
            align-self: center;
            justify-self: center;
            color: #00345c;
            font-size: 20px;
          "
        >
          nessuna prenotazione
        </div>
      </div>

      <div
        style="transform: scale(0.75); margin-top: -60px"
        v-if="opzione == 2"
      >
        <CalendarioPrenotazioni :key="aggiorna"></CalendarioPrenotazioni>
      </div>
    </div>
  </div>



  <div
 v-if = "modifica_password"    
    class="overlay"
    style="position: absolute; left: 0px"
  >

    <div
      class="password"
      style="justify-self: center; margin-top: 300px;"
    >
      <div style="display: flex; flex-direction: row">

        <div class="nuova-password">
            <span style = "font-size: 25px;">nuova</span>
            <span style="font-size: 35px; font-weight: 700; margin-top: -35px;"
              >Password</span
            >
        </div>

        <img
          src="../../img/key.png"
          style="width: 55px; height: 55px; margin-left: 10px"
        />
      </div>

      
      <div class = "rectangle-1" style = "padding: 3px; margin-top: 25px; ">
        <label style = "color:#00345c; position: absolute; top: -22px">nuova password</label>
          <input type = "text" class = "input" v-model="password0">
      </div>


       
      <div class = "rectangle-1" style = "padding: 3px; margin-top: 25px; margin-bottom: 6px;">
        <label style = "color:#00345c; position: absolute; top: -22px">conferma password</label> 
          <input type = "text" class = "input" v-model="password1">
      </div>
            <span style = "width: 250px; display: flex; text-align: center; color: #8a1717;">{{ errore }}</span>
      <div class = "conferma" @click = "updatePassword()">
        conferma
      </div>

      

      <div class="x" @click="errore = ''; password0 = ''; password1 = ''; modifica_password = false; aggiorna+= ' '">
        <img src="../../img/remove.png" height="50px" />
      </div>
    </div>
  </div>

</template>

<style scoped>
* {
  font-family: "Sulphur Point", serif;
}

.area-prenotazioni {
  overflow-y: auto;
  height: 430px;
  width: 560px;
  margin-top: 30px;
}

.conferma{
  background: linear-gradient(90deg,rgba(0, 105, 186, 1) 0%,rgba(0, 47, 84, 1) 100%);
  color: #ffffff;
  border-radius: 0.825rem;
  font-weight: 700;
  text-align: center;
  width: 200px;
  height: 30px;
  padding: 3px;
  font-size: 18px;
  margin-top: 6px;
  cursor: pointer;
}

.password {
  border-radius: 0.925rem;
  background: #ffffff;
  box-shadow: 0rem 0rem 1.25rem 0rem rgba(0, 0, 0, 0.15);
  position: relative;
  padding: 2px;
  z-index: 0;
  width: 320px;
  height: 350px;
  display: block;
  justify-items: center;
  align-items: center;
  align-content: center;
  justify-content: center;
  display: block;
}

.rectangle-1{
  margin-top: -5px;
  border-radius: 0.625rem;
  background: #ffffff;
  box-shadow: 0rem 0rem 1.25rem 0rem rgba(0, 0, 0, 0.15);
  position: relative;
  z-index: 1;
  width: 200px;
}

.rectangle-1::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 0.625rem;
  padding: 0.125rem; 
  background: linear-gradient(
    to bottom, 
    white 0%, 
    white 20%, 
    white 50%, 
    rgba(0, 47, 84, 1) 50%, 
    rgba(0, 105, 186, 1) 100%
  ); 
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  z-index: -1;
  width: 200px;
}

.input{
    border-radius: 20px;
  padding-left: 20px;
  color: #00355C;
  font-weight: 700;
  font-size: 20px;
  border: 2px solid transparent;
  background: none;
  width: 170px;

}
.input:focus{
    background-color: #eef6fc;
    border-color: none; 
    border-width: 2px;
    transition: border 0.2s ease-in-out;
    outline: none; 
    width: 170px;
}

.nuova-password{
  background: linear-gradient(
    90deg,
    rgb(0, 89, 156) 0%,
    rgb(0, 41, 73) 100%
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: left;
  line-height: 3.5rem;
  font-weight: 700;
  justify-self: center;
  display: flex;
  flex-direction: column;
}



.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 105, 186, 0.2); /* Azzurro semitrasparente */
  z-index: 1000; /* Assicura che sia sopra gli altri elementi */
  display: block;
  justify-content: center;
  justify-items: center;
  align-items: center;
}

.x {
  padding: 5px;
  background: rgba(0, 47, 84, 1);

  border-radius: 25px;
  align-items: center;
  position: absolute;
  top: -35px;
  right: -35px;
  height: 85px;
  width: 85px;
  scale: 0.4;
  display: flex;
  justify-content: center;
  vertical-align: middle;
  z-index: 1000;
}

.area-prenotazioni::-webkit-scrollbar {
  width: 15px;
  border: 4px;
  border-color: #cce1f1;
}

.area-prenotazioni::-webkit-scrollbar-track {
  background: #cce1f1; /* Colore di sfondo */
  border-radius: 10px;
  border: 4px;
}

.area-prenotazioni::-webkit-scrollbar-thumb {
  background: #00345c;
  border-radius: 10px;
  border: 4px;
  border-color: #edccf1;
}

.area-prenotazioni::-webkit-scrollbar-thumb:hover {
  background: #001c31;
}

.header {
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
  background: #cce1f1;
  border-radius: 0.625rem;
  width: 580px;
  height: 35px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  /*box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.15);*/
}
.menu-rect {
  color: #002f54;
  text-align: center;
  font-family: "Sulphur Point", serif;
  font-style: normal;
  font-size: 16px;
  line-height: 24px;
  font-weight: 1000;
  width: 178px;
  height: 35px;

  border-radius: 0.625rem;
  background: #cce1f1;
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

.informazioni {
  color: #002f54;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 45px;
  left: 290px;
  font-weight: 700;
}


</style>
