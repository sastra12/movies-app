<template>
  <default-container>
    <div class="flex gap-x-4">
      <h1 class="text-lg sm:text-xl font-bold text-secondary2 font-poppins">Trending</h1>
      <div class="flex gap-x-2">
        <Button
          text="Today"
          rounded="rounded-full"
          :type="defaultTime == 'day' ? 'primary' : 'secondary'"
          @event="switchDefaultTime()"
        />
        <Button
          text="This Week"
          rounded="rounded-full"
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
      <Swiper-Slide v-for="item in data.response" :key="item.id" class="pt-2 sm:pt-3">
        <div v-if="data.loading">
          <skeleton-loading />
        </div>
        <TrendingAllItem :item="item" v-else />
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
import { onMounted, ref, watch, inject, computed } from 'vue'

import TrendingAllItem from './Home/TrendingAllItem.vue'
import DefaultContainer from './Layouts/DefaultContainer.vue'
import Button from '@/components/Reusable/Button.vue'
import SkeletonLoading from '@/components/Home/SkeletonLoading.vue'
import { useGetApi } from '@/composable/useGetApi'

export default {
  components: {
    Swiper,
    SwiperSlide,
    TrendingAllItem,
    DefaultContainer,
    Button,
    SkeletonLoading
  },
  setup() {
    const defaultTime = ref('day')

    const switchDefaultTime = () => {
      if (defaultTime.value == 'day') {
        defaultTime.value = 'week'
      } else if (defaultTime.value == 'week') {
        defaultTime.value = 'day'
      }
    }

    const { data, fetchData, url } = useGetApi(`trending/all/${defaultTime.value}`)

    onMounted(() => {
      fetchData()
    })

    watch(defaultTime, (newValue) => {
      url.value = `trending/all/${newValue}`
      fetchData()
    })

    return {
      modules: [Pagination, FreeMode, Autoplay],
      defaultTime,
      switchDefaultTime,
      data
    }
  }
}
</script>
