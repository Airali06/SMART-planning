<script setup lang="ts">

import { usePostazioni } from "../../store/postazioni";
const postazioniStore = usePostazioni();
await postazioniStore.getPostazioni();
const props = defineProps({
  add: Boolean,
  tipo: String,
});

/*
da rivedere
*/


const selezionato = ref(0);
const x = ref(0); // Coordinata X relativa al contenitore
const y = ref(0);   // Coordinata Y relativa al contenitore
const aggiorna =  ref("");
const mostra = ref(true);
console.log("categoria: "+postazioniStore.postazioni[selezionato.value as any].id_categoria)

 function seleziona(id: number){

  selezionato.value = id;
  console.log(id);
  

  const cellaSVG = document.getElementById(id +"")
  const Popup = document.getElementById("popup") as any;
  if(cellaSVG && Popup){

      nextTick(() => {
        
        const rect = cellaSVG.getBoundingClientRect() as any;
        x.value = rect.x + rect.width / 2 -395;
        y.value= rect.y + rect.height / 2 -385;
        Popup.style.left = `${x.value}px`;
        Popup.style.top = `${y.value}px`;
        mostra.value = true;
      });
    }
      //aggiorna.value += " ";
  }

</script>

<template>

<input type = "text" v-model = "aggiorna" style = "display: none">

<div style = "width: fit-content;" >
<img  src = "../../img/mappa1.png" usemap="#mappa" style = "width: 100%">
 


      
      <svg class="map-overlay" viewBox="0 0 960 600" id = "svgmap">

        <!-- tipologia B -->
      <rect id="0" x="0" y="0" width="109" height="142" @click="seleziona(0)" />
      <rect id="1" x="2" y="143" width="107" height="151" @click="seleziona(1)" />
      <rect id="2" x="833" y="0" width="125" height="174" @click="seleziona(2)" />
      <rect id="3" x="833" y="176" width="125" height="188" @click="seleziona(3)" />
      <rect id="4" x="832" y="362" width="126" height="173" @click="seleziona(4)" />
   
      <!--  -->


        <!-- tipologia A1 -->
        <rect id="5" x="185" y="127" width="34" height="64" @click="seleziona(5)"/>
        <rect id="6" x="184" y="193" width="35" height="68" @click="seleziona(6)" />
        <rect id="7" x="183" y="259" width="36" height="67" @click="seleziona(7)" />
        <rect id="8" x="184" y="325" width="36" height="67" @click="seleziona(8)" />
        <rect id="9" x="221" y="125" width="35" height="66" @click="seleziona(9)" />
        <rect id="10" x="220" y="192" width="35" height="68" @click="seleziona(10)" />
        <rect id="11" x="220" y="260" width="35" height="65" @click="seleziona(11)" />
        <rect id="12" x="219" y="325" width="38" height="68" @click="seleziona(12)" />

        <rect id="13" x="322" y="351" width="66" height="34" @click="seleziona(13)" />
        <rect id="14" x="389" y="350" width="66" height="35" @click="seleziona(14)" />
        <rect id="15" x="322" y="386" width="66" height="36" @click="seleziona(15)" />
        <rect id="16" x="390" y="386" width="67" height="36" @click="seleziona(16)" />
        <rect id="17" x="699" y="132" width="34" height="67" @click="seleziona(17)" />

        <rect id="18" x="699" y="199" width="34" height="66" @click="seleziona(18)" />
        <rect id="19" x="698" y="265" width="35" height="61" @click="seleziona(19)" />
        <rect id="20" x="697" y="326" width="37" height="66" @click="seleziona(20)" />
        <rect id="21" x="733" y="133" width="36" height="66" @click="seleziona(21)" />
        <rect id="22" x="735" y="198" width="35" height="67" @click="seleziona(22)" />
        <rect id="23" x="735" y="265" width="35" height="61" @click="seleziona(23)" />
        <rect id="24" x="734" y="327" width="36" height="65" @click="seleziona(24)" />
        <!--  -->


        <!-- tipologia A2 -->  
      <rect id="25" x="312" y="0" width="66" height="35" @click="seleziona(25)" />
      <rect id="26" x="378" y="0" width="68" height="34" @click="seleziona(26)" />
      <rect id="27" x="446" y="0" width="67" height="35" @click="seleziona(27)" />
      <rect id="28" x="510" y="0" width="65" height="34" @click="seleziona(28)" />
      <rect id="29" x="575" y="0" width="68" height="34" @click="seleziona(29)" />
      <rect id="30" x="322" y="104" width="68" height="36" @click="seleziona(30)" />
      <rect id="31" x="390" y="104" width="67" height="36" @click="seleziona(31)" />
      <rect id="32" x="323" y="140" width="66" height="36" @click="seleziona(32)" />
      <rect id="33" x="391" y="140" width="67" height="36" @click="seleziona(33)" />
      <rect id="34" x="495" y="104" width="68" height="37" @click="seleziona(34)" />
      <rect id="35" x="563" y="104" width="66" height="37" @click="seleziona(35)" />
      <rect id="36" x="496" y="140" width="67" height="37" @click="seleziona(36)" />
      <rect id="37" x="562" y="141" width="68" height="35" @click="seleziona(37)" />
      <rect id="38" x="323" y="227" width="66" height="36" @click="seleziona(38)" />
      <rect id="39" x="390" y="227" width="66" height="36" @click="seleziona(39)" />
      <rect id="40" x="324" y="263" width="65" height="36" @click="seleziona(40)" />
      <rect id="41" x="391" y="263" width="66" height="37" @click="seleziona(41)" />
      <rect id="42" x="496" y="228" width="66" height="37" @click="seleziona(42)" />
      <rect id="43" x="564" y="227" width="66" height="36" @click="seleziona(43)" />
      <rect id="44" x="496" y="264" width="67" height="35" @click="seleziona(44)" />
      <rect id="45" x="563" y="265" width="66" height="34" @click="seleziona(45)" />
      <rect id="46" x="495" y="351" width="66" height="35" @click="seleziona(46)" />
      <rect id="47" x="561" y="351" width="68" height="34" @click="seleziona(47)" />
      <rect id="48" x="496" y="386" width="65" height="36" @click="seleziona(48)" />
      <rect id="49" x="562" y="385" width="68" height="37" @click="seleziona(49)" />
      <rect id="50" x="311" y="502" width="68" height="33" @click="seleziona(50)" />
      <rect id="51" x="380" y="503" width="63" height="32" @click="seleziona(51)" />
      <rect id="52" x="444" y="503" width="64" height="32" @click="seleziona(52)" />
      <rect id="53" x="510" y="503" width="68" height="32" @click="seleziona(53)" />
      <rect id="54" x="578" y="504" width="67" height="31" @click="seleziona(54)" />
</svg>
    




<PopupElement 
:id_postazione="selezionato"
:key = "0"
style = "position:absolute; top:0px; left:0px; scale: 2;" id = "popup"
v-if = "mostra == true"
>
  <div class="x" >
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
  fill: rgba(54, 196, 252, 0.3);
  
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




</style>