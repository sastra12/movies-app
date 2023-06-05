<template>
  <section class="mt-6 sm:mt-10">
    <div class="px-6 sm:px-0 sm:w-4/5 sm:mx-auto">
      <h1 class="text-lg sm:text-xl font-bold text-secondary2 font-poppins">
        Browse Movie By Category
      </h1>
      <div class="flex gap-3 overflow-y-auto pt-2 pb-4">
        <button
          v-for="item in movieStore.movieGenres"
          :key="item.id"
          class="px-4 min-w-max py-2 text-xs rounded-full bg-gray-100"
          :class="[item.id == defaultCategory.id ? defaultCategory.class : '']"
          type="button"
          @click="getMovieByCategory(item.id)"
        >
          {{ item.name }}
        </button>
      </div>
      <div></div>
    </div>
  </section>
</template>

<script setup>
import axios from 'axios'
import { useMoviesStore } from '@/stores/movies.js'
import { onMounted, reactive, ref } from 'vue'

const api_key = import.meta.env.VITE_APP_API_KEY
const defaultCategory = reactive({
  class: 'bg-secondary text-white',
  id: null
})
const movieByCategory = ref([])

const movieStore = useMoviesStore()

const getMovieByCategory = async (id) => {
  defaultCategory.id = id == null ? 28 : id
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&with_genres=${defaultCategory.id}&page=1`
    )
    console.log(response)
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  getMovieByCategory()
})
</script>

<style></style>
