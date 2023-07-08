<template>
  <default-container>
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
        250: {
          slidesPerView: 1,
          spaceBetween: 10
        },
        320: {
          slidesPerView: 2,
          spaceBetween: 10
        },
        500: {
          slidesPerView: 3,
          spaceBetween: 10
        },
        640: {
          slidesPerView: 4,
          spaceBetween: 10
        },
        1024: {
          slidesPerView: 6,
          spaceBetween: 10
        }
      }"
    >
      <Swiper-Slide v-for="item in data.response" :key="item" class="pt-2 sm:pt-3">
        <div v-if="data.loading">
          <skeleton-loading />
        </div>
        <NowPlayingItem v-else :item="item" />
      </Swiper-Slide>
    </Swiper>
  </default-container>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
// import required modules
import { Pagination, FreeMode, Autoplay } from 'swiper'

// Import Swiper styles
import 'swiper/css'

import 'swiper/css/pagination'
import { onMounted } from 'vue'

import NowPlayingItem from './Home/NowPlayingItem.vue'
import DefaultContainer from './Layouts/DefaultContainer.vue'

import { useMoviesStore } from '../stores/movies'
import SkeletonLoading from '@/components/Home/SkeletonLoading.vue'
import { inject } from 'vue'
import { useGetApi } from '@/composable/useGetApi'

export default {
  components: {
    Swiper,
    SwiperSlide,
    NowPlayingItem,
    DefaultContainer,
    SkeletonLoading
  },
  setup() {
    const axiosInstance = inject('$axios')

    const movieStore = useMoviesStore()

    const { data, fetchData } = useGetApi(`movie/now_playing`)

    onMounted(async () => {
      await fetchData()
      await movieStore.getmovieGenres(axiosInstance)
    })

    return { modules: [Pagination, FreeMode, Autoplay], data }
  }
}
</script>
