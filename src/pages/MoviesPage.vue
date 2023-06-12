<template>
  <default-container>
    <div class="sm:flex sm:gap-x-2">
      <h1 class="text-lg sm:text-xl font-bold text-secondary2 font-poppins">Movies</h1>
    </div>

    <div class="flex flex-col sm:flex-row sm:gap-x-2 sm:mt-4">
      <div class="sm:w-2/5 md:w-2/6 lg:w-1/4">
        <accordion header="Sort">
          <div class="px-2 py-3 rounded-md">
            <span class="text-sm sm:text-base font-semibold">Sort Results By</span>
            <div
              class="py-2 text-sm sm:text-base hover:bg-secondary hover:text-white px-2 cursor-pointer rounded-sm my-2"
              :class="[
                activeSort.item == item.title || item.value == sort_by ? activeSort.class : ''
              ]"
              v-for="item in movieStore.sort_by"
              :key="item"
              @click="addSortBy(item)"
            >
              {{ item.title }}
            </div>
          </div>
        </accordion>

        <accordion header="Filters">
          <div class="px-2 py-3 rounded-md">
            <span class="text-sm sm:text-base font-semibold">Select By Genre</span>
            <div class="mt-2 max-h-32 sm:max-h-56 overflow-y-auto">
              <div
                class="py-1 text-sm sm:text-base hover:bg-secondary hover:text-white px-2 cursor-pointer rounded-sm"
                v-for="item in movieStore.movieGenres"
                :key="item.id"
              >
                {{ item.name }}
              </div>
            </div>
          </div>
        </accordion>
      </div>

      <div
        class="px-2 grid grid-cols-2 min-[455px]:grid-cols-2 min-[800px]:grid-cols-3 lg:grid-cols-4 gap-2 sm:w-3/5 md:w-4/6 lg:w-3/4"
      >
        <div class="pt-2 sm:pt-3" v-for="item in movies" :key="item.id">
          <NowPlayingMovies :item="item" />
        </div>
      </div>
    </div>
  </default-container>
</template>

<script setup>
import DefaultContainer from '../components/Layouts/DefaultContainer.vue'
import Accordion from '@/components/Reusable/Accordion.vue'
import NowPlayingMovies from '@/components/Movies/NowPlayingMovies.vue'
import { useMoviesStore } from '../stores/movies'

import { ref, onMounted, reactive, watch } from 'vue'
import axios from 'axios'

const api_key = import.meta.env.VITE_APP_API_KEY
const movieStore = useMoviesStore()
const movies = ref([])
const sort_by = ref('popularity.desc')
const activeSort = reactive({
  class: 'bg-secondary text-white',
  item: ''
})

onMounted(async () => {
  getDataMovies()
  await movieStore.getmovieGenres()
})

const getDataMovies = async () => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&sort_by=${sort_by.value}`
    )
    movies.value = response.data.results
  } catch (error) {
    console.log(error)
  }
}

watch(sort_by, () => {
  getDataMovies()
})

const addSortBy = (item) => {
  activeSort.item = item.title
  sort_by.value = item.value
}
</script>
