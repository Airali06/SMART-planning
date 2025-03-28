<script setup lang = "ts">
import type { Utente } from '~/store/models/Utente';
const props = defineProps({
  dipendnente: {} as PropType<Utente>,
});
</script>


<template>

        <div class = "contenitore">

            <div style = "
                          position: absolute; 
                          z-index: 10; 
                          display: flex; 
                          flex-direction: column;
                          top: 63px; left: 120px">
                <span style = "font-size: 24px; font-weight: 700;">{{ props.dipendnente?.username }}</span>
                <span>matricola</span>
                <span style = "font-size: 18px; font-weight: 700; margin-top: -5px">{{ props.dipendnente?.id_utente }}</span>
                <div class = "button"> visualizza prenotazioni</div>
            </div>

            <img src = "../../img/profilo.png" style = "position: absolute; left: -70px; top: 43px; height: 140px;">
            <img src = "../../img/rectangle.svg" style = "margin-left: 35px; width: 310px; margin-top: 8px; margin-right: 12px;">
        </div>


</template>

<style scoped>

* {
  font-family: "Sulphur Point", serif;
  color: #002f54;
}

.button {
  background: linear-gradient(
    90deg,
    rgba(0, 105, 186, 1) 0%,
    rgba(0, 47, 84, 1) 100%
  );
  margin-top: 5px;
  border: 0px;
  padding-top: 5px;
  padding-bottom: 5px;
  text-align: center;
  color: white;
  border-radius: 11px;
  width: 120px;
  font-family: "Sulphur Point", serif;
  font-weight: 400;
  font-style: normal;
  justify-self: center;
  font-size: 17px;
  display: block;
  cursor:pointer;
  width: 200px;
}

.contenitore {
    border-radius: 10px;
    background: #ffffff;
    box-shadow: 0rem 0rem 1.25rem 0rem rgba(0, 0, 0, 0.15);
    position: relative;
    padding: 12px;
    z-index: 0;
    display: block;
    justify-items: center;
    align-items: center;
    align-content: center;
    justify-content: center;
    border: 0px;
    width: fit-content;
    height: fit-content;
  }
  
  .contenitore::before {
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

</style>