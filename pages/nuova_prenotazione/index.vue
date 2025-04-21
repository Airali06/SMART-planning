<script setup lang = "ts">
import { usePrenotazioni } from "../../store/prenotazioni";
const prenotazioniStore = usePrenotazioni();
import { usePostazioni } from "../../store/postazioni";
import type { Postazione } from "~/store/models/Postazione";
const postazioniStore = usePostazioni();
import { useAuth } from "../../store/auth";
const authStore = useAuth();

const route = useRoute();
const router = useRouter();
const categoria = ref("A1");
console.log("parametri: ",route.query.option)
categoria.value = route.query.option as any;
const data = ref(''/*new Date().toISOString().split('T')[0]*/); // Ottieni la data odierna in formato YYYY-MM-DD
const aggiorna = ref("");
const selezionato = ref(-1);
const caricamento = ref(false);
const errore = ref("");

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

      if(prenotazioniStore.filtraData(data.value).length > 0){
          console.log("-----------TROPPE PRENOTAZIONI------------")
          errore.value += "- hai già una prenotazione per questa data\n";
        }

      if(data.value == ''){
          console.log("-----------NESSUNA DATA SELEZIONATA------------")
          errore.value += "- nessuna data selezionata\n"
        }
      
     if(postazioniStore.postazioni.find(n => n.id_postazione == selezionato.value)?.stato+"" == "1"){
          console.log("-----------postazione non disponibile------------")
          errore.value += "- postazione non disponibile";
        }
      
      console.log("OCCUPATE",postazioniStore.occupate, selezionato.value)
        if(postazioniStore.occupate.some(n => n === selezionato.value+'') == true){
          console.log("---------------E' OCCUPATA--------------------")
          errore.value += "- hai selezionato una postazione occupata\n";
        }

        if(errore.value.length > 0){
          return;
        }

        
      
  

      if(selezionato.value == -1)
      return;

      caricamento.value = true;
      aggiorna.value += " ";
      await prenotazioniStore.nuovaPrenotazione(data.value, selezionato.value);
 
}

async function occupate(){
  const selectedDate = new Date(data.value); 
  await postazioniStore.checkPostazioniOccupate(selectedDate);
  aggiorna.value += " ";
}


</script>

<template>
<input type = "text" v-model = "aggiorna" style = "display: none;">

<div class = "overlay" v-if = "caricamento">
      <CaricamentoPopup
      :caricamento=caricamento
      messaggio_caricamento="Inserimento prenotazione in corso"
      :key = aggiorna
      style = "margin-top: 300px;"
      >
      </CaricamentoPopup>
</div>

<div style = "margin-left: 300px; position: relative;">
<div>
  
</div>


<head>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Sulphur+Point:wght@300;400;700&display=swap" rel="stylesheet">
</head>




        


  <div class="prenota-1">

    <MappaParcheggio
        :key = aggiorna
        style="z-index: 100; position: absolute; top"
        v-if = "categoria == 'C'"
        >
        </MappaParcheggio>





    <div class="map_container" 
    >

      <img v-if = "categoria != 'C'" src = "../../img/mappa1.png" width="703px" style = "position : absolute; z-index: 0; top: 25px;">

      <div v-if = "categoria != 'C'">
        <MappaPostazioni ref = "mappa"
        
        :key = aggiorna
        :tipo="categoria"
        style="z-index: 10"
        >

        </MappaPostazioni>
      </div>
        



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





    <div class="rectangle-6" 
    :style="{ width: authStore.utente.livello == 2 ? '465px' : '350px', transform: authStore.utente.livello == 2 ? 'scale(0.9)' : 'scale(1)'}"
    >

      <div class="seleziona" 
        style = "
        position: absolute;
        left: 5px;
        top: -35px;
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

        <OptionPostazione
        v-if="authStore.utente.livello == 2"
          :add="false"
          tipo="Parcheggio"
          style = "scale: 0.77; height: 115px;"
          @click = "categoria = 'C'; aggiorna += ' '"
           :style="{ transform: categoria == 'C' ? 'scale(1.26)' : 'scale(1)' }"
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



<div v-if = "errore != '' "class = "overlay" style = "position: absolute; left: 0px;">
        <div v-if = "errore != ''" class = "errore" style = "position: absolute;left:710px; top: 300px">
                <div style = "display: flex; flex-direction: row;">
                  <span style = "font-size: 25px; font-weight: 700; margin-top: 5px;">Prenotazione non valida!</span>
                  <img src = "../../img/warning.png" style = "width: 35px; height: 35px; margin-left: 10px;">
                </div>


            <div style = "font-size: 16px; width: 300px; padding-left: 20px;padding-right: 20px;">{{ errore }}</div>

              <div class="x" @click="errore = ''">
                <img src="../../img/remove.png" height="50px"/>
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
.errore{
  border-radius: 0.925rem;
  
  background:#ffffff;
  box-shadow: 0rem 0rem 1.25rem 0rem rgba(0, 0, 0, 0.15);
  position: relative;
  padding: 2px;
  z-index: 0;
  width: 400px;
  height: 200px;
  display: block;
  justify-items: center;
  align-items: center;
  align-content: center;
  justify-content: center;
  display: block;
}

.errore::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 0.925rem;
  padding: 0.3rem;
  background: linear-gradient(90deg, rgba(0, 105, 186, 1), rgba(0, 47, 84, 1));
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  z-index: 100;
}

.x {
  padding: 5px;
  background:rgba(0, 47, 84, 1);

  border-radius: 25px;
  align-items: center;
  position: absolute;
  top: -35px;
  right: -35px;
  height: 85px;
  width:  85px;
  scale: 0.4;
  display: flex;
  justify-content: center;
  vertical-align: middle;
  z-index: 1000;
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