<script setup lang = "ts">
import type { Postazione } from '~/store/models/Postazione';
import type { Prenotazione } from '~/store/models/Prenotazione';
import { usePostazioni } from '~/store/postazioni';
const props = defineProps({
  prenotazione: {} as PropType<Prenotazione>,
});

const  postazioniStore = await usePostazioni()
const postazione = postazioniStore.getPostazione(props.prenotazione as Prenotazione) as Postazione;
const categoria = postazioniStore.getCategoria(postazione as Postazione);
//console.log(postazione, categoria)
</script>


<template>
<div style = "scale:0.9">


    <div class = "rectangle">
        <div style = "flex-direction: row; display: flex;">

        <div class = "nome1"><span style = "margin-left: 20px;">Postazione {{postazione.nome}}</span></div>
        
        
        <div class = "data"><span>{{ props.prenotazione?.data }}</span></div>
        <div class = "time"><span>giornata intera</span></div>
        <div class = "content"><span style = "margin:10px">info prenotazione</span></div>
    </div>


<!------A1------------------------------------------>
    
        <div style = "position: absolute; left: 30px; top: 40px;" v-if = "categoria.id_categoria == 'A1'">
            <img src = "../../img/scrivania.png" width="95px">
            
        </div>

        <div style = "scale:0.8;position: absolute; left: 120px; bottom: 20px; flex-direction: column; 
        display: flex; font-weight: 700; line-height: 0.8; font-size: 18px;"
        v-if = "categoria.id_categoria == 'A1'"
        >
            <span>scrivania</span>
            <span style = "font-size: 25px;">standard</span>
        </div>

<!------A2------------------------------------------>
    
<div style = "position: absolute; left: 35px; top: 53px;" v-if = "categoria.id_categoria == 'A2'">
            <img src = "../../img/scrivania_con_monitor.png" width="65px">
            
        </div>

        <div style = "scale:0.8;position: absolute; left: 95px; bottom: 20px; flex-direction: column; 
        display: flex; font-weight: 700; line-height: 0.8; font-size: 18px;"
        v-if = "categoria.id_categoria == 'A2'"
        >
            <span>scrivania</span>
            <span style = "font-size: 25px;">con Monitor</span>
        </div>

<!------B------------------------------------------>
    
<div style = "position: absolute; left: 30px; top: 40px;" v-if = "categoria.id_categoria == 'B'">
            <img src = "../../img/sala_riunioni.png" width="95px">
            
        </div>

        <div style = "scale:0.8;position: absolute; left: 120px; bottom: 20px; flex-direction: column; 
        display: flex; font-weight: 700; line-height: 0.8; font-size: 18px;"
        v-if = "categoria.id_categoria == 'B'"
        >
            <span>sala</span>
            <span style = "font-size: 25px;">Riunioni</span>
        </div>
<!------C-----------------------------------------
    


<div style = "position: absolute; left: 30px; top: 40px;" v-if = "categoria.id_categoria == 'C'">
            <img src = "../../img/scrivania.png" width="95px">
            
        </div>

        <div style = "scale:0.8;position: absolute; left: 120px; bottom: 20px; flex-direction: column; 
        display: flex; font-weight: 700; line-height: 0.8; font-size: 18px;"
        v-if = "categoria.id_categoria == 'C'"
        >
            <span>scrivania</span>
            <span style = "font-size: 25px;">standard</span>
        </div>

      -->        

        

    
    </div>
    
</div>

</template>

<style scooped>

.nome1 {
  padding: 3px;
  margin-left: 10px;
  background: linear-gradient(
    90deg,
    rgb(0, 85, 150) 0%,
    rgba(0, 47, 84, 1) 100%
  );
  border-radius: 7px;

  position: absolute;
  top: 15px;
  left: 12px;
  height: 27px;
  width: 180px;
  color: #ffffff;
  font-weight: 400;
  display: flex;
  align-items: center;
  font-size: 19px;
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

    width: 520px;
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
    width: 120px;
    height: 27px;
    position: absolute;
    top: 15px;
    left: 230px;
    padding: 3px;
    font-weight: 800;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .time{
    border-radius: 8px;
    background-color: rgb(191, 214, 233);
    width: 130px;
    height: 27px;
    position: absolute;
    top: 15px;
    left: 370px;
    padding: 3px;
    font-weight: 800;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .content{
    border-radius: 8px;
    background-color: rgb(214, 231, 245);
    width: 275px;
    height: 50px;
    position: absolute;
    top: 55px;
    left: 230px;
    padding: 0px;
    font-weight: 800;
    display: flex;
    
  }


  </style>