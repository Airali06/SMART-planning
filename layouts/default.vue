<script setup lang = "ts">


</script>

<template>
    <div   :key="$route.fullPath">
      <UiSidebar></UiSidebar>
      <slot />
    </div>
</template>

<style scoped>

</style>

