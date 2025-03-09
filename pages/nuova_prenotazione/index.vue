<script setup lang = "ts">
import { usePrenotazioni } from "../../store/prenotazioni";
const prenotazioniStore = usePrenotazioni();
import { usePostazioni } from "../../store/postazioni";
const postazioniStore = usePostazioni();


const route = useRoute();
const categoria = ref("A1");
console.log("parametri: ",route.query.option)
categoria.value = route.query.option as any;
const data = ref();
const aggiorna = ref("");
const selezionato = ref(-1);

await nextTick();
const mappa = ref(null);

async function confermaPrenotazione(){

  if (typeof window !== "undefined") {
        // Puoi usare localStorage solo qui

        const scelta = localStorage.getItem("scelta");
        if (scelta) {
          const parsed = JSON.parse(scelta);
          selezionato.value = parsed;
          console.log(selezionato.value);
        }
      } else {
        console.log("localStorage non è disponibile nel server");
      }
  

      if(selezionato.value == -1)
      return;
      console.log(data.value as Date);
      prenotazioniStore.nuovaPrenotazione(data.value, selezionato.value);
 
}

async function occupate(){
  // Parse the date to a proper Date object, in case it's not already.
  const selectedDate = new Date(data.value); 

  // Call the checkPostazioniOccupate with the Date object
  await postazioniStore.checkPostazioniOccupate(selectedDate);
  //console.log("Checked postazioni occupate for date:", selectedDate);

  // Update the aggiorna value to trigger a re-render, if necessary
  aggiorna.value += " "; // You can modify this to reflect meaningful updates

}


</script>

<template>

<div style = "margin-left: 300px; position: relative;">



<head>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Sulphur+Point:wght@300;400;700&display=swap" rel="stylesheet">
</head>




        


  <div class="prenota-1">





    <div class="map_container" >

      <img src = "../../img/mappa1.png" width="703px" style = "position : absolute; z-index: 0; top: 25px;">

        <MappaPostazioni ref = "mappa"
        :key = aggiorna
        :tipo="categoria"
        style="z-index: 100"
        >

        </MappaPostazioni>



         <span class = "effettua-prenotazione" 
         style = "  position: absolute;
                    top: -150px;">
            Effettua<br>
            prenotazione
        </span>

         <div class="seleziona"

            style = "position: absolute;
                    left: 5px;
                    top: -35px;
                    width: 249px;
                    height: 25px">
            seleziona postazione</div>
    </div>





    <div class="rectangle-6">

      <div class="seleziona" 
        style = "
        position: absolute;
        left: 5px;
        top: -35px;
        width: 249px;
        height: 25px">seleziona tipologia</div>

      

        <OptionPostazione
          :add="false"
          tipo="ScrivaniaStandard"
          style = "scale: 0.77; height: 115px;"
          @click = "categoria = 'A1'; aggiorna += ' '"
          :style="{ transform: categoria == 'A1' ? 'scale(1.26)' : 'scale(1)' }"
        ></OptionPostazione>

        <OptionPostazione
          :add="false"
          tipo="ScrivaniaMonitor"
          style = "scale: 0.77; height: 115px;"
          @click = "categoria = 'A2'; aggiorna += ' '"
          :style="{ transform: categoria == 'A2' ? 'scale(1.26)' : 'scale(1)' }"
          
        ></OptionPostazione>

        <OptionPostazione
          :add="false"
          tipo="SalaRiunioni"
          style = "scale: 0.77; height: 115px;"
          @click = "categoria = 'B'; aggiorna += ' '"
           :style="{ transform: categoria == 'B' ? 'scale(1.26)' : 'scale(1)' }"
        ></OptionPostazione>
      
    </div>

   





    <div class="seleziona"
    style = "  position: absolute;
    left: 890px;
    top: 430px;
    width: 249px;
    height: 25px;">seleziona data

    <input type = "date" v-model="data" 
    class = "rectangle"
    style = "margin-top: 40px; font-size: 25px; font-weight: 700; height: 50px; width: 340px;" 
    @change="occupate()">
    </div>

    


    


    

    <button class="conferma" @click="confermaPrenotazione()">conferma prenotazione</button>
   
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

menu, ol, ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
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


.prenota-1,
.prenota-1 * {
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
.seleziona {
  color: #00355c;
  text-align: left;
  font-size: 20px;
  line-height: 12px;
  font-weight: 700;
}sk-2-6 {
  width: 52px;
  height: 49px;
  position: absolute;
  left: 1138px;
  top: 306px;
  object-fit: cover;
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

.effettua-prenotazione{
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