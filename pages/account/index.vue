<script setup lang="ts">
const router = useRouter();
import { useAuth } from "../../store/auth";
const authStore = useAuth();
import { usePrenotazioni } from "../../store/prenotazioni";
import { usePostazioni } from "../../store/postazioni";
const prenotazioniStore = usePrenotazioni();
const postazioniStore = usePostazioni();


</script>

<template>
    <head>
    <!-- Caricamento del font e dei CSS -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Sulphur+Point:wght@300;400;700&display=swap"
      rel="stylesheet"
    />
  </head>
    
      
      <div class="account">
        <div class="header">
    
          <div style = "display: flex; display: box;">
            <img class="profile-1" src="../../img/profilo.png" />
            <img class="rectangle-27" src="../../img/rectangle.svg" />
          </div>
    
        </div>
    
        <div style = "display: box; justify-items: center; width: 100%; margin-top: 27px;">
          <div class="menu">
            <div class="menu-rect">in scadenza oggi</div>
            <div class="menu-rect">tutte le prenotazioni</div>
            <div class="menu-rect">calendario</div>
          </div>
        </div>
       
    
        <div class="in-scadenza-oggi">In scadenza oggi</div>
       
        <div class="calendario">calendario</div>
        <div class="tutte-le-prenotazioni">tutte le prenotazioni</div>


      </div>
      
    </template>
    
    
    
<style scooped>
      /*a,
      button,
      input,
      select,
      h1,
      h2,
      h3,
      h4,
      h5,
      * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          border: none;
          text-decoration: none;
          background: none;
      
          -webkit-font-smoothing: antialiased;
      }*/
      
      /*menu, ol, ul {
          list-style-type: none;
          margin: 0;
          padding: 0;
      } */

      /*.account,
.account * {
  box-sizing: border-box;
}
.account {
  background: #ffffff;
  height: 832px;
  position: relative;
  overflow: hidden;
}*/

.header{
  display: box;
  justify-items: center;
  background: #ffffff;
  padding: 45px;
  width: 100%;
  height: 240px;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.15);
}



/*.rectangle-25 {
  background: linear-gradient(
    90deg,
    rgba(0, 105, 186, 1) 0%,
    rgba(0, 47, 84, 1) 100%
  );
  border-radius: 11px;
  width: 166px;
  height: 36px;
}*/
.profile-1 {
  width: 210px;
  height: 210px;
  padding: 10px;
  border: 1px solid black;
  
}
.rectangle-27 {
  border-radius: 0px;
  width: 339px;
  height: 204px;
  padding: 10px;
  border: 1px solid black;
  overflow: visible;
}
.menu {
  background: #CCE1F1;
  border-radius: 0.625rem;
  width: 540px;
  height: 35px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  
  /*box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.15);*/
}
.menu-rect{
  color: #002F54;
  text-align: center;
  font-family: "Sulphur Point", serif;
  font-style: normal;
  font-size: 16px;
  line-height: 24px;  
  font-weight: 1000;
  width: 160px;
  height: 32px;

  border-radius: 0.625rem;
  background: #CCE1F1;
  box-shadow: 0rem 0rem 1.25rem 0rem rgba(0, 0, 0, 0.15);
  position: relative;
  padding: 2px;
  z-index: 0;
  display: block;
  justify-items: center;
  align-items: center;
  align-content: center;
  justify-content: center;
}
/*.menu-rect::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 0.625rem;
  padding: 0.18rem; 
  background: linear-gradient(90deg, rgba(0, 105, 186, 1), rgba(0, 47, 84, 1));
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  z-index: -1;
}*/
.in-scadenza-oggi {
  color: #ffffff;
  text-align: center;
  font-family: "SulphurPoint-Bold", sans-serif;
  font-size: 16px;
  line-height: 24px;
  font-weight: 700;
  width: 203px;
  height: 30px;
}
/*.rectangle-121 {
  background: rgba(255, 255, 255, 0);
  border-radius: 10px;
  border-width: 2px;
  border-style: solid;
  border-image: linear-gradient(
    269.79deg,
    rgba(0, 47, 84, 1) 0%,
    rgba(0, 105, 186, 1) 100%
  );
  border-image-slice: 1;
  width: 189px;
  height: 36px;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.15);
}
.rectangle-122 {
  background: rgba(255, 255, 255, 0);
  border-radius: 10px;
  border-width: 2px;
  border-style: solid;
  border-image: linear-gradient(
    269.79deg,
    rgba(0, 47, 84, 1) 0%,
    rgba(0, 105, 186, 1) 100%
  );
  border-image-slice: 1;
  width: 121px;
  height: 36px;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.15);
}*/ 
.calendario {
  color: #002f54;
  text-align: left;
  font-family: "SulphurPoint-Bold", sans-serif;
  font-size: 16px;
  line-height: 24px;
  font-weight: 700;
  width: 203px;
  height: 30px;
}
.tutte-le-prenotazioni {
  color: #002f54;
  text-align: left;
  font-family: "SulphurPoint-Bold", sans-serif;
  font-size: 16px;
  line-height: 24px;
  font-weight: 700;
  width: 203px;
  height: 30px;
}
/*.group-11 {
  position: absolute;
  inset: 0;
}
.matricola {
  color: #002f54;
  text-align: left;
  font-family: "SulphurPoint-Bold", sans-serif;
  font-size: 14px;
  line-height: 24px;
  font-weight: 700;
  top: 122px;
  width: 203px;
  height: 30px;
}*/
/*.mary-reds {
  color: #002f54;
  text-align: left;
  font-family: "SulphurPoint-Bold", sans-serif;
  font-size: 14px;
  line-height: 24px;
  font-weight: 700;
  position: absolute;
  left: 677px;
  top: 201px;
  width: 203px;
  height: 30px;
}
.coordinatore {
  color: #002f54;
  text-align: left;
  font-family: "SulphurPoint-Bold", sans-serif;
  font-size: 10px;
  line-height: 24px;
  font-weight: 700;
  width: 203px;
  height: 20px;
}*/
/*.fd-5-gkj-39-gd {
  color: #002f54;
  text-align: left;
  font-family: "SulphurPoint-Bold", sans-serif;
  font-size: 20px;
  line-height: 24px;
  font-weight: 700;
  width: 203px;
  height: 38px;
}*/
/*.div {
  color: #002f54;
  text-align: left;
  font-family: "SulphurPoint-Bold", sans-serif;
  font-size: 20px;
  line-height: 24px;
  font-weight: 700;
  width: 203px;
  height: 38px;
}*/
/*.gianni-gialli {
  color: #002f54;
  text-align: left;
  font-family: "SulphurPoint-Bold", sans-serif;
  font-size: 30px;
  line-height: 24px;
  font-weight: 700;
  width: 203px;
}*/
/*.rectangle-38 {
  border-radius: 0px;
  width: 105px;
  height: 30px;
  overflow: visible;
}
.edit-2 {
  width: 19px;
  height: 19px;
  object-fit: cover;
}*/
/*.matricola2 {
  color: #ffffff;
  text-align: left;
  font-family: "SulphurPoint-Bold", sans-serif;
  font-size: 14px;
  line-height: 24px;
  font-weight: 700;
  width: 203px;
  height: 30px;
}*/

.rectangle {
  border-radius: 0.625rem;
  background: #CCE1F1;
  box-shadow: 0rem 0rem 1.25rem 0rem rgba(0, 0, 0, 0.15);
  position: relative;
  padding: 2px;
  z-index: 0;
  display: block;
  justify-items: center;
  align-items: center;
  align-content: center;
  justify-content: center;
}

/*.rectangle::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 0.625rem;
  padding: 0.17rem;
  background: linear-gradient(90deg, rgba(0, 105, 186, 1), rgba(0, 47, 84, 1));
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  z-index: -1;
}*/

</style>