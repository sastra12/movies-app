<template>
  <div
    @click.self="movieStore.changeModalStatus()"
    class="absolute w-full top-0 left-0 flex justify-center px-8 z-50"
  >
    <div v-if="movieStore.modalStatus" class="p-4 bg-white self-start mt-32 w-full sm:w-2/4">
      <slot />
      <button
        class="bg-red-500 mt-4 rounded-sm py-2 px-4 text-white"
        @click="movieStore.changeModalStatus()"
      >
        Close
      </button>
    </div>
  </div>
</template>

<script setup>
import { useMoviesStore } from '@/stores/movies.js'

const movieStore = useMoviesStore()
</script>
