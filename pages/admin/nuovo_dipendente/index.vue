<script setup lang = "ts">
import type { Utente } from '~/store/models/Utente';
import { useDipendenti } from '~/store/dipendenti';
import { useAuth } from '~/store/auth';
const authStore = useAuth();
const router = useRouter();
const route = useRoute();
const aggiorna = ref("");
const dipendentiStore = useDipendenti();
await dipendentiStore.getDipendentiCoordinatore(authStore.utente.id_utente);
let utente = {} as Utente;
let modifica = false;
let errore = "";
const password = ref("");
const nome = ref("");
const cognome = ref("");
const id_coordinatore = ref(0);
let caricamento = false;
let genere_selezionato = "M";
let livello_selezionato = 1;
let coordinatori = [] as Array<Utente>;
  coordinatori = dipendentiStore.getCoordinatori();

if(route.query.idDaModificare == null){
  modifica = false;
}else{
  modifica = true;
  utente = dipendentiStore.getDipendenteById(route.query.idDaModificare*1 as any) as Utente;
  nome.value = utente.nome +"";
  cognome.value = utente.cognome +"";
  livello_selezionato = utente.livello;
  id_coordinatore.value = utente.id_coordinatore as number;
  genere_selezionato = utente.genere+"";
}

function selezionaGenere(n: string){
  genere_selezionato = n;
  aggiorna.value+= " ";
}

function selezionaLivello(n: number){
  livello_selezionato = n;
  aggiorna.value+= " ";
}

async function conferma(){
  console.log(nome.value, cognome.value, password.value, id_coordinatore.value, genere_selezionato, livello_selezionato);
  

  if(authStore.testaPassword(password.value) == false){
    errore = "deve contenere:\nminimo 8 caratteri\n maiuscole/minuscole\n numeri\n caratteri speciali"
    console.log("errore password");
    aggiorna.value += " ";
    return;
  }
  
  utente.nome = nome.value;
  utente.cognome = cognome.value;
  utente.genere = genere_selezionato;
  utente.livello = livello_selezionato;
  utente.id_coordinatore = id_coordinatore.value;
  utente.username = nome.value + " "+ cognome.value;
  caricamento = true;
  aggiorna.value += " ";
  if(modifica == false)
    await dipendentiStore.insertUtente(utente, password.value);
  if(modifica == false)
    await dipendentiStore.updateUtente(utente, password.value);

  await dipendentiStore.getDipendentiCoordinatore(authStore.utente.id_utente);
  caricamento = false;
  aggiorna.value += " ";
  router.push({ name: "admin" });

}


</script>
<template>
   <input type = "text" v-model = "aggiorna" style = "display: none">


    <div style = "justify-self: center; margin-top: 70px; padding-left: 30px;">

      <div class="overlay" v-if="caricamento">
          <CaricamentoPopup
            :caricamento="caricamento"
            messaggio_caricamento="Inserimento utente in corso"
            :key="aggiorna"
            style="margin-top: 300px"
          >
          </CaricamentoPopup>
      </div>


      <div
      class="titolo"
      >
        Nuovo utente
      </div>


       
        <div class="rectangle" style = "width: 600px; height: 460px; padding-top: 10px;">

          <div style = "position: absolute; left: -122px; top: 110px; width: fit-content;">
              <img src = "../../../img/profiloM2.png" v-if = "genere_selezionato == 'M'" width="250px">
              <img src = "../../../img/profiloF2.png" v-if = "genere_selezionato == 'F'" width="250px">
          </div>

    <div style = "transform: scale(1); margin-top: 5px;">

      

          <span class = "etichetta">
            nome
          </span>
            <div class = "rectangle-1" style = "padding: 3px;">
                <input type = "text" class = "input"  v-model ="nome">
            </div>


          <span class = "etichetta">
            cognome
          </span>
            <div class = "rectangle-1" style = "padding: 3px;">
                <input type = "text" class = "input" v-model =" cognome">
            </div>

          <span class = "etichetta">
            password
          </span>
            <div class = "rectangle-1" style = "padding: 3px;">
                <input type = "text" class = "input" v-model="password">
            </div>

         
            <span class = "etichetta">
              genere
            </span>
            <div class="rectangle" style = "display: flex; flex-direction: row; margin-top: -5px;width: 245px; padding: 5px;">
                  <div class="menu-rect" 
                  :style="genere_selezionato == 'M' ? 'background: linear-gradient(90deg,rgba(0, 105, 186, 1) 0%,rgba(0, 47, 84, 1) 100%); color: white': ''"
                  @click="selezionaGenere('M')"
                  >M</div>


                  <div class="menu-rect" style = "margin-left: 7px;"
                  :style="genere_selezionato =='F' ? 'background: linear-gradient(90deg,rgba(0, 105, 186, 1) 0%,rgba(0, 47, 84, 1) 100%); color: white' : ''"
                  @click="selezionaGenere('F')"
                  >F</div>
          </div>

            <span class = "etichetta">
              livello
            </span>

              <div class="rectangle" style = "display: flex; flex-direction: row; margin-top: -5px;width: 245px; padding: 5px;">
                  <div class="menu-rect" 
                  :style="livello_selezionato == 1 ? 'background: linear-gradient(90deg,rgba(0, 105, 186, 1) 0%,rgba(0, 47, 84, 1) 100%); color: white': ''"
                  @click="selezionaLivello(1)"
                  >dipendente</div>


                  <div class="menu-rect" style = "margin-left: 7px;"
                  :style="livello_selezionato == 2 ? 'background: linear-gradient(90deg,rgba(0, 105, 186, 1) 0%,rgba(0, 47, 84, 1) 100%); color: white' : ''"
                  @click="selezionaLivello(2)"
                  >coordinatore</div>
          </div>

          <span class = "etichetta" v-if = "livello_selezionato < 2">
            coordinatore
          </span>
            <div class = "rectangle-1" style = "padding: 3px;" v-if = "livello_selezionato < 2">
              <select v-model="id_coordinatore" style = "width: 220px; font-size: 19px; font-weight: 700; border: none; margin-left: 10px; height: 30px; padding-left: 10px;">

                    <option value = "0">
                        --------
                    </option>

                    <option 
                      v-for="coordinatore in coordinatori" 
                      :key="aggiorna" 
                      :value="coordinatore.id_coordinatore"
                    >
                      {{ coordinatore.username }}
                    </option>
                  </select>
            </div>

            
            
            <input type = "text" class = "input" style = "width: 40px; height: 50px;">
        </div>

        
      <div class = "conferma" style = "width: 200px; height: 30px;" @click = "conferma()"> conferma</div>





  
</div>


  </div>



  <div
    v-if="errore != ''"
    class="overlay"
    style="position: absolute; left: 0px"
  >
    <div
      v-if="errore != ''"
      class="errore"
      style="justify-self: center; margin-top: 300px;"
    >
      <div style="display: flex; flex-direction: row">
        <span style="font-size: 25px; font-weight: 700; margin-top: 5px"
          >Password non valida!</span
        >
        <img
          src="../../../img/warning.png"
          style="width: 35px; height: 35px; margin-left: 10px"
        />
      </div>

      <div
        style="
          font-size: 16px;
          width: 300px;
          padding-left: 20px;
          padding-right: 20px;
        "
      >
        {{ errore }}
      </div>

      <div class="x" @click="errore = ''; aggiorna+= ' '">
        <img src="../../../img/remove.png" height="50px" />
      </div>
    </div>
  </div>
    
</template>

<style scoped>


* {
  font-family: "Sulphur Point", serif;
  color: #002f54;
}
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 105, 186, 0.2); /* Azzurro semitrasparente */
  z-index: 1000; /* Assicura che sia sopra gli altri elementi */
  display: block;
  justify-content: center;
  justify-items: center;
  align-items: center;
}

.x {
  padding: 5px;
  background: rgba(0, 47, 84, 1);

  border-radius: 25px;
  align-items: center;
  position: absolute;
  top: -35px;
  right: -35px;
  height: 85px;
  width: 85px;
  scale: 0.4;
  display: flex;
  justify-content: center;
  vertical-align: middle;
  z-index: 1000;
}

.errore {
  border-radius: 0.925rem;
  background: #ffffff;
  box-shadow: 0rem 0rem 1.25rem 0rem rgba(0, 0, 0, 0.15);
  position: relative;
  padding: 2px;
  z-index: 0;
  width: 400px;
  height: 200px;
  display: block;
  justify-items: center;
  align-items: center;
  align-content: center;
  justify-content: center;
  display: block;
}

.titolo {
  background: linear-gradient(
    90deg,
    rgb(0, 89, 156) 0%,
    rgb(0, 41, 73) 100%
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: left;
  font-size: 3.5rem;
  line-height: 3.5rem;
  font-weight: 700;
  justify-self: center;
  margin: 30px;
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

.conferma{
  background: linear-gradient(90deg,rgba(0, 105, 186, 1) 0%,rgba(0, 47, 84, 1) 100%);
  color: #ffffff;
  border-radius: 0.825rem;
  font-weight: 700;
  text-align: center;
  width: 350px;
  transform: scale(1);;
  height: 30px;
  padding: 3px;
  position: absolute;
  left: 230px;
  bottom: -15px;
  font-size: 21px;
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

  .overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 105, 186, 0.2); /* Azzurro semitrasparente */
  z-index: 1000; /* Assicura che sia sopra gli altri elementi */
  display: block;
  justify-content: center;
  justify-items: center;
  align-items: center;
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