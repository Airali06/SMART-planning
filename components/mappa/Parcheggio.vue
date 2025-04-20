<script setup lang = "ts">
import type { Postazione } from "../../store/models/Postazione";
import { usePrenotazioni } from "../../store/prenotazioni";
import { usePostazioni } from "../../store/postazioni";
const mostra = ref(true);
const selezionato = ref(0);
const aggiorna =  ref("");
const prenotazioniStore = usePrenotazioni();
await prenotazioniStore.getPrenotazioni();
const postazioniStore = usePostazioni();
await postazioniStore.getPostazioni();
await postazioniStore.getCategorie();


import { onMounted, nextTick } from 'vue';

onMounted(() => {
  if (typeof window !== "undefined") {
        // Puoi usare localStorage solo qui

        const scelta = localStorage.getItem("scelta");
        if (scelta) {
          const parsed = JSON.parse(scelta);
          selezionato.value = parsed;
          if(selezionato.value*1 < 55){
            selezionato.value = 55;
          }
          seleziona(selezionato.value);

      } else {
        console.log("localStorage non è disponibile nel server");
      }
  }


  nextTick(() => {
    for (const element of postazioniStore.occupate) {
    console.log("element"+element);
    const img = document.getElementById((element).toString()+"occupato");
    mostra.value = true;
    if (img) {
      console.log("Elemento trovato:", img);
      img.style.display = "block";
      
    } else {
      console.log("Elemento non trovato per id:", element);
    }
   
  }
  
  });
});



function seleziona(id: number){
  
 

  selezionato.value = id;


  //da rivedere
  const postazione = postazioniStore.getPostazioneById(id) as Postazione;
  const categoria = postazioniStore.getCategoria(postazione as Postazione);
  console.log("categoria",categoria);
  //selezionaCategoria(categoria.id_categoria);


  if (typeof window !== "undefined") {
        localStorage.setItem("scelta", JSON.stringify(selezionato.value));
      } else {
        console.log("localStorage non è disponibile nel server");
      }

  console.log(id);

  const cella = document.getElementById(id +"")
  const contenitore = document.getElementById("contenitore");  
  const Popup = document.getElementById("popup") as any;
  
  mostra.value = true;
  if(cella && Popup && contenitore){

      nextTick(() => {
        mostra.value = false;
        const sottrai = contenitore.getBoundingClientRect();
        const rect = cella.getBoundingClientRect();
        Popup.style.position = "absolute";
        Popup.style.top = (rect.top + window.scrollY -130) - sottrai.height/2 + "px";
        Popup.style.left = (rect.left + window.scrollX-20) - sottrai.width  + "px";
        Popup.style.margin = "0"; // Rimuove tutti i margini
        Popup.style.padding = "0";
        Popup.style.boxSizing = "border-box"; 
        aggiorna.value+=" ";
        
        mostra.value = true;

      });

    }

    mostra.value = true;
  }
</script>




<template>

    

<div class="rectangle-147" style = "position: relative" id = "contenitore">




    <PopupElement 
        :id_postazione="selezionato"
        :key = "0"
        style = "z-index:100; position:fixed; top:0px; left:0px; scale: 2;" id = "popup"
        v-if = "mostra == true"
        >
        <div class="x" @click="mostra = false">
            <img src="../../img/remove.png" height="15px"/>
        </div>

    </PopupElement>


    <table >
        <tr>
          <td class = "psinistra" id ="55" @click = "seleziona(55)"> <img src="../../img/car.png" style = "display: none" class = "sximg" id = "55occupato"/> </td>
          <td rowspan = "5" style = "width: 145px" ></td>
          <td class = "pdestra" id ="56" @click = "seleziona(56)"><img src="../../img/car.png" style = "display: none" class = "dximg" id = "56occupato"/>   </td>
        </tr>
        <tr>
          
          <td class = "psinistra" id ="57" @click = "seleziona(57)">  <img src="../../img/car.png" style = "display: none" class = "sximg" id = "57occupato"/></td> 
          <td class = "pdestra" id ="58" @click = "seleziona(58)"><img src="../../img/car.png" style = "display: none" class = "dximg" id = "58occupato"/></td>
        </tr>
        <tr>
          
          <td class = "psinistra" id ="59" @click = "seleziona(59)"><img src="../../img/car.png" style = "display: none" class = "sximg" id = "59occupato"/></td>
          <td class = "pdestra" id ="60" @click = "seleziona(60)"><img src="../../img/car.png" style = "display: none" class = "dximg" id = "60occupato"/></td>
        </tr>
        <tr>
          
          <td class = "psinistra" id ="61" @click = "seleziona(61)"><img src="../../img/car.png" style = "display: none" class = "sximg" id = "61occupato"/></td>
          <td class = "pdestra" id ="62" @click = "seleziona(62)"><img src="../../img/car.png" style = "display: none" class = "dximg" id = "62occupato"/></td>
        </tr>
        <tr>
          
          <td class = "psinistra" id ="63" @click = "seleziona(63)"><img src="../../img/car.png" style = "display: none" class = "sximg" id = "63occupato"/></td>
          <td class = "pdestra" id ="64" @click = "seleziona(64)"><img src="../../img/car.png" style = "display: none" class = "dximg" id = "64occupato"/></td>
        </tr>
      </table>
</div>

</template>

<style scoped>


.x {
  padding: 3px;
  background:rgba(0, 47, 84, 1);

  border-radius: 10px;
  align-items: center;
  position: absolute;
  top: 5px;
  height: 27px;
  width:  27px;
  scale: 0.4;
  display: flex;
  justify-content: center;
  vertical-align: middle;
}

.rectangle-147 {
  background: #ffffff;
  border-radius: 10px;
  width: 496px;
  height: 452px;
  position: absolute;
  left: 237px;
  top: 284px;
  padding: 20px;
  
}

table{
  width: 100%;
  height: 100%;
  border-collapse: separate;
  border-spacing: 8px;
}

td{
  height: 70px;
  width: 120px;
  position: relative; 
  align-items: center;
}

.pdestra{
  border: 3px solid;
  padding-right: 20px;
  border-color: #002F54;
  border-radius: 0 15px 15px 0;
  border-left: 2px solid transparent;
}.pdestra:hover{
  background-color: #e3f2ff;
}

.psinistra{
  border: 3px solid;
  padding-left: 20px;
  border-color: #002F54;
  border-radius: 15px 0 0 15px;
  border-right: 2px solid transparent;
}.psinistra:hover{
  background-color: #e3f2ff;
}

.sximg{
  height: 80px;
  transform: rotate(90deg);
  position: absolute;
  top: -4px;
  left: 25px;
}

.dximg{
  height: 80px;
  transform: rotate(-90deg);
  position: absolute;
  top: -4px;
  right: 25px;
}

</style>