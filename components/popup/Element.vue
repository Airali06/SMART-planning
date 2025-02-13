<script setup lang="ts">
import type {Postazione}  from "../../store/models/Postazione.ts";
const props = defineProps({
   postazione: Object as PropType<Postazione>
});

</script>

<template>

    <div>
        <img src = "../../img/popup.png" height="60px">
    </div>

    
</template>
