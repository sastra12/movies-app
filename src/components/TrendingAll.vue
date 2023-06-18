<template>
  <default-container>
    <div class="flex gap-x-4">
      <h1 class="text-lg sm:text-xl font-bold text-secondary2 font-poppins">Trending</h1>
      <div class="flex gap-x-2">
        <Button
          text="Today"
          :type="defaultTime == 'day' ? 'primary' : 'secondary'"
          @event="switchDefaultTime()"
        />
        <Button
          text="This Week"
          :type="defaultTime == 'week' ? 'primary' : 'secondary'"
          @event="switchDefaultTime()"
        />
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
        250: {
          slidesPerView: 1,
          spaceBetween: 15
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
      <Swiper-Slide v-for="item in trendingAll" :key="item.id" class="pt-2 sm:pt-3">
        <TrendingAllItem :item="item" />
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
import { computed, onMounted, reactive, ref, watch } from 'vue'

import TrendingAllItem from './Home/TrendingAllItem.vue'
import DefaultContainer from './Layouts/DefaultContainer.vue'
import { inject } from 'vue'
import Button from '@/components/Reusable/Button.vue'

export default {
  components: {
    Swiper,
    SwiperSlide,
    TrendingAllItem,
    DefaultContainer,
    Button
  },
  setup() {
    const axiosInstance = inject('$axios')
    const trendingAll = ref([])
    const defaultTime = ref('day')

    const switchDefaultTime = () => {
      if (defaultTime.value == 'day') {
        defaultTime.value = 'week'
      } else if (defaultTime.value == 'week') {
        defaultTime.value = 'day'
      }
    }

    const getTrendingMovies = async () => {
      try {
        const response = await axiosInstance.get(`trending/all/${defaultTime.value}`)
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
      defaultTime,
      trendingAll,
      switchDefaultTime
    }
  }
}
</script>
