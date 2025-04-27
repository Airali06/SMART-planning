<script setup lang="ts">
const router = useRouter();
import { useAuth } from "../../store/auth";
const authStore = useAuth();
import { useDipendenti } from "../../store/dipendenti";
const dipendentiStore = useDipendenti();
await dipendentiStore.getDipendentiCoordinatore(authStore.utente.id_utente);
let filtrato = [] as any;
filtrato = dipendentiStore.dipendenti;
const key = ref(""); //parola da cercare
const aggiorna = ref("");

function cerca(){
    filtrato = dipendentiStore.cercaDipendenti(key.value);
    aggiorna.value += " ";
}

</script>
<template>

    <input type = "text" v-model = "aggiorna" style = "display: none">

<div style = "transform: scale(0.8); margin-top: 50px;">
    <div class="dipendenti">
            Dipendenti
            <img src = "../../img/cerca_utente.png" width="45px" style = ""/>
      </div>


    <div style = "justify-self: center; position: relative;">
       

        <div style = "justify-self: center; width: 500px; display: flex; flex-direction: row;">
            <input type = "text" class = "input" v-model="key">
            <div class = "cerca" @click="cerca()">
                <img src = "../../img/cerca.png" width = "27px" height = "27px" style = "position: absolute; top: 9px">
            </div>
        </div>


        <div style = "justify-self: center;" class = "scorrimento">
            <DipendenteElement
            class = "dipendente-element"
            v-for="dipendente in filtrato"
            :dipendnente="dipendente"
            >

            </DipendenteElement>
        </div>
    </div>

</div>
</template>

<style scoped>
* {
  font-family: "Sulphur Point", serif;
  color: #002f54;
}


.cerca {
  background: linear-gradient(
    90deg,
    rgba(0, 105, 186, 1) 0%,
    rgba(0, 47, 84, 1) 100%
  );
  margin-left: 10px;
  border: 0px;
  text-align: center;
  color: white;
  position: relative;
  display: flex;
  vertical-align: middle;
  border-radius: 19px;
  font-family: "Sulphur Point", serif;
  font-weight: 400;
  font-style: normal;
  justify-self: center;
  justify-content: center;
  font-size: 17px;
  cursor:pointer;
  height: 45px;
  width: 55px;
}

.dipendente-element{
    justify-self: center; 
    transform: scale(0.9);
    display: inline-block;
    margin: 10px;
    margin-left: 25px;
    margin-right: 25px;
}

.scorrimento{
    padding-left: 20px;
    display: block;
  overflow-y: auto; 
  height: 570px;
  width: 900px;
  margin-top: 40px;
}

.scorrimento::-webkit-scrollbar{
   width: 15px;
   border: 4px;
  border-color: #CCE1F1;
}

.scorrimento::-webkit-scrollbar-track {
  background: #CCE1F1; /* Colore di sfondo */
  border-radius: 10px;
  border: 4px;
}

.scorrimento::-webkit-scrollbar-thumb {
  background:#00345c;
  border-radius: 10px;
  border: 4px;
  border-color: #edccf1;
}

.scorrimento::-webkit-scrollbar-thumb:hover {
  background:#001c31;
}


.dipendenti {
  background: linear-gradient(
    90deg,
    rgba(0, 105, 186, 1) 0%,
    rgba(0, 47, 84, 1) 100%
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: left;
  font-size: 4.5rem;
  line-height: 3.5rem;
  font-weight: 700;
  width: fit-content;
  height: 8.8125rem;
  justify-self: center;
}

.input{
    background-color: #ddeffd;
    display: block;
    justify-self: center;
    border: none; 
    height: 45px;
    width: 500px;
    border-radius: 30px;
    padding-left: 30px;
    font-size:25px;
    transition: border-color 0.3s ease;
    outline: none;
}

.input:focus{
    outline: none;
  border: none; 
  background-color: #dceefc;
  border-bottom: 3px solid #0e5c97;
}

</style>