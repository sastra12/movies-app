<template>
  <div
    v-show="modalActive"
    class="absolute w-full bg-black bg-opacity-30 h-screen top-0 left-0 flex justify-center px-8 z-50"
  >
    <div v-if="modalActive" class="p-4 bg-white self-start mt-32 w-full sm:w-2/4">
      <slot />
      <button class="bg-red-500 mt-4 rounded-sm py-2 px-4 text-white" @click="$emit('close-modal')">
        Close
      </button>
    </div>
  </div>
</template>

<script setup>
defineEmits(['close-modal'])
defineProps({
  modalActive: {
    type: Boolean,
    default: false
  }
})
</script>
