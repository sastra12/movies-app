<template>
  <section class="mt-6">
    <div class="px-6 sm:px-0 sm:w-4/5 sm:mx-auto">
      <h1 class="text-lg font-bold text-secondary2 font-poppins">Now Playing</h1>
      <Swiper
        class="p-4 mt-2"
        :modules="modules"
        :autoplay="{
          delay: 5000,
          disableOnInteraction: false
        }"
        :slidesPerView="1"
        :freeMode="true"
        :pagination="{
          clickable: true
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
            spaceBetween: 15
          }
        }"
      >
        <Swiper-Slide v-for="item in nowPlaying" :key="item" class="pb-9">
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
export default {
  components: {
    Swiper,
    SwiperSlide,
    NowPlayingItem
  },
  setup() {
    const nowPlaying = ref([])
    const api_key = import.meta.env.VITE_APP_API_KEY

    const getNowPlaying = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}`
        )
        nowPlaying.value = response.data.results.splice(0, 13)
      } catch (error) {
        console.log(error)
      }
    }

    onMounted(() => {
      getNowPlaying()
    })

    return { modules: [Pagination, FreeMode, Autoplay], nowPlaying }
  }
}
</script>
