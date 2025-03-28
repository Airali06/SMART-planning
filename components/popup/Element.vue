<script setup lang="ts">
import type {Postazione}  from "../../store/models/Postazione.ts";
import { usePostazioni } from "../../store/postazioni";
const postazioniStore = usePostazioni();
const props = defineProps({
   id_postazione: Number,
});



</script>

<template>

    <div style = "position: relative;">
        <img src = "../../img/popup.png" height="65px">



        <div class = "nome">
            Postazione {{postazioniStore.postazioni[id_postazione as any].nome}}
        </div>

        <div class = "descrizione">
            descrizione
        </div>


<!------A1------------------------------------------>
        <div  
        v-if = "postazioniStore.postazioni[id_postazione as any].id_categoria == 'A1'"
        style = " display: flex; flex-direction: row; position: absolute; top: 15px; left: 7px">
            
        <div style = "">
                <img src = "../../img/scrivania.png" width="36px">
                
            </div>

            <div 
            style = "scale:0.8; 
            flex-direction: column; 
            display: flex; 
            font-weight: 700; 
            line-height: 0.8; 
            font-size: 8px;
            margin-top: 13px;
            ">
                <span>scrivania</span>
                <span style = "font-size: 10px;">standard</span>
            </div>
        </div>

<!------A2------------------------------------------>
        <div  
        v-if = "postazioniStore.postazioni[id_postazione as any].id_categoria == 'A2'"
        style = " display: flex; flex-direction: row; position: absolute; top: 21px; left: 8px">
            <div style = "">
                <img src = "../../img/scrivania_con_monitor.png" width="24px">
                
            </div>

            <div 
            style = "scale:0.8; 
            flex-direction: column; 
            display: flex; 
            font-weight: 700; 
            line-height: 0.8; 
            font-size: 8px;
            margin-top: 10px;
            ">
                <span>scrivania con</span>
                <span style = "font-size: 10px;">
                    Monitor</span>
            </div>
        </div>


        
<!------B------------------------------------------>
<div  
        v-if = "postazioniStore.postazioni[id_postazione as any].id_categoria == 'B'"
        style = " display: flex; flex-direction: row; position: absolute; top: 21px; left: 10px">
            <div style = "">
                <img src = "../../img/sala_riunioni.png" width="24px">
                
            </div>

            <div 
            style = "scale:0.8; 
            flex-direction: column; 
            display: flex; 
            font-weight: 700; 
            line-height: 0.8; 
            font-size: 8px;
            margin-top: 10px;
            ">
                <span>sala</span>
                <span style = "font-size: 13px;">
                    Riunioni</span>
            </div>
        </div>


 <!------C------------------------------------------>
<div  
        v-if = "postazioniStore.postazioni[id_postazione as any].id_categoria == 'C'"
        style = " display: flex; flex-direction: row; position: absolute; top: 21px; left: 10px">
            <div style = "">
                <img src = "../../img/parcheggio.png" width="24px">
                
            </div>

            <div 
            style = "scale:0.8; 
            flex-direction: column; 
            display: flex; 
            font-weight: 700; 
            line-height: 0.9; 
            font-size: 8px;
            margin-top: 10px;
            ">
                <span>parcheggio</span>
                <span style = "font-size: 13px;">
                    Riservato</span>
            </div>
        </div>




        <div style = "position: absolute; top: -9px; right:27px">
            <slot ></slot>
        </div>
    </div>

</template>

<style scooped>

.nome {
  padding: 3px;
  margin-left: 10px;
  background: linear-gradient(
    90deg,
    rgb(1, 77, 136) 0%,
    rgb(0, 42, 75) 100%
  );
  border-radius: 3px;

  position: absolute;
  top: 6px;
  left: -4px;
  height: 13px;
  width: 70px;
  color: #ffffff;
  font-weight: 400;
  display: flex;
  align-items: center;
  font-size: 19px;
  font-size: 7px;
  padding-left: 7px;
  padding-top: 3px;
}

.descrizione{
    border-radius: 3px;
    background-color: rgb(214, 231, 245);
    width: 52px;
    height: 40px;
    position: absolute;
    top: 6px;
    right: 8px;
    padding: 4px;
    font-size: 7px;
    font-weight: 800;
    display: flex;
  }
</style>
