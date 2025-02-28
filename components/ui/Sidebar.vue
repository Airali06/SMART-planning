<script setup>
import { ref } from "vue";
const router = useRouter();
import  { useAuth } from '../store/auth';
const authStore = useAuth();

const isCollapsed = ref(false);

const comprimi = () => {
  isCollapsed.value = !isCollapsed.value;
};

async function logout() {
  await authStore.logout();
  console.log(authStore.utente.id_utente);
  console.log(authStore.utente.controlCode);
}

const route = useRoute();




    
</script>




<template>


<head>
  <!-- Caricamento del font e dei CSS -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Sulphur+Point:wght@300;400;700&display=swap" rel="stylesheet">
  
</head>



  <div :class="['sidebar', { collapsed: isCollapsed }]" v-if = "!(route.path === '/' || route.path === '/index')">
    <button
      class="burger"
      @click="comprimi"
      style="margin-top: 25px; margin-right: 15px; justify-self: right"
    >
      <img src="../../img/burger-bar.png" height="40px" />
    </button>

    <div
      style="
        display: flex;
        flex-direction: column;
        margin-left: 15px;
        margin-top: 30px;
      "
      v-if="!isCollapsed"
    >
      <span style="cursor:pointer"
          @click="
            router.push({ name: 'home'})">home </span>

      <span style="cursor:pointer">account</span>

      <span style="cursor:pointer"
          @click="
            router.push({ name: 'nuova_prenotazione', params: { option: 0, modifica : 0} })">nuova prenotazione</span>

      <span style="cursor:pointer">mappa</span>
    </div>

    <button class="logout" v-if="!isCollapsed" @click="logout()">logout</button>
  </div>
</template>

<style scoped>
/* Sidebar Normale */
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

.sidebar {
  font-family: "Sulphur Point", serif;
  width: 250px;
  height: 100vh;
  background: linear-gradient(90deg, rgb(2, 83, 145) 0%, rgb(1, 76, 134) 100%);
  color: white;
  padding: 20px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  transition: width 0.3s ease-in-out;
}

/* Sidebar Ristretta */
.sidebar.collapsed {
  width: 80px;
  padding: 20px 10px;
}

/* Bottone Toggle */
.burger {
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  display: block;
  margin-bottom: 20px;
}

/* Nasconde il testo quando la sidebar è ristretta */
.sidebar.collapsed ul {
  display: none;
}

.logout {
  background: linear-gradient(
    90deg,
    rgba(0, 105, 186, 1) 0%,
    rgba(0, 47, 84, 1) 100%
  );

  border: 0px;
  padding: 10px;
  color: white;
  border-radius: 15px;
  width: 120px;
  font-family: "Sulphur Point", serif;
  font-weight: 400;
  font-style: normal;
  justify-self: center;
  font-size: 20px;
  display: block;
  margin-top: 50px;
  cursor:pointer
}

span {
  margin-top: 10px;
  margin-left: 20px;
}
</style>
