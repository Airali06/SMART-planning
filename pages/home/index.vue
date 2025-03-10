<script setup lang="ts">
const router = useRouter();
import { useAuth } from "../../store/auth";
const authStore = useAuth();
import { usePrenotazioni } from "../../store/prenotazioni";
import { usePostazioni } from "../../store/postazioni";
const prenotazioniStore = usePrenotazioni();
await prenotazioniStore.getPrenotazioni();
const postazioniStore = usePostazioni();
await postazioniStore.getPostazioni();
await postazioniStore.getCategorie();
console.log(prenotazioniStore.prenotazioni.length)


const today = new Date();
const yy = String(today.getFullYear()); 
const mm = String(today.getMonth() + 1).padStart(2, '0');
const dd = String(today.getDate()).padStart(2, '0');
const formattedDate = yy+"-"+mm+"-"+dd;
const aggiorna = ref("");

let in_scadenza_oggi = prenotazioniStore.filtraData(formattedDate);
console.log("in scadenza oggi ",in_scadenza_oggi);


async function ricarica(){
  //filtrato.splice(0,filtrato.length);
  in_scadenza_oggi = prenotazioniStore.filtraData(formattedDate);
  aggiorna.value += " ";
}

</script>

<template>

  <div style = "margin-left: 300px; position: relative;">


  <head>
    <!-- Caricamento del font e dei CSS -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Sulphur+Point:wght@300;400;700&display=swap"
      rel="stylesheet"
    />
  </head>

 
    <div class="home-1">
      <div
        class="z-planning"
        style="position: absolute; left: 9.6875rem; top: 5.625rem"
      >
        Z-Planning
      </div>

      <div class="prenota">Prenota</div>

      <div class="frame-1">
        <OptionPostazione
          :add="true"
          tipo="ScrivaniaStandard"
          class="zoom"
          @click="
            router.push({ name: 'nuova_prenotazione', query: { option: 'A1', modifica : 0} })
          "
        ></OptionPostazione>

        <OptionPostazione
          :add="true"
          tipo="ScrivaniaMonitor"
          class="zoom"
          @click="
            router.push({ name: 'nuova_prenotazione', query: { option: 'A2', modifica : 0} })"
        ></OptionPostazione>

        <OptionPostazione
          :add="true"
          tipo="SalaRiunioni"
          class="zoom"
          @click="
            router.push({ name: 'nuova_prenotazione', query: { option: 'B', modifica : 0} })"
        ></OptionPostazione>
      </div>
    </div>

    <div class="in-scadenza-oggi">In scadenza oggi</div>
    <div class="riepilogo">

      
      <div class="frame-2">
        <div class = "scorrimento">
          <PrenotazioneElement
          v-for="prenotazione in in_scadenza_oggi"
          :prenotazione= prenotazione
          :key = aggiorna
          @notifica="ricarica()"
          style="margin-top: 10px;"
          > </PrenotazioneElement>
        </div>

      </div>

      <div class="visualizza-tutte" @click="router.push({ name: 'account', query: { option: 1}})">visualizza tutte le prenotazioni</div>
    </div>

    <div style = "position: absolute; left: 690px;  top: 385px; transform: scale(0.87);">
      <CalendarioProva></CalendarioProva>
    </div>
    <!--<div class="frame-4"></div>-->
  
    
<div @click = "router.push({ name: 'prova'})">prova</div>

</div>


</template>

<style scoped>
* {
  font-family: "Sulphur Point", serif;
  color: #002f54;
}

a,
button,
input,
select,
h1,
h2,
h3,
h4,
h5,
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  border: none;
  text-decoration: none;
  background: none;

  -webkit-font-smoothing: antialiased;
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

menu,
ol,
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.zoom {
  transition: transform 0.3s ease-in-out;
}
.zoom:hover {
  transform: scale(1.08);
}

.sulphur-point-light {
  font-family: "Sulphur Point", serif;
  font-weight: 300;
  font-style: normal;
}

.sulphur-point-regular {
  font-family: "Sulphur Point", serif;
  font-weight: 400;
  font-style: normal;
}

.sulphur-point-bold {
  font-family: "Sulphur Point", serif;
  font-weight: 700;
  font-style: normal;
}

.home-1,
.home-1 * {
  box-sizing: border-box;
}
.home-1 {
  background: #ffffff;
  height: 52rem;
  position: relative;
  overflow: hidden;
}
.z-planning {
  background: linear-gradient(
    90deg,
    rgba(0, 105, 186, 1) 0%,
    rgba(0, 47, 84, 1) 100%
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: left;
  font-size: 4rem;
  line-height: 3.5rem;
  font-weight: 700;
  margin: 4px;
  width: fit-content;
  height: 8.8125rem;
}
.riepilogo {
  width: 35.375rem;
  height: 25.8125rem;
  position: absolute;
  left: 8.25rem;
  top: 24.5625rem;
  overflow: hidden;
}

.rectangle {
  border-radius: 0.625rem;
  background: #ffffff;
  box-shadow: 0rem 0rem 1.25rem 0rem rgba(0, 0, 0, 0.15);
  position: relative;
  padding: 2px;
  z-index: 0;
  display: block;
  justify-items: center;
  align-items: center;
  align-content: center;
  justify-content: center;
}

.rectangle::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 0.625rem;
  padding: 0.18rem;
  background: linear-gradient(90deg, rgba(0, 105, 186, 1), rgba(0, 47, 84, 1));
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  z-index: -1;
}

.frame-2 {

  
  background: #ffffff;
  border-radius: 0.625rem;
  
  width: 520px;
  height: 23.5rem;
  position: absolute;
  padding-right: 20px;
  left: 1.25rem;
  top: 1.1875rem;
  box-shadow: 0rem 0rem 1.25rem 0rem rgba(0, 0, 0, 0.15);
  overflow: hidden;
  display: flex;
  justify-content: center;
  flex-direction: column;


}

.visualizza-tutte {
  background: linear-gradient(90deg, rgba(0, 105, 186, 1) 0%, #002f54 100%);
  border-radius: 0.625rem;
  width: 22.3125rem;
  height: 2.125rem;
  position: absolute;
  left: 6.5rem;
  top: 23.6875rem;
  text-align: center;
  color: #ffffff;
  padding: 7px;
  cursor:pointer;
  transition: transform 0.3s ease-in-out;
}

.visualizza-tutte:hover {
  transform: scale(1.04);
  background: linear-gradient(90deg, rgb(0, 82, 145) 0%, #002038 100%);
}

.prenota {
  color: #0069ba;
  text-align: left;
  font-size: 1.5rem;
  line-height: 1.5rem;
  font-weight: 700;
  position: absolute;
  left: 10rem;
  top: 9.75rem;
  width: 5.5rem;
  height: 1.8125rem;
}
.in-scadenza-oggi {
  color: #0069ba;
  text-align: left;
  font-size: 1.5rem;
  line-height: 1.5rem;
  font-weight: 700;
  position: absolute;
  left: 10rem;
  top: 23.5625rem;
  width: 12.6875rem;
  height: 1.875rem;
}
.frame-1 {
  padding: 0 27px 0 27px;
  align-items: center;
  background: #ffffff;
  border-radius: 0.625rem;
  display: flex;
  justify-content: space-between;
  width: 520px;
  height: 9.9375rem;
  position: absolute;
  left: 9.5rem;
  top: 11.9375rem;
  box-shadow: 0rem 0rem 1.25rem 0rem rgba(0, 0, 0, 0.15);
  overflow: hidden;
}

.frame-4 {
  background: #ffffff;
  border-radius: 0.625rem;
  width: 31.6875rem;
  height: 37.375rem;
  position: absolute;
  right: 3.125rem;
  top: 11.9375rem;
  box-shadow: 0rem 0rem 1.25rem 0rem rgba(0, 0, 0, 0.25);
  overflow: hidden;
}
</style>
