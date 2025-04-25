<script setup lang = "ts">
const props = defineProps({
  markedDates: {
    type: Array,
    default: () => []
  }
})

const attributes = props.markedDates.map(date => ({
  key: date,
  dates: new Date(date),
  highlight: {
    backgroundColor: '#3b82f6', // blu
    borderRadius: '50%',
    color: 'white'
  }
}))
</script>

<template>
    <div class="p-4">
      <VCalendar
        is-expanded
        :attributes="attributes"
        title-position="left"
      />
    </div>
  </template>
  
 