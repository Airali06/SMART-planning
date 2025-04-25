<script setup lang = "ts">
import type { Utente } from '~/store/models/Utente';
import { useDipendenti } from '~/store/dipendenti';

const router = useRouter();
const route = useRoute();
const aggiorna = ref("");
const dipendentiStore = useDipendenti();
let utente = {} as Utente;
let modifica = false;
const password = ref("");
const nome = ref("");
const cognome = ref("");
const id_coordinatore = ref("");
let genere_selezionato = 0;
let grado_selezionato = 0;


if(route.query.idDaModificare == null){
  modifica = false;
}else{
  modifica = true;
  utente = dipendentiStore.getDipendenteById(route.query.idDaModificare*1 as any) as Utente;
}

function selezionaGenere(n: number){
  genere_selezionato = n;
  aggiorna.value+= " ";
}

function selezionaGrado(n: number){
  grado_selezionato = n;
  aggiorna.value+= " ";
}
</script>
<template>
   <input type = "text" v-model = "aggiorna" style = "display: none">


    <div style = "justify-self: center;">




        nouvo dipendente
        <div class="rectangle" style = "width: 600px; height: 470px; padding-top: 10px;">

    <div style = "transform: scale(1); margin-top: 5px;">

      <div style = "position: absolute; left: -330px; top: 80px; width: fit-content;">
        <img src = "../../../img/profiloM2.png" v-if = "genere_selezionato == 0" width="250px">
        <img src = "../../../img/profiloF2.png" v-if = "genere_selezionato == 1" width="250px">
      </div>

          <span class = "etichetta">
            nome
          </span>
            <div class = "rectangle-1" style = "padding: 3px;">
                <input type = "text" class = "input" >
            </div>


          <span class = "etichetta">
            cognome
          </span>
            <div class = "rectangle-1" style = "padding: 3px;">
                <input type = "text" class = "input" >
            </div>

          <span class = "etichetta">
            password
          </span>
            <div class = "rectangle-1" style = "padding: 3px;">
                <input type = "text" class = "input" >
            </div>

          <span class = "etichetta">
            matricola coordinatore
          </span>
            <div class = "rectangle-1" style = "padding: 3px;">
                <input type = "text" class = "input" >
            </div>

            <span class = "etichetta">
              genere
            </span>
            <div class="rectangle" style = "display: flex; flex-direction: row; margin-top: -5px;width: 245px; padding: 5px;">
                  <div class="menu-rect" 
                  :style="genere_selezionato == 0 ? 'background: linear-gradient(90deg,rgba(0, 105, 186, 1) 0%,rgba(0, 47, 84, 1) 100%); color: white': ''"
                  @click="selezionaGenere(0)"
                  >M</div>


                  <div class="menu-rect" style = "margin-left: 7px;"
                  :style="genere_selezionato == 1 ? 'background: linear-gradient(90deg,rgba(0, 105, 186, 1) 0%,rgba(0, 47, 84, 1) 100%); color: white' : ''"
                  @click="selezionaGenere(1)"
                  >F</div>
          </div>

            <span class = "etichetta">
              grado
            </span>

              <div class="rectangle" style = "display: flex; flex-direction: row; margin-top: -5px;width: 245px; padding: 5px;">
                  <div class="menu-rect" 
                  :style="grado_selezionato == 0 ? 'background: linear-gradient(90deg,rgba(0, 105, 186, 1) 0%,rgba(0, 47, 84, 1) 100%); color: white': ''"
                  @click="selezionaGrado(0)"
                  >dipendente</div>


                  <div class="menu-rect" style = "margin-left: 7px;"
                  :style="grado_selezionato == 1 ? 'background: linear-gradient(90deg,rgba(0, 105, 186, 1) 0%,rgba(0, 47, 84, 1) 100%); color: white' : ''"
                  @click="selezionaGrado(1)"
                  >coordinatore</div>
          </div>
            
            
            <input type = "text" class = "input" style = "width: 40px; height: 50px;">
        </div>
    </div>
  </div>
</template>

<style scoped>


* {
  font-family: "Sulphur Point", serif;
  color: #002f54;
}

.menu-rect{
  color: #002F54;
  text-align: center;
  font-family: "Sulphur Point", serif;
  font-style: normal;
  font-size: 16px;
  line-height: 24px;  
  font-weight: 1000;
  margin-left: 0px;
  width: 120px;
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

.rectangle {
  margin-top: 5px;
  border-radius: 0.865rem;
  background: #ffffff;
  box-shadow: 0rem 0rem 1.25rem 0rem rgba(0, 0, 0, 0.15);
  position: relative;
  z-index: 0;
  display: block;
  justify-items: center;
  align-content: center;
  font-size: 23px;
  padding-left: 35px;
  width: 40px;
  transition: transform 0.3s ease-in-out;
}
.rectangle::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 0.825rem;
  padding: 0.16rem;
  background: linear-gradient(90deg, rgb(0, 120, 212), rgba(0, 47, 84, 1));
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  z-index: -1;
}

.etichetta{
  margin-top: -5px;
  font-size: 15px;
  text-align: left;
  color: #005597;
}

.rectangle-1{
  margin-top: -5px;
  border-radius: 0.625rem;
  background: #ffffff;
  box-shadow: 0rem 0rem 1.25rem 0rem rgba(0, 0, 0, 0.15);
  position: relative;
  z-index: 1;
  width: 250px;
}

.rectangle-1::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 0.625rem;
  padding: 0.125rem; 
  background: linear-gradient(
    to bottom, 
    white 0%, 
    white 20%, 
    white 50%, 
    rgba(0, 47, 84, 1) 50%, 
    rgba(0, 105, 186, 1) 100%
  ); 
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  z-index: -1;
}


.input{
    border-radius: 20px;
  padding-left: 20px;
  color: #00355C;
  font-weight: 700;
  font-size: 20px;
  border: 2px solid transparent;
  background: none;

}
.input:focus{
    background-color: #eef6fc;
    border-color: none; 
    border-width: 2px;
    transition: border 0.2s ease-in-out;
    outline: none; 
}
</style>