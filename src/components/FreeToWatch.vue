<template>
  <section class="mt-6 sm:mt-10">
    <div class="px-6 sm:px-0 sm:w-4/5 sm:mx-auto">
      <div class="flex gap-x-4">
        <h1 class="text-lg sm:text-xl font-bold text-secondary2 font-poppins">Free To Watch</h1>
        <div>
          <button
            class="px-3 min-w-max py-1 text-xs rounded-full bg-gray-100 mr-2"
            :class="[defaultFreeToWatch.today ? defaultFreeToWatch.class : '']"
            @click="movies()"
          >
            Movies
          </button>
          <button
            class="px-3 min-w-max py-1 text-xs rounded-full bg-gray-100"
            :class="[defaultFreeToWatch.week ? defaultFreeToWatch.class : '']"
            @click="tv()"
          >
            TV
          </button>
        </div>
      </div>

      <!-- Free To Watch -->
      <div class="p-2 mt-2 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
        <div class="pt-2 sm:pt-3" v-for="item in freeToWatch" :key="item.id">
          <FreeToWatchItem :item="item" />
        </div>
      </div>
      <!-- <Swiper
        class="p-4 mt-2 sm:mt-8"
        :modules="modules"
        :slidesPerView="1"
        :freeMode="true"
        :pagination="{
          type: 'progressbar'
        }"
        :breakpoints="{
          '@0.00': {
            slidesPerView: 2,
            spaceBetween: 10
          },
          '@0.75': {
            slidesPerView: 3,
            spaceBetween: 10
          },
          '@1.00': {
            slidesPerView: 5,
            spaceBetween: 10
          },
          '@1.50': {
            slidesPerView: 6,
            spaceBetween: 10
          }
        }"
      >
        <Swiper-Slide v-for="item in freeToWatch" :key="item.id" class="pt-2 sm:pt-3">
          <FreeToWatchItem :item="item" />
        </Swiper-Slide>
      </Swiper> -->
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
import { onMounted, reactive, ref, watch } from 'vue'

import FreeToWatchItem from './Home/FreeToWatchItem.vue'

export default {
  components: {
    Swiper,
    SwiperSlide,
    FreeToWatchItem
  },
  setup() {
    const api_key = import.meta.env.VITE_APP_API_KEY
    const freeToWatch = ref([])
    const defaultType = ref('movie')
    const defaultFreeToWatch = reactive({
      class: 'bg-secondary text-white',
      today: true,
      week: false
    })

    const movies = () => {
      defaultType.value = 'movie'
      defaultFreeToWatch.today = true
      defaultFreeToWatch.week = false
    }

    const tv = () => {
      defaultType.value = 'tv'
      defaultFreeToWatch.week = true
      defaultFreeToWatch.today = false
    }

    const getFreeToWatch = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/${defaultType.value}?api_key=${api_key}&sort_by=popularity.desc&watch_region=US&page=1&with_watch_monetization_types=free`
        )
        console.log(response)
        freeToWatch.value = response.data.results
      } catch (error) {
        console.log(error)
      }
    }

    onMounted(() => {
      getFreeToWatch()
    })

    watch(defaultType, () => {
      getFreeToWatch()
    })

    return {
      modules: [Pagination, FreeMode, Autoplay],
      defaultFreeToWatch,
      movies,
      tv,
      freeToWatch
    }
  }
}
</script>
