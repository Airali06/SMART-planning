<script setup lang = "ts">
const router = useRouter();
import { useAuth } from "../../store/auth";
</script>


<template>


<div style = "display: block; justify-content: center; align-content: center; margin-top: 150px;">
<div  style = " position: relative;   width: fit-content;   justify-self: center;">

    <div class = "titolo" style = "font-weight: 700; padding-left: 25px;  margin-bottom: 50px;">
        <span class = "titolo" style = "font-size: 25px; position: absolute; top: -15px; left: 50px;"> pannello di</span>
       <span style = "font-size: 50px;">Amministrazione</span> 
       <img src = "../../img/impostazioni_admin.png" width="65px" style = "position: absolute; right: 20px;top: -15px" >
    </div>

    <div class = "rectangle" @click = "router.push({ name: 'dipendenti'})">
        Gestione
        <span style = "font-weight: 700; font-size: 26px;"> Utenti</span>
        <img src = "../../img/impostazioni_utente.png" width="40px" class = "icon">
    </div>

    <div class = "rectangle">
        Gestione
        <span style = "font-weight: 700; font-size: 26px;">Postazioni</span>
        <img src = "../../img/mappa.png" width="35px" class = "icon">
    </div>

    <div class = "rectangle">
        Gestione
        <span style = "font-weight: 700; font-size: 26px;">Prenotazioni</span>
        <img src = "../../img/calendario.png" width="30px" class = "icon">
    </div>

    <div class = "rectangle">
        Aggiungi
        <span style = "font-weight: 700; font-size: 26px;"> Utenti</span>
        <img src = "../../img/aggiungi_utente.png" width="30px" class = "icon">
    </div>
        

</div>
</div>

</template>

<style scoped>

* {
  font-family: "Sulphur Point", serif;
  color: #002f54;
}

.titolo{
    background: linear-gradient(
    90deg,
    rgba(0, 105, 186, 1) 0%,
    rgba(0, 47, 84, 1) 100%
  );
  background-clip: text;
  
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
}

.rectangle {
  margin-top: 10px;
  
  border-radius: 0.625rem;
  background: #ffffff;
  box-shadow: 0rem 0rem 1.25rem 0rem rgba(0, 0, 0, 0.15);
  position: relative;
  padding: 20px;
  z-index: 0;
  display: block;
  justify-items: center;
  align-items: center;
  align-content: center;
  justify-content: center;
  width: 430px;
  height: 40px;
  font-size: 23px;
  padding-left: 35px;
  transition: transform 0.3s ease-in-out;
}
.rectangle:hover {
  transform: scale(1.03);
}
.rectangle::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 0.625rem;
  padding: 0.16rem;
  background: linear-gradient(90deg, rgb(0, 120, 212), rgba(0, 47, 84, 1));
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  z-index: -1;
}

.icon{
    position: absolute;
    right: 35px;
    bottom: 20px;
}
</style>