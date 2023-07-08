<template>
  <default-container>
    <h1 class="text-lg sm:text-xl font-bold text-secondary2 font-poppins">
      Browse Movie By Category
    </h1>
    <div class="flex gap-1 overflow-y-auto pt-2 pb-4">
      <Button
        v-for="item in movieStore.movieGenres"
        :key="item.id"
        :text="item.name"
        :type="item.id == defaultCategory ? 'primary' : 'secondary'"
        rounded="rounded-full"
        @event="selectMovieByCategory(item.id)"
      />
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
      <Swiper-Slide v-for="item in data.response" :key="item" class="pt-2 sm:pt-3">
        <div v-if="data.loading">
          <skeleton-loading />
        </div>
        <category-item v-else :item="item" />
      </Swiper-Slide>
    </Swiper>
  </default-container>
</template>

<script>
import { useMoviesStore } from '@/stores/movies.js'
import { onMounted, ref, watch } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
// import required modules
import { Pagination, FreeMode, Autoplay } from 'swiper'
import CategoryItem from '@/components/Home/CategoryItem.vue'
import DefaultContainer from '@/components/Layouts/DefaultContainer.vue'

import Button from '@/components/Reusable/Button.vue'
import SkeletonLoading from '@/components/Home/SkeletonLoading.vue'
import { useGetApi } from '@/composable/useGetApi'

// Import Swiper styles
import 'swiper/css'

import 'swiper/css/pagination'

export default {
  components: {
    Swiper,
    SwiperSlide,
    Button,
    CategoryItem,
    DefaultContainer,
    SkeletonLoading
  },
  setup() {
    const defaultCategory = ref(28)
    const movieStore = useMoviesStore()
    const { data, fetchData, url } = useGetApi(
      `discover/movie?with_genres=${defaultCategory.value}&page=1`
    )

    const selectMovieByCategory = (id) => {
      defaultCategory.value = id
    }

    onMounted(() => {
      fetchData()
    })

    watch(defaultCategory, () => {
      url.value = `discover/movie?with_genres=${defaultCategory.value}&page=1`
      fetchData()
    })

    return {
      modules: [Pagination, FreeMode, Autoplay],
      movieStore,
      defaultCategory,
      selectMovieByCategory,
      data
    }
  }
}
</script>

<style></style>
