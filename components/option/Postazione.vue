<script setup lang="ts">
const props = defineProps({
  add: Boolean,
  tipo: String,
});

const tipo = props.tipo as String;
const add = props.add as Boolean;

</script>

<template>
  <div class="rectangle" style="width: 130px; height: 125px">
    <img
      src="../../img/sala_riunioni.png"
      height="65px"
      style="display: block; margin-top: 5px"
      v-if="tipo == 'SalaRiunioni' || tipo == 'B'"
    />
    <div
      style="line-height: 0.8; margin-top: 8px"
      v-if="tipo == 'SalaRiunioni' || tipo == 'B'"
    >
      sala
      <span style="font-size: 20px">Riunioni</span>
    </div>

    <img
      src="../../img/scrivania.png"
      height="75px"
      style="display: block; margin-top: 5px"
      v-if="tipo == 'ScrivaniaStandard' || tipo == 'A1'"
    />
    <div
      style="line-height: 0.8; margin-top: -8px"
      v-if="tipo == 'ScrivaniaStandard' || tipo == 'A1'"
    >
      scrivania<br />
      <span style="font-size: 20px">Standard</span>
    </div>

    <img
      src="../../img/scrivania_con_monitor.png"
      height="60px"
      style="display: block; margin-top: 5px"
      v-if="tipo == 'ScrivaniaMonitor' || tipo == 'A2'"
    />
    <div
      style="line-height: 0.8; margin-top: 4px"
      v-if="tipo == 'ScrivaniaMonitor' || tipo == 'A2'"
    >
      scrivania<br />con
      <span style="font-size: 20px">Monitor</span>
    </div>

    <img
      src="../../img/parcheggio.png"
      height="60px"
      style="display: block; margin-top: 5px"
      v-if="tipo == 'Parcheggio' || tipo == 'C'"
    />
    <div
      style="line-height: 0.8; margin-top: 4px"
      v-if="tipo == 'Parcheggio' || tipo == 'C'"
    >
      Parcheggio<br />
      <span style="font-size: 20px">Riservato</span>
    </div>

    <div class="add" v-if="add == true">
      <img src="../../img/add.png" height="30px" />
    </div>
  </div>
</template>

<style scoped>
.add {
  padding: 3px;
  background: linear-gradient(
    90deg,
    rgba(0, 105, 186, 1) 0%,
    rgba(0, 47, 84, 1) 100%
  );
  border-radius: 0.625rem;

  position: absolute;
  top: 20px;
  left: -15px;
  height: 35px;
}

.rectangle {
  border-radius: 0.625rem;
  background: #ffffff;
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

.rectangle::before {
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
}
</style>
