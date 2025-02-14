<template>
  
    <div class="layout">
      <UiSidebar></UiSidebar>
        <slot />
    </div>
</template>

<style scoped>
.layout {
  position: relative;
  display: grid;
  margin-left: 250px;
}
</style>
