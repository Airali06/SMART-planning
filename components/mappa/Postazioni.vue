<script setup lang="ts">
const props = defineProps({
  add: Boolean,
  tipo: String,
});

/*
da rivedere
*/


</script>

<template>


<img  src = "../../img/mappa1.png" usemap="#mappa" style = "width: 100%;  display: block;">
 
<map name="mappa">

      <!-- tipologia B -->
      <area shape="rect" coords="1,1,111,140" href="#" id="1B"/>
      <area shape="rect" coords="1,140,111,285" href="#"  id="2B"/>
      <area shape="rect" coords="830,1,957,175" href="#"  id="3B"/>
      <area shape="rect" coords="830,176,955,362" href="#"  id="4B"/>
      <area shape="rect" coords="834,365,955,530" href="#"  id="5B"/>
      <!--  -->


        <!-- tipologia A1 -->
        <area shape="rect" coords="182,125,216,190" href="#" id="1A1"/>
        <area shape="rect" coords="185,190,215,260" href="#" id="2A1"/>
        <area shape="rect" coords="185,260,218,323" href="#" id="3A1"/>
        <area shape="rect" coords="188,323,216,392" href="#" id="4A1"/>
        <area shape="rect" coords="218,127,257,193" href="#" id="5A1"/>
        <area shape="rect" coords="219,192,255,260" href="#" id="6A1"/>
        <area shape="rect" coords="218,262,254,328" href="#" id="7A1"/>
        <area shape="rect" coords="216,323,254,393" href="#" id="8A1"/>
        <area shape="rect" coords="322,350,385,385" href="#" id="9A1"/>
        <area shape="rect" coords="385,353,455,385" href="#" id="10A1"/>
        <area shape="rect" coords="322,386,389,419" href="#" id="11A1"/>
        <area shape="rect" coords="387,388,454,420" href="#" id="12A1"/>
        <area shape="rect" coords="700,132,732,199" href="#" id="13A1"/>
        <area shape="rect" coords="700,199,732,265" href="#" id="14A1"/>
        <area shape="rect" coords="700,265,732,325" href="#" id="15A1"/>
        <area shape="rect" coords="700,325,732,391" href="#" id="16A1"/>
        <area shape="rect" coords="734,135,765,199" href="#" id="17A1"/>
        <area shape="rect" coords="734,200,765,265" href="#" id="18A1"/>
        <area shape="rect" coords="734,732,765,323" href="#" id="19A1"/>
        <area shape="rect" coords="734,325,765,391" href="#" id="20A1"/>
        <!--  -->


        <!-- tipologia A2 -->
        <area shape="rect" coords="311,0,378,34" href="#" id="1A2"/>
        <area shape="rect" coords="382,0,448,34" href="#" id="2A2"/>
        <area shape="rect" coords="451,0,511,34" href="#" id="3A2"/>
        <area shape="rect" coords="511,0,575,34" href="#" id="4A2"/>
        <area shape="rect" coords="575,0,641,34" href="#" id="5A2"/>
        <area shape="rect" coords="321,106,387,140" href="#" id="6A2"/>
        <area shape="rect" coords="389,106,457,140" href="#" id="7A2"/>
        <area shape="rect" coords="322,142,388,173" href="#" id="8A2"/>
        <area shape="rect" coords="389,145,457,176" href="#" id="9A2"/>
        <area shape="rect" coords="495,105,564,140" href="#" id="10A2"/>
        <area shape="rect" coords="562,105,630,140" href="#" id="11A2"/>
        <area shape="rect" coords="497,140,561,176" href="#" id="12A2"/>
        <area shape="rect" coords="562,140,630,176" href="#" id="13A2"/>
        <area shape="rect" coords="321,226,387,258" href="#" id="14A2"/>
        <area shape="rect" coords="389,226,455,263" href="#" id="15A2"/>
        <area shape="rect" coords="324,263,391,299" href="#" id="16A2"/>
        <area shape="rect" coords="388,263,458,298" href="#" id="17A2"/>
        <area shape="rect" coords="495,227,562,263" href="#" id="18A2"/>
        <area shape="rect" coords="561,229,630,263" href="#" id="19A2"/>
        <area shape="rect" coords="495,263,562,299" href="#" id="20A2"/>
        <area shape="rect" coords="561,263,630,298" href="#" id="21A2"/>
        <area shape="rect" coords="494,350,561,385" href="#" id="22A2"/>
        <area shape="rect" coords="562,349,628,386" href="#" id="23A2"/>
        <area shape="rect" coords="495,386,562,420" href="#" id="24A2"/>
        <area shape="rect" coords="562,388,627,420" href="#" id="25A2"/>
        <area shape="rect" coords="312,503,379,535" href="#" id="26A2"/>
        <area shape="rect" coords="379,503,444,535" href="#" id="27A2"/>
        <area shape="rect" coords="444,503,510,535" href="#" id="28A2"/>
        <area shape="rect" coords="510,503,577,535" href="#" id="29A2"/>
        <area shape="rect" coords="577,503,642,535" href="#" id="30A2"/>

    </map>

</template>