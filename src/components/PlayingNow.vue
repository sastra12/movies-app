<template>
  <default-container>
    <h1 class="text-lg sm:text-xl font-bold text-secondary2 font-poppins">Now Playing</h1>
    <div
      v-if="data.loading"
      class="grid grid-cols-1 min-[455px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 pt-2 sm:pt-3"
    >
      <skeleton-loading v-for="n in 4" :key="n" />
    </div>
    <Swiper
      v-else
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
      <Swiper-Slide v-for="item in splicedResponse" :key="item" class="pt-2 sm:pt-3">
        <NowPlayingItem :item="item" />
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
import { onMounted, ref, computed } from 'vue'

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
    const splicedResponse = computed(() => data.response.slice(0, 12))

    onMounted(async () => {
      await fetchData()
      await movieStore.getmovieGenres(axiosInstance)
    })

    return { modules: [Pagination, FreeMode, Autoplay], data, splicedResponse }
  }
}
</script>
