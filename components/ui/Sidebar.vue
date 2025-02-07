<script setup>
import { ref } from "vue";

const isCollapsed = ref(false);

const comprimi = () => {
  isCollapsed.value = !isCollapsed.value;
};

function logout() {}
</script>

<template>
  <div :class="['sidebar', { collapsed: isCollapsed }]">
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
      <span>home</span>
      <span>account</span>
      <span>nuova prenotazione</span>
      <span>mappa</span>
    </div>

    <button class="logout" v-if="!isCollapsed" @click="logout()">logout</button>
  </div>
</template>

<style scoped>
/* Sidebar Normale */
.sidebar {
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
}

span {
  margin-top: 10px;
  margin-left: 20px;
}
</style>
