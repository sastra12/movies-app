<template>
  <section class="mt-6 sm:mt-10">
    <div class="px-6 sm:px-0 sm:w-4/5 sm:mx-auto">
      <h1 class="text-lg sm:text-xl font-bold text-secondary2 font-poppins">Now Playing</h1>
      <Swiper
        class="p-4 mt-2"
        :modules="modules"
        :slidesPerView="1"
        :freeMode="true"
        :pagination="{
          type: 'progressbar'
        }"
        :autoplay="{
          delay: 5000,
          disableOnInteraction: false
        }"
        :breakpoints="{
          '@0.00': {
            slidesPerView: 1,
            spaceBetween: 15
          },
          '@0.75': {
            slidesPerView: 2,
            spaceBetween: 14
          },
          '@1.00': {
            slidesPerView: 3,
            spaceBetween: 15
          },
          '@1.50': {
            slidesPerView: 4,
            spaceBetween: 25
          }
        }"
      >
        <Swiper-Slide v-for="item in nowPlaying" :key="item" class="pt-2 sm:pt-3">
          <NowPlayingItem :item="item" />
        </Swiper-Slide>
      </Swiper>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import { Swiper, SwiperSlide } from 'swiper/vue'
// import required modules
import { Pagination, FreeMode, Autoplay } from 'swiper'

// Import Swiper styles
import 'swiper/css'

import 'swiper/css/pagination'
import { onMounted, ref } from 'vue'

import NowPlayingItem from './Home/NowPlayingItem.vue'

import { useMoviesStore } from '../stores/movies'

export default {
  components: {
    Swiper,
    SwiperSlide,
    NowPlayingItem
  },
  setup() {
    const nowPlaying = ref([])
    const api_key = import.meta.env.VITE_APP_API_KEY

    const movieStore = useMoviesStore()

    const getNowPlaying = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}`
        )
        nowPlaying.value = response.data.results.splice(0, 12)
      } catch (error) {
        console.log(error)
      }
    }

    onMounted(async () => {
      getNowPlaying()
      await movieStore.getmovieGenres()
    })

    return { modules: [Pagination, FreeMode, Autoplay], nowPlaying }
  }
}
</script>
