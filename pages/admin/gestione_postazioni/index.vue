<script setup lang = "ts">
import { usePrenotazioni } from "../../../store/prenotazioni";
const prenotazioniStore = usePrenotazioni();
import { usePostazioni } from "../../../store/postazioni";
import type { Postazione } from "~/store/models/Postazione";
const postazioniStore = usePostazioni();
import { useAuth } from "../../../store/auth";
const authStore = useAuth();
postazioniStore.occupate = [];
const route = useRoute();
const router = useRouter();
const categoria = ref("A1");
console.log("parametri: ",route.query.option)
categoria.value = route.query.option as any;
const data = ref(''/*new Date().toISOString().split('T')[0]*/); // Ottieni la data odierna in formato YYYY-MM-DD
const aggiorna = ref(""); // serve a far ricaricare i componenti mappa e parcheggio da capo
const update = ref("");// fa aggiornare solo parti della pagina che non richiedono l reload completo
const selezionato = ref(-1);
const caricamento = ref(false);
const errore = ref("");
await nextTick();
let scelta;
let postazione = {} as Postazione;
if (typeof window !== "undefined") {
  scelta = localStorage.getItem("scelta") as any;
}
postazione = postazioniStore.getPostazioneById(scelta as any) as Postazione;


 async function prendiSelezione(){
    //console.log("CAMBIOOOOOOOOOOOOOO");
    if (typeof window !== "undefined") {
      scelta = localStorage.getItem("scelta") as any;
    }
  update.value = "";
  update.value = " ";
  postazione = postazioniStore.getPostazioneById(scelta as any) as Postazione;
}



async function cambiaStato(){
caricamento.value = true;
  if(postazione.stato*1 as number == 1){
    await postazioniStore.abilita(postazione.id_postazione+"");
  }else if(postazione.stato*1 as number == 0){
    await postazioniStore.disabilita(postazione.id_postazione+"");
  }
  await nextTick();
  aggiorna.value += " ";
  prendiSelezione();
  update.value = "";
  update.value = " ";
  await nextTick();
  caricamento.value = false;
}

</script>

<template>
<input type = "text" v-model = "aggiorna" style = "display: none;">
<input type = "text" v-model = "update" style = "display: none;">

<div class = "overlay" v-if = "caricamento" >
      <CaricamentoPopup
      :caricamento=caricamento
      messaggio_caricamento="modifica stato postazione in corso"
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
    <div @click = "prendiSelezione()">
        <MappaParcheggio 
            :key = aggiorna
            style="z-index: 100; position: absolute; top"
            v-if = "categoria == 'C'"
            >
            </MappaParcheggio>
    </div>




    <div class="map_container" 
    >

      <img v-if = "categoria != 'C'" src = "../../../img/mappa1.png" width="703px" style = "position : absolute; z-index: 0; top: 25px;">

      <div v-if = "categoria != 'C'" @click = "prendiSelezione()" >
        <MappaPostazioni 
        :key = aggiorna
        :tipo="categoria"
        style="z-index: 10"
        >

        </MappaPostazioni>
      </div>
        
         <span class = "effettua-prenotazione" 
         style = "  position: absolute;
                    top: -150px;">
            Gestione<br>
            Postazioni
        </span>


    </div>





    <div class="rectangle-6" 
    style = "width: 465px;"
    >

      <div class="seleziona" 
        style = "
        position: absolute;
        left: 5px;
        top: -35px;
        height: 25px;">seleziona tipologia</div>
    

        <OptionPostazione
          :add="false"
          tipo="ScrivaniaStandard"
          style = "scale: 0.77; height: 115px;"
          @click = "categoria = 'A1'; aggiorna += ' '"
        ></OptionPostazione>

        <OptionPostazione
          :add="false"
          tipo="ScrivaniaMonitor"
          style = "scale: 0.77; height: 115px;"
          @click = "categoria = 'A2'; aggiorna += ' '"
          
        ></OptionPostazione>

        <OptionPostazione
          :add="false"
          tipo="SalaRiunioni"
          style = "scale: 0.77; height: 115px;"
          @click = "categoria = 'B'; aggiorna += ' '"
        ></OptionPostazione>

        <OptionPostazione
          :add="false"
          tipo="Parcheggio"
          style = "scale: 0.77; height: 115px;"
          @click = "categoria = 'C'; aggiorna += ' '"
         ></OptionPostazione>
      
    </div>

   





    <div class="seleziona"
    style = "  position: absolute;
    left: 890px;
    top: 430px;
    width: 249px;
    height: 25px;">info postazione

    <div class = "rectangle-7">

      <span class = "nome-postazione" style = "">
        postazione {{ postazione.nome }}
      </span>

      <span style = "margin-top: 10px;">
        id {{ postazione.id_postazione }}</span>
      <span>categoria {{ postazione.id_categoria }}</span>
      <span>{{ postazione.descrizione }}</span>

      

      <div style = "display:flex; flex-direction: column;">
       
          <div style = "display:flex; flex-direction: row;">
            <span>stato: </span>
            <span v-if= "postazione.stato == 0">abilitato</span>
            <span v-if= "postazione.stato == 1">disabilitato</span>
          </div>
        

        <div class = "cambia-stato" @click="cambiaStato()" :key = "update">
          <div v-if = "postazione.stato == 1" style = "color: white;" > abilita postazione</div>
          <div v-if = "postazione.stato == 0" style = "color: white;"> disabilita postazione</div>
      </div> 
    </div>

      <div style = "position: absolute; right: -170px; top: 68px; transform: scale(1);">
        <OptionPostazione
          :add="false"
          :key = postazione.id_categoria
          :tipo= postazione.id_categoria
          style = "scale: 1;;"
          @click = "categoria = 'C'; aggiorna += ' '"
         ></OptionPostazione>
      </div>




    </div>


    </div>

    
    
  
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

.nome-postazione{
  background: linear-gradient(
    90deg,
    rgba(0, 105, 186, 1) 0%,
    rgba(0, 47, 84, 1) 100%
  );

  border: 0px;
  padding: 7px;
  padding-left: 25px;
  color: white;
  border-radius: 10px;
  width: 230px;
  font-family: "Sulphur Point", serif;
  font-weight: 700;
  font-size: 20px;
  display: block;
  margin-top: 5px;
}


.cambia-stato{
  background:    rgb(88, 159, 213);

  border: 0px;
  padding:3px;
  justify-content: center;
  justify-items: center;
  display: block;
  color: white;
  border-radius: 8px;
  width: 160px;
  font-family: "Sulphur Point", serif;
  font-weight: 700;
  font-size: 15px;
  display: block;
  margin-top: 5px;
  height: 25px;
}
.cambia-stato:hover{
  background:    rgb(58, 125, 176);
  cursor: pointer;
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

.rectangle-7 {
  line-height: 20px;
  margin-top: 30px;
  background: #ffffff;
  border-radius: 10px;
  height: 264px;
  display: flex;
  width: 460px;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.15);
  padding-left: 30px;
  padding: 20px;
  font-size: 15px;
  flex-direction: column;
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