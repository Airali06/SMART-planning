<script setup lang = "ts">


const props = defineProps({
  messaggio_caricamento: String,
  caricamento: Boolean,
});

</script>

<template>

<div class = "contenitore_caricamento">

    <div style = "justify-self: center; display: block; justify-items: center; font-weight: 700;">
        <span>{{ messaggio_caricamento }}</span>
            <div style = "transform: scale(0.6); margin-top: 15px;">
                <CaricamentoElement></CaricamentoElement>
            </div>
    </div>

    <slot/>

</div>


</template>


<style scoped>

*{
color: rgb(0, 40, 71);

}

.contenitore_caricamento{
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
    width: 300px;
    height: 200px;
  }
  
  .contenitore_caricamento::before {
    content: "";
    border: 0px;
    position: absolute;
    inset: 0;
    border-radius: 10px;
    padding: 0.12rem;
    background: linear-gradient(90deg, rgba(0, 105, 186, 1), rgb(0, 60, 105));
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    z-index: -1;
  }
</style>