<template>
  <div class="border rounded-md drop-shadow-md my-3">
    <div
      class="flex cursor-pointer flex-wrap items-center justify-between border-b py-2 px-2"
      role="button"
      @click="open"
    >
      <h1 class="text-sm sm:text-base font-poppins">{{ props.header }}</h1>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-4 h-4 text-slate-400"
        :class="isOpen ? 'rotate-180 duration-500' : 'rotate-(-180) duration-500'"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
      </svg>
    </div>

    <div v-if="isOpen" class="w-full">
      <slot>
        <p class="px-2">Whoops, somebody forget to populate me!</p>
      </slot>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({
  header: {
    type: String,
    required: true
  }
})
const isOpen = ref(true)

const open = () => {
  isOpen.value = !isOpen.value
}
</script>
