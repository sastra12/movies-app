<template>
  <button :class="buttonClass" @click="$emit('event')">
    {{ props.text }}
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  type: {
    type: String
  }
})
const buttonClass = computed(() => {
  return {
    [props.type]: true
  }
})
</script>

<style scoped>
button {
  @apply px-3 min-w-max py-1 text-xs rounded-full;
}
.primary {
  @apply bg-secondary text-white;
}

.secondary {
  @apply bg-gray-100;
}
</style>
