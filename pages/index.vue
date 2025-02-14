<script setup lang = "ts">
import  { useAuth } from '../store/auth';
const authStore = useAuth();

const id_utente = ref(); // 0 come id utente considerato come utente vuoto
const password = ref('');


async function login(){
    id_utente.value = id_utente.value; //rimozione eventuali spazi
    await authStore.login(id_utente.value,password.value);
    
}
</script>


<template> 


  <head>
      <!-- Caricamento del font e dei CSS -->
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Sulphur+Point:wght@300;400;700&display=swap" rel="stylesheet">
      
    </head>


    <div class="login">
      <div class="sfondo-login-frame">
        <img src="../img/sfondo.png" width="700px" />
      </div>
  
      <div class="login-frame">
        <div class="login2">Login</div>
        <img class="profile-1" src="../img/profilo.png" />
        <div class="div">?</div>
  
        <div class="rectangle" 
          style="position: absolute; left: 50%; transform: translateX(-50%); top: 15.625rem; width: 16.5rem; height: 2.5625rem;">
          
          <!--input id utente-->
          <input v-model = "id_utente" type="text" style="width: 100%; height: 100%; border-radius: 10px;" />
        
        
        </div>
        <div class="matricola">matricola</div>
  

        <div class="rectangle" 
          style="width: 16.5rem; height: 2.5625rem; position: absolute; left: 50%; transform: translateX(-50%); top: 20.3125rem;">
          
          <!--input id password-->
          <input v-model = "password" type="password" style="width: 100%; height: 100%; border-radius: 10px;" />
        
        
        </div>
        <div class="password">password</div>
  
        <button class="accedi" @click="login()">accedi</button>
      </div>
  
      <div class="z-planning">Z-Planning</div>
    </div>
  </template>
  
  
  
  <style scoped>

  *{
    
  font-family: "Sulphur Point", serif;
  }

a, button, select, h1, h2, h3, h4, h5, * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          border: none;
          text-decoration: none;
          background: none;
          -webkit-font-smoothing: antialiased;
        }

        menu, ol, ul {
          list-style-type: none;
          margin: 0;
          padding: 0;
        }

 .sulphur-point-light {
  font-family: "Sulphur Point", serif;
  font-weight: 300;
  font-style: normal;
}

.sulphur-point-regular {
  font-family: "Sulphur Point", serif;
  font-weight: 400;
  font-style: normal;
}

.sulphur-point-bold {
  font-family: "Sulphur Point", serif;
  font-weight: 700;
  font-style: normal;
}
.login,
.login * {
  box-sizing: border-box;
  font-family: "Sulphur Point", sans-serif;
}
.login {
  background: #ffffff;
  height: 52rem;
  position: relative;
  overflow: hidden;
}
.sfondo-login-frame {
  padding: 50px;
  position: absolute;
  left: 50%;
  translate: -50% -50%;
  top: 55%;
  overflow: hidden;

}

.login-frame {
  background: rgba(255, 255, 255, 0.94);
  border-radius: 0.625rem;
  width: 23.25rem;
  height: 29.5625rem;
  position: absolute;
  left: 50%;
  translate: -50% -50%;
  top: 50%;
  box-shadow: 0rem 0rem 2.5rem 0rem rgba(0, 86, 152, 0.32);
  overflow: hidden;
}
.login2 {
  color: #0069ba;
  text-align: left;
  font-family: "Sulphur Point", sans-serif;
  font-size: 1.875rem;
  line-height: 1.5rem;
  font-weight: 700;
  position: absolute;
  left: 2.5rem;
  top: 1.875rem;
  width: 8.375rem;
  height: 2.125rem;
}
.profile-1 {
  width: 8.75rem;
  height: 8.75rem;
  position: absolute;
  left: 7.25rem;
  top: 4.375rem;
  object-fit: cover;
}
.div {
  color: #ffffff;
  text-align: left;
  font-size: 1.875rem;
  line-height: 1.5rem;
  font-weight: 400;
  position: absolute;
  left: 11.25rem;
  top: 7.5rem;
  width: 1.25rem;
  height: 2.25rem;
}

.rectangle{
  
  border-radius: 0.625rem;
  background: #ffffff;
  box-shadow: 0rem 0rem 1.25rem 0rem rgba(0, 0, 0, 0.15);
  position: relative;
  z-index: 1;
}

.rectangle::before {
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

.matricola {
  color: #0069ba;
  text-align: left;
  font-family: "Sulphur Point", sans-serif;
  font-size: 1.125rem;
  line-height: 1.5rem;
  font-weight: 400;
  position: absolute;
  left: 4rem;
  top: 14.0625rem;
  width: 8.375rem;
  height: 1.8125rem;
}

.password {
  color: #0069ba;
  text-align: left;
  font-family: "Sulphur Point", sans-serif;
  font-size: 1.125rem;
  line-height: 1.5rem;
  font-weight: 400;
  position: absolute;
  left: 4rem;
  top: 18.75rem;
  width: 8.375rem;
  height: 1.8125rem;
}

.accedi {
  background: linear-gradient(
    90deg,
    rgba(0, 105, 186, 1) 0%,
    rgba(0, 47, 84, 1) 100%
  );
  border-radius: 0.625rem;
  width: 16.5rem;
  height: 2.5625rem;
  position: absolute;
  left: 50%;
  transform: translateX(-50%); /* Corretto l'uso di translate */
  top: 24.5625rem;
  box-shadow: 0rem 0rem 1.25rem 0rem rgba(0, 0, 0, 0.15);
  color: #ffffff;
  text-align: center;
  font-family: "Sulphur Point", sans-serif;
  font-size: 1.25rem;
  line-height: 1.5rem;
  font-weight: 700;
}

.accedi:hover {
  background: linear-gradient(
    90deg,
    rgb(0, 87, 153) 0%,
    rgb(0, 20, 36) 100%
  ); 
}

.z-planning {
  background: linear-gradient(
    90deg,
    rgba(0, 105, 186, 1) 0%,
    rgba(0, 47, 84, 1) 100%
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  font-family: "Sulphur Point", sans-serif;
  font-size: 4.375rem;
  line-height: 5.5rem;
  font-weight: 700;
  position: absolute;
  left: 50%;
  translate: -50%;
  top: 60px;
}

input{
  padding-left: 20px;
  color: #00355C;
  font-weight: 700;
  font-size: 20px;
  border: 2px solid transparent;

}
input:focus{

    border-color: #023b64; 
    border-width: 2px;
    transition: border 0.2s ease-in-out;
    outline: none; 
  
}
  </style>
