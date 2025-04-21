<script setup lang = "ts">
import type { Postazione } from '~/store/models/Postazione';
import type { Prenotazione } from '~/store/models/Prenotazione';
import { usePostazioni } from '~/store/postazioni';
import { usePrenotazioni } from '~/store/prenotazioni';
import  { useAuth } from '../../store/auth';

const props = defineProps({
  prenotazione: {} as PropType<Prenotazione>,
});
const authStore = useAuth();
const router = useRouter();
const  postazioniStore = await usePostazioni()
const postazione = postazioniStore.getPostazione(props.prenotazione as Prenotazione) as Postazione;
const categoria = postazioniStore.getCategoria(postazione as Postazione);
const prenotazioniStore = usePrenotazioni();
let elimina = false;
let caricamento = false;
const aggiorna = ref("");
const scaduta = ref(false);


const oggi = ref(new Date().toISOString().split('T')[0]);

if(new Date(oggi.value+ "T00:00:00") > new Date(props.prenotazione?.data+ "T00:00:00")){
  scaduta.value = true;
}
console.log(props.prenotazione?.id_prenotazione, scaduta.value)

//--------------NOTIFICA-------------------------------------------
/*
  quando una prenotazione viene eliminata il componente invia
  alla pagina in cui è richiamato una notifica che avvisa che 
  bisogna aggiornare l'elenco delle prenotazioni

*/
import { defineEmits } from "vue";
const emit = defineEmits(["notifica"]);
const notifica = () => {
  emit("notifica","eliminata");
};

//-----------------------------------------------------------------

//---------------FORMATTAZIONE DELLA DATA---------------------
const today = new Date(props.prenotazione?.data+"");
const yy = String(today.getFullYear());
const mm = String(today.getMonth() + 1).padStart(2, '0');
const dd = String(today.getDate()).padStart(2, '0');
let data = dd+"/"+mm+"/"+yy;
//-----------------------------------------------------------

function seleziona(){
  if (typeof window !== "undefined") {
        localStorage.setItem("scelta", JSON.stringify(props.prenotazione?.id_postazione));//sballato di uno in più
        router.push({ name: 'mappa'});
      } else {
        console.log("localStorage non è disponibile nel server");
      }

}

async function elimina_prenotazione(){
  caricamento = true;
  aggiorna.value += " ";
  await prenotazioniStore.eliminaPrenotazione(props.prenotazione?.id_prenotazione as number);
  await nextTick();
  notifica();
  caricamento = false;
  
}
</script>


<template>
  <input type = "text" v-model = "aggiorna" style = "display:none">
<div style = "scale:0.9; margin-bottom: 5px;" :style="{ opacity: scaduta ? 0.7 : 1}">


    <div class = "rectangle" style="background-color: white;" v-if = "!elimina">
        <div style = "flex-direction: row; display: flex;" >

        <div class = "nome1" style = "color: #ffffff;"><span style = "margin-left: 20px;">Postazione {{postazione.nome}}</span></div>
        
        
        <div class = "data"><span>{{ data }}</span></div>
        <div class = "time"><span>giornata intera</span></div>
        <div class = "content" v-if = " prenotazione?.flag == 0"><span style = "margin:10px" >info prenotazione</span></div>
        <div class = "disabilitata" v-if = " prenotazione?.flag >= 1">
          <span style = "width:max-content; text-align: center;" v-if="prenotazione?.flag == 1">questa prenotazione è stata disabilitata</span>
          <span style = "width:max-content; text-align: center;" v-if="prenotazione?.flag == 2">la postazione non è al momento disponibile</span>
        </div>
        
    </div>

    <div class = "visualizza-sulla-mappa" @click="seleziona()">
            visualizza sulla mappa
    </div>


    <div class = "modifica" v-if = "!scaduta && props.prenotazione?.id_utente  == authStore.utente.id_utente && prenotazione?.flag == 0"  @click="router.push({ name: 'modifica_prenotazione', query: { option: 0, idDaModificare : props.prenotazione?.id_prenotazione} })">
            <img src = "../../img/edit.png" style = "width: 20px;">
    </div>

    <div class = "bin" @click="elimina = true; aggiorna+= ' '" v-if = "!scaduta && props.prenotazione?.id_utente  == authStore.utente.id_utente && prenotazione?.flag == 0">
      <img src = "../../img/delete.png" style = "width: 20px;">
    </div>

  
 
 
<!------A1------------------------------------------>
    
        <div style = "position: absolute; left: 30px; top: 45px;" v-if = "categoria.id_categoria == 'A1'">
            <img src = "../../img/scrivania.png" width="80px">
            
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
            <img src = "../../img/scrivania_con_monitor.png" width="60px">
            
        </div>

        <div style = "scale:0.8;position: absolute; left: 95px; bottom: 20px; flex-direction: column; 
        display: flex; font-weight: 700; line-height: 0.8; font-size: 18px;"
        v-if = "categoria.id_categoria == 'A2'"
        >
            <span>scrivania</span>
            <span style = "font-size: 25px;">con Monitor</span>
        </div>

<!------B------------------------------------------>
    
<div style = "position: absolute; left: 35px; top: 40px;" v-if = "categoria.id_categoria == 'B'">
            <img src = "../../img/sala_riunioni.png" width="60px" style = "margin-top: 12px">
            
        </div>

        <div style = "scale:0.8;position: absolute; left: 100px; bottom: 20px; flex-direction: column; 
        display: flex; font-weight: 700; line-height: 0.8; font-size: 18px;"
        v-if = "categoria.id_categoria == 'B'"
        >
            <span>sala</span>
            <span style = "font-size: 26px;">Riunioni</span>
        </div>

<!------C------------------------------------------>
    
<div style = "position: absolute; left: 35px; top: 40px;" v-if = "categoria.id_categoria == 'C'">
            <img src = "../../img/parcheggio.png" width="60px" style = "margin-top: 12px">
            
        </div>

        <div style = "scale:0.8;position: absolute; left: 100px; bottom: 17px; flex-direction: column; 
        display: flex; font-weight: 700; line-height: 0.95; font-size: 18px;"
        v-if = "categoria.id_categoria == 'C'"
        >
            <span>parcheggio</span>
            <span style = "font-size: 26px;">Riservato</span>
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
    

    <!---------------------ELIMINAZIONE---PRENOTAZIONE------------------------------------------------>
    <div class = "rectangle" style="background-color: white;" v-if = "elimina && !caricamento">
            <span style = "font-weight: 700; font-size: 20px;">Eliminare questa prenotazione ?</span>
            <div>prenotazione per il {{ data }}, postazione {{postazione.nome}}</div>
            <div style = "display: flex; flex-direction: row; margin-top: 4px;">
                <div class = "elimina" @click = "elimina_prenotazione()">Elimina</div>
                <div class = "annulla" @click = "elimina = false; aggiorna+= ' '">Annulla</div>
            </div>

            
    </div>

    
    <div v-if = "caricamento == true" class = " rectangle" style="background-color: white;">
        <div style = "transform: scale(0.5);">
        <CaricamentoElement style = "transform: scale(0.5);"></CaricamentoElement>
      </div>
    </div>

</div>

</template>

<style scoped>

.visualizza-sulla-mappa{
  position: absolute; 
  background-color: rgb(5, 109, 189); 
  border-radius: 7px; 
  bottom: -13px; 
  padding: 4px;
  padding-top: 6px;
  width: 165px;
  right: 100px;
  height: 20px;
  color: #ffffff;
  font-size: 12px;
  text-align: center;
  display: block;
  font-weight: 200;
  letter-spacing: 1px;
}

.bin{
  position: absolute; 
  background-color: rgb(0, 45, 80); 
  border-radius: 7px; 
  bottom: -13px; 
  padding: 4px;
  padding-top: 6px;
  width: 25px;
  right: 20px;
  height: 20px;
  color: #ffffff;
  font-size: 12px;
  text-align: center;
  display: block;
  font-weight: 200;
  letter-spacing: 1px;
}

.modifica{
  position: absolute; 
  background-color: rgb(0, 80, 141); 
  border-radius: 7px; 
  bottom: -13px; 
  padding: 4px;
  padding-top: 6px;
  width: 25px;
  right: 60px;
  height: 20px;
  color: #ffffff;
  font-size: 12px;
  text-align: center;
  display: block;
  font-weight: 200;
  letter-spacing: 1px;
}


.visualizza-sulla-mappa:hover{
  
  background-color: rgb(4, 84, 145); 
}

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
  color: #00345c;
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

  .disabilitata{
    border-radius: 8px;
    background-color: rgb(253, 248, 184);
    color: rgb(99, 83, 0);
    width: 275px;
    height: 50px;
    position: absolute;
    top: 55px;
    left: 230px;
    padding: 0px;
    font-weight: 800;
    display: flex;
    text-align: center;
    
  }
  

  .elimina{
      background: linear-gradient(
      90deg,
      rgb(0, 85, 150) 0%,
      rgba(0, 47, 84, 1) 100%
    );
    border-radius: 7px;
    color: #ffffff;
    font-weight: 700;
    padding: 5px;
    width: 120px;
    text-align: center;
  }

  .annulla{
    border-radius: 7px;
    background-color: rgb(191, 214, 233);
    font-weight: 700;
    padding: 5px;
    width: 120px;
    text-align: center;
    margin-left: 15px;
  }


  </style>