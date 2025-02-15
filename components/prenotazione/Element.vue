<script setup lang = "ts">
import type { Prenotazione } from '~/store/models/Prenotazione';
import { usePostazioni } from '~/store/postazioni';
const props = defineProps({
  prenotazione: {} as PropType<Prenotazione>,
});

const postazioniStore = usePostazioni()
</script>


<template>
<div style = "scale:0.9">
    <div class = "rectangle">
        <div style = "flex-direction: row; display: flex;">
        <div class = "nome">{{ props.prenotazione?.id_postazione }}</div>
        <div class = "data"></div>
        </div>



    
        <div style = "position: absolute; left: 25px; top: 40px;">
            <img src = "../../img/scrivania.png" width="90px">
            
        </div>

        <div style = "position: absolute; left: 120px; bottom: 20px; flex-direction: column; 
        display: flex; font-weight: 700; line-height: 0.8; font-size: 18px;">
            <span>scrivania</span>
            <span style = "font-size: 25px;">standard</span>
        </div>

        

    
    </div>
    
</div>

</template>

<style scooped>

.nome {
  padding: 3px;
  margin-left: 10px;
  background: linear-gradient(
    90deg,
    rgb(0, 85, 150) 0%,
    rgba(0, 47, 84, 1) 100%
  );
  border-radius: 7px;

  position: absolute;
  top: 12px;
  left: 12px;
  height: 25px;
  width: 190px;
}

.rectangle {
    border-radius: 10px;
    background: #ffffff;
    box-shadow: 0rem 0rem 1.25rem 0rem rgba(0, 0, 0, 0.15);
    position: relative;
    padding: 4px;
    z-index: 0;
    display: block;
    justify-items: center;
    align-items: center;
    align-content: center;
    justify-content: center;
    border: 0px;

    width: 500px;
    height: 120px;
  }
  
  .rectangle::before {
    content: "";
    border: 0px;
    position: absolute;
    inset: 0;
    border-radius: 10px;
    padding: 0.1rem;
    background: linear-gradient(90deg, rgba(0, 105, 186, 1), rgba(0, 47, 84, 1));
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    z-index: -1;
  }

  .data{
    border-radius: 8px;
    background-color: rgb(191, 214, 233);
    width: 160px;
    height: 25px;
  }
  </style>