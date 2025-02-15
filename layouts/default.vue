<script setup lang = "ts">


</script>

<template>
    <div class="layout"  :key="$route.fullPath">
      <UiSidebar></UiSidebar>
      <slot />
    </div>
</template>

<style scoped>
.layout {
  position: relative;
  display: grid;
  margin-left: 190px;
}
</style>
