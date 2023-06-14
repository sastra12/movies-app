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
              :class="[active.item == item.title || item.value == sort_by ? active.class : '']"
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
                class="py-1 mb-2 text-sm sm:text-base px-2 cursor-pointer rounded-sm hover:bg-secondary hover:text-white"
                :class="[activeGenres.includes(item.id) ? 'bg-secondary text-white' : '']"
                v-for="item in movieStore.movieGenres"
                :key="item.id"
                @click="selectGenres(item.id)"
              >
                {{ item.name }} || {{ convertWithGenresToString }}
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
import { inject } from 'vue'

import { ref, onMounted, reactive, watch, computed } from 'vue'
const movieStore = useMoviesStore()
const axiosInstance = inject('$axios')
const movies = ref([])
const sort_by = ref('popularity.desc')
const with_genres = ref([])
const active = reactive({
  class: 'bg-secondary text-white',
  item: '',
  id: ''
})

onMounted(async () => {
  getDataMovies()
  await movieStore.getmovieGenres()
})

const getDataMovies = async () => {
  try {
    const response = await axiosInstance.get(
      `discover/movie?&sort_by=${sort_by.value}&with_genres=${convertWithGenresToString.value}`
    )
    movies.value = response.data.results
  } catch (error) {
    console.log(error)
  }
}

watch(
  [sort_by, with_genres],
  () => {
    getDataMovies()
  },
  { deep: true }
)

const addSortBy = (item) => {
  active.item = item.title
  sort_by.value = item.value
}

const activeGenres = computed(() => {
  return with_genres.value.map(function (item) {
    return item
  })
})

const convertWithGenresToString = computed(() => {
  return with_genres.value.map(String).join(',')
})

const selectGenres = (genreId) => {
  if (with_genres.value.includes(genreId)) {
    // Remove the genre from the selected genres if it is already selected
    with_genres.value = with_genres.value.filter((genre) => genre !== genreId)
  } else {
    // Add the genre to the selected genres if it is not already selected
    with_genres.value.push(genreId)
  }
}
</script>
