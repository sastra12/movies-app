<template>
  <section class="mt-6 sm:mt-10">
    <div class="px-6 sm:px-0 sm:w-4/5 sm:mx-auto">
      <div class="flex gap-x-4">
        <h1 class="text-lg sm:text-xl font-bold text-secondary2 font-poppins">Trending</h1>
        <div>
          <button
            class="px-3 min-w-max py-1 text-xs rounded-full bg-gray-100 mr-2"
            :class="[defaultTrending.today ? defaultTrending.class : '']"
            @click="today()"
          >
            Today
          </button>
          <button
            class="px-3 min-w-max py-1 text-xs rounded-full bg-gray-100"
            :class="[defaultTrending.week ? defaultTrending.class : '']"
            @click="week()"
          >
            This Week
          </button>
        </div>
      </div>
      <Swiper
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
        <Swiper-Slide v-for="item in trendingAll" :key="item.id" class="pt-2 sm:pt-3">
          <TrendingAllItem :item="item" />
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
import { onMounted, reactive, ref, watch } from 'vue'

import TrendingAllItem from './Home/TrendingAllItem.vue'

export default {
  components: {
    Swiper,
    SwiperSlide,
    TrendingAllItem
  },
  setup() {
    const api_key = import.meta.env.VITE_APP_API_KEY
    const trendingAll = ref([])
    const defaultTime = ref('day')
    const defaultTrending = reactive({
      class: 'bg-secondary text-white',
      today: true,
      week: false
    })

    const today = () => {
      defaultTime.value = 'day'
      defaultTrending.today = true
      defaultTrending.week = false
    }

    const week = () => {
      defaultTime.value = 'week'
      defaultTrending.week = true
      defaultTrending.today = false
    }

    const getTrendingMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/trending/all/${defaultTime.value}?api_key=${api_key}`
        )
        trendingAll.value = response.data.results
      } catch (error) {
        console.log(error)
      }
    }

    onMounted(() => {
      getTrendingMovies()
    })

    watch(defaultTime, () => {
      getTrendingMovies()
    })

    return {
      modules: [Pagination, FreeMode, Autoplay],
      defaultTrending,
      week,
      today,
      trendingAll
    }
  }
}
</script>
