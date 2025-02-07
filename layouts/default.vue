<template>
  <UiSidebar></UiSidebar>
  <div>
    <div class="layout">
      <div>
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.layout {
  position: relative;
  display: grid;
  margin-left: 250px;
}
</style>
