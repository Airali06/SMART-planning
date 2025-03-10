<script setup lang = "ts">
import { usePrenotazioni } from "../../store/prenotazioni";
const prenotazioniStore = usePrenotazioni();
import { usePostazioni } from "../../store/postazioni";
const postazioniStore = usePostazioni();


const aggiorna = ref("");
const selectedDate = new Date(); 
await postazioniStore.checkPostazioniOccupate(selectedDate);
const giorni = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];
let data = giorni[selectedDate.getDay()] +"\t-\t" +selectedDate.getDate()+"/"+(selectedDate.getMonth()as number*1+1)+"/"+ selectedDate.getFullYear();


await nextTick();
const mappa = ref(null);
</script>

<template>

<div style = "margin-left: 300px; position: relative;">


  <div class="contnteiner1">

    <div class="map_container" >

      <img src = "../../img/mappa1.png" width="703px" style = "position : absolute; z-index: 0; top: 25px;">

        <MappaPostazioni ref = "mappa"
        :key = aggiorna
        style="z-index: 100"
        >

        </MappaPostazioni>



         <span class = "titolo" >
            Mappa          
        </span>
        <span class = "data">{{ data }}</span>

    </div>


  </div>

  


</div>
</template>

<style scoped>

*{ font-family: "Sulphur Point", serif;
    color: #002f54;
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

.data{
    position:absolute; 
    font-size: 30px; 
    top: -50px;
    left: 250px;
    background: linear-gradient(
    90deg,
    rgba(0, 105, 186, 1) 0%,
    rgba(0, 47, 84, 1) 100%
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

menu, ol, ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
}


.contnteiner1,
.contnteiner1 * {
  box-sizing: border-box;
}
.prenota-1 {
  background: #ffffff;
  height: 832px;
  position: relative;
  overflow: hidden;
}
.map_container {
  background: #ffffff;
  border-radius: 10px;
  width: 703px;
  height: 452px;
  display: flex;
  align-items: center;
  position: absolute;
  left: 133px;
  top: 284px;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.15);
}
.rectangle-6 {
  
  background: #ffffff;
  border-radius: 10px;
  width: 350px;
  height: 120px;
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: space-between;
  left: 882px;
  top: 283px;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.15);
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
  
  font-size: 30px;
  line-height: 24px;
  font-weight: 700;
  position: absolute;
  left: 133px;
  top: 39px;
  width: 363px;
  height: 29px;
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
  
  font-size: 50px;
  line-height: 40px;
  font-weight: 700;
  position: absolute;
  top: -130px;
  font-size: 60px;
  


  text-align: left;
  width: 573px;
  height: 90px;
}

.conferma {
  background: linear-gradient(
    90deg,
    rgba(0, 105, 186, 1) 0%,
    rgba(0, 47, 84, 1) 100%
  );
  border-radius: 10px;
  width: 476px;
  height: 48px;
  position: absolute;
  left: 246px;
  top: 746px;
  color: #ffffff;
  
  font-size: 25px;
  line-height: 12px;
  font-weight: 700;
  cursor:pointer
 
}

</style>