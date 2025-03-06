<script setup lang="ts">
import { ref as vueRef } from "vue";
import { defineExpose } from 'vue';
import type { Postazione } from "~/store/models/Postazione";
import { usePrenotazioni } from "../../store/prenotazioni";
import { usePostazioni } from "../../store/postazioni";
const prenotazioniStore = usePrenotazioni();
await prenotazioniStore.getPrenotazioni();
const postazioniStore = usePostazioni();
await postazioniStore.getPostazioni();
await postazioniStore.getCategorie();


const props = defineProps({
  add: Boolean,
  tipo: String,
});


/*
da rivedere
*/

const selezionato = ref(0);
const x = ref(); // Coordinata X relativa al contenitore
const y = ref();   // Coordinata Y relativa al contenitore
const aggiorna =  ref("");
const mostra = ref(true);
console.log("categoria: "+postazioniStore.postazioni[selezionato.value as any].id_categoria)
let click2 = false;

// GESTIONE POSTAZIONI OCCUPATE
import { onMounted, nextTick } from 'vue';

onMounted(() => {
  if (typeof window !== "undefined") {
        // Puoi usare localStorage solo qui

        const scelta = localStorage.getItem("scelta");
        if (scelta) {
          const parsedSessione = JSON.parse(scelta);
          selezionato.value = parsedSessione;
          seleziona(selezionato.value);

      } else {
        console.log("localStorage non è disponibile nel server");
      }
  }


  nextTick(() => {
    selezionaCategoria(props.tipo as String);
    for (const element of postazioniStore.occupate) {
    console.log("element"+element);
    const cellaSVG = document.getElementById((element).toString());
    mostra.value = true;
    if (cellaSVG) {
      console.log("Elemento trovato:", cellaSVG);
      cellaSVG.style.fill = "rgba(255, 0, 0, 0.3)";
      
    } else {
      console.log("Elemento non trovato per id:", element);
    }

   
  }
  
  });
});


///SELEZIONE E POSIZIONAMENTO POPUP

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
  const cellaSVG = document.getElementById(id +"")
 
  const Popup = document.getElementById("popup") as any;
  mostra.value = true;
  if(cellaSVG && Popup){

      nextTick(() => {
        mostra.value = false;
        const rect = cellaSVG.getBoundingClientRect() as any;
        x.value = rect.x + rect.width / 2 -395;
        y.value= rect.y + rect.height / 2 -385;
        Popup.style.left = `${x.value}px`;
        Popup.style.top = `${y.value}px`;
        aggiorna.value+=" ";
        mostra.value = true;



      });

    }

    mostra.value = true;
  }


  /////////////SELEZIONA CATEGORIA

  function selezionaCategoria(id: String){//passa l'id della categoria
  let cellaSVG;

 
      for (const element of postazioniStore.postazioni) {
            //console.log("element"+element.id_categoria);
            cellaSVG = document.getElementById(element.id_postazione-1 + "");
            

            if (element.id_categoria == id) {
              //console.log("Elemento trovato:", "cellaSVG");
              if(cellaSVG)
              cellaSVG.style.fill = "rgba(54, 196, 252, 0.1)";
            } else {
              console.log("gh'è no");
            }
      }
  
  }

</script>

<template>

<input type = "text" v-model = "aggiorna" style = "display: none">

<div style = "width: fit-content;" >
<img  src = "../../img/mappa1.png" usemap="#mappa" style = "width: 100%">
 


      
      <svg class="map-overlay" viewBox="0 0 960 600" id = "svgmap">

        <!-- tipologia B -->
      <rect style="" id="0" x="0" y="0" width="109" height="142" @click=" seleziona(0)" />
      <rect style="" id="1" x="2" y="143" width="107" height="151" @click="seleziona(1)" />
      <rect style="" id="2" x="833" y="0" width="125" height="174" @click="seleziona(2)" />
      <rect style="" id="3" x="833" y="176" width="125" height="188" @click="seleziona(3)" />
      <rect style="" id="4" x="832" y="362" width="126" height="173" @click="seleziona(4)" />
      <!--  -->


        <!-- tipologia A1 -->
        <rect style="" id="5" x="185" y="127" width="34" height="64" @click="seleziona(5);"/>
        <rect style="" id="6" x="184" y="193" width="35" height="68" @click="seleziona(6)" />
        <rect style="" id="7" x="183" y="259" width="36" height="67" @click="seleziona(7)" />
        <rect style="" id="8" x="184" y="325" width="36" height="67" @click="seleziona(8)" />
        <rect style="" id="9" x="221" y="125" width="35" height="66" @click="seleziona(9)" />
        <rect style="" id="10" x="220" y="192" width="35" height="68" @click="seleziona(10)" />
        <rect style="" id="11" x="220" y="260" width="35" height="65" @click="seleziona(11)" />
        <rect style="" id="12" x="219" y="325" width="38" height="68" @click="seleziona(12)" />

        <rect style="" id="13" x="322" y="351" width="66" height="34" @click="seleziona(13)" />
        <rect style="" id="14" x="389" y="350" width="66" height="35" @click="seleziona(14)" />
        <rect style="" id="15" x="322" y="386" width="66" height="36" @click="seleziona(15)" />
        <rect style="" id="16" x="390" y="386" width="67" height="36" @click="seleziona(16)" />
        <rect style="" id="17" x="699" y="132" width="34" height="67" @click="seleziona(17)" />

        <rect style="" id="18" x="699" y="199" width="34" height="66" @click="seleziona(18)" />
        <rect style="" id="19" x="698" y="265" width="35" height="61" @click="seleziona(19)" />
        <rect style="" id="20" x="697" y="326" width="37" height="66" @click="seleziona(20)" />
        <rect style="" id="21" x="733" y="133" width="36" height="66" @click="seleziona(21)" />
        <rect style="" id="22" x="735" y="198" width="35" height="67" @click="seleziona(22)" />
        <rect style="" id="23" x="735" y="265" width="35" height="61" @click="seleziona(23)" />
        <rect style="" id="24" x="734" y="327" width="36" height="65" @click="seleziona(24)" />
        <!--  -->


        <!-- tipologia A2 -->  
      <rect style="" id="25" x="312" y="0" width="66" height="35" @click="seleziona(25)" />
      <rect style="" id="26" x="378" y="0" width="68" height="34" @click="seleziona(26)" />
      <rect style="" id="27" x="446" y="0" width="67" height="35" @click="seleziona(27)" />
      <rect style="" id="28" x="510" y="0" width="65" height="34" @click="seleziona(28)" />
      <rect style="" id="29" x="575" y="0" width="68" height="34" @click="seleziona(29)" />
      <rect style="" id="30" x="322" y="104" width="68" height="36" @click="seleziona(30)" />
      <rect style="" id="31" x="390" y="104" width="67" height="36" @click="seleziona(31)" />
      <rect style="" id="32" x="323" y="140" width="66" height="36" @click="seleziona(32)" />
      <rect style="" id="33" x="391" y="140" width="67" height="36" @click="seleziona(33)" />
      <rect style="" id="34" x="495" y="104" width="68" height="37" @click="seleziona(34)" />
      <rect style="" id="35" x="563" y="104" width="66" height="37" @click="seleziona(35)" />
      <rect style="" id="36" x="496" y="140" width="67" height="37" @click="seleziona(36)" />
      <rect style="" id="37" x="562" y="141" width="68" height="35" @click="seleziona(37)" />
      <rect style="" id="38" x="323" y="227" width="66" height="36" @click="seleziona(38)" />
      <rect style="" id="39" x="390" y="227" width="66" height="36" @click="seleziona(39)" />
      <rect style="" id="40" x="324" y="263" width="65" height="36" @click="seleziona(40)" />
      <rect style="" id="41" x="391" y="263" width="66" height="37" @click="seleziona(41)" />
      <rect style="" id="42" x="496" y="228" width="66" height="37" @click="seleziona(42)" />
      <rect style="" id="43" x="564" y="227" width="66" height="36" @click="seleziona(43)" />
      <rect style="" id="44" x="496" y="264" width="67" height="35" @click="seleziona(44)" />
      <rect style="" id="45" x="563" y="265" width="66" height="34" @click="seleziona(45)" />
      <rect style="" id="46" x="495" y="351" width="66" height="35" @click="seleziona(46)" />
      <rect style="" id="47" x="561" y="351" width="68" height="34" @click="seleziona(47)" />
      <rect style="" id="48" x="496" y="386" width="65" height="36" @click="seleziona(48)" />
      <rect style="" id="49" x="562" y="385" width="68" height="37" @click="seleziona(49)" />
      <rect style="" id="50" x="311" y="502" width="68" height="33" @click="seleziona(50)" />
      <rect style="" id="51" x="380" y="503" width="63" height="32" @click="seleziona(51)" />
      <rect style="" id="52" x="444" y="503" width="64" height="32" @click="seleziona(52)" />
      <rect style="" id="53" x="510" y="503" width="68" height="32" @click="seleziona(53)" />
      <rect style="" id="54" x="578" y="504" width="67" height="31" @click="seleziona(54)" />
</svg>
    




<PopupElement 
:id_postazione="selezionato"
:key = "0"
style = "position:absolute; top:0px; left:0px; scale: 2;" id = "popup"
v-if = "mostra == true"
>
  <div class="x" @click="mostra = false">
      <img src="../../img/remove.png" height="15px"/>

    </div>
</PopupElement>




  </div>
</template>


<style scooped>

.map-overlay {
  position: absolute;
  top: 19px;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  
}

.map-overlay rect {
  cursor: pointer;
  pointer-events: all;
  fill: transparent;
  stroke-width: 2;
}

.map-overlay rect:hover {
  fill:   rgba(54, 196, 252, 0.3)
}

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

.occupato {
  position: absolute;
  top: 19px;
  left: 0;
  width: 100%;
  height: 100%;
  fill:rgba(0, 25, 44, 0.377);
}




</style>