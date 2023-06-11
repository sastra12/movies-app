<template>
  <default-container>
    <div class="sm:flex sm:gap-x-2">
      <h1 class="text-lg sm:text-xl font-bold text-secondary2 font-poppins">Movies</h1>
      <div class="mt-2 flex gap-x-2 sm:mt-0 sm:block sm:gap-x-0">
        <button
          class="px-3 min-w-max py-1 text-xs rounded-full bg-gray-100"
          :class="[defaultMovieList.nowPlaying ? defaultMovieList.class : '']"
          @click="nowPlaying()"
        >
          Now Playing
        </button>
        <button
          class="px-3 min-w-max py-1 text-xs rounded-full bg-gray-100"
          :class="[defaultMovieList.popular ? defaultMovieList.class : '']"
          @click="popular()"
        >
          Popular
        </button>
        <button
          class="px-3 min-w-max py-1 text-xs rounded-full bg-gray-100"
          :class="[defaultMovieList.topRated ? defaultMovieList.class : '']"
          @click="topRated()"
        >
          Top Rated
        </button>
        <button
          class="px-3 min-w-max py-1 text-xs rounded-full bg-gray-100"
          :class="[defaultMovieList.upComing ? defaultMovieList.class : '']"
          @click="upComing()"
        >
          Upcoming
        </button>
      </div>
    </div>

    <div class="flex flex-col sm:flex-row sm:mt-4">
      <div class="sm:w-2/5 md:w-2/6 lg:w-1/4">
        <accordion header="Sort">
          <div class="px-2 py-3 rounded-md">
            <span class="text-sm sm:text-base font-semibold">Sort Result By</span>
            <div class="mt-2">
              <div class="py-1 text-sm sm:text-base">Popularity Descending</div>
              <div class="py-1 text-sm sm:text-base">Popularity Ascending</div>
              <div class="py-1 text-sm sm:text-base">Rating Descending</div>
            </div>
          </div>
        </accordion>

        <accordion header="Sort">
          <div class="px-2 py-3 rounded-md">
            <span class="text-sm sm:text-base font-semibold">Sort Result By</span>
            <div class="mt-2">
              <div class="py-1 text-sm sm:text-base">Popularity Descending</div>
              <div class="py-1 text-sm sm:text-base">Popularity Ascending</div>
              <div class="py-1 text-sm sm:text-base">Rating Descending</div>
            </div>
          </div>
        </accordion>
      </div>

      <div
        class="px-2 grid grid-cols-2 min-[455px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:w-3/5 md:w-4/6 lg:w-3/4"
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

import { ref, reactive, onMounted, watch } from 'vue'
import axios from 'axios'

const defaultMovie = ref('now_playing')
const movieStore = useMoviesStore()
const movies = ref([])
const api_key = import.meta.env.VITE_APP_API_KEY
const defaultMovieList = reactive({
  class: 'bg-secondary text-white',
  nowPlaying: true,
  popular: false,
  topRated: false,
  upComing: false
})

onMounted(async () => {
  getDataMovies()
  await movieStore.getmovieGenres()
})

const getDataMovies = async () => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${defaultMovie.value}?api_key=${api_key}`
    )
    movies.value = response.data.results
  } catch (error) {
    console.log(error)
  }
}

watch(defaultMovie, () => {
  getDataMovies()
})

const nowPlaying = () => {
  defaultMovie.value = 'now_playing'
  defaultMovieList.nowPlaying = true
  defaultMovieList.popular = false
  defaultMovieList.topRated = false
  defaultMovieList.upComing = false
}

const popular = () => {
  defaultMovie.value = 'popular'
  defaultMovieList.nowPlaying = false
  defaultMovieList.popular = true
  defaultMovieList.topRated = false
  defaultMovieList.upComing = false
}

const topRated = () => {
  defaultMovie.value = 'top_rated'
  defaultMovieList.nowPlaying = false
  defaultMovieList.popular = false
  defaultMovieList.topRated = true
  defaultMovieList.upComing = false
}

const upComing = () => {
  defaultMovie.value = 'upcoming'
  defaultMovieList.nowPlaying = false
  defaultMovieList.popular = false
  defaultMovieList.topRated = false
  defaultMovieList.upComing = true
}
</script>
