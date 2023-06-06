<template>
  <section class="mt-6 sm:mt-10">
    <div class="px-6 sm:px-0 sm:w-4/5 sm:mx-auto">
      <h1 class="text-lg sm:text-xl font-bold text-secondary2 font-poppins">
        Browse Movie By Category
      </h1>
      <div class="flex gap-3 overflow-y-auto pt-2 pb-4">
        <button
          v-for="item in movieStore.movieGenres"
          :key="item.id"
          class="px-4 min-w-max py-2 text-xs rounded-full bg-gray-100"
          :class="[item.id == defaultCategory.id ? defaultCategory.class : '']"
          type="button"
          @click="getMovieByCategory(item.id)"
        >
          {{ item.name }}
        </button>
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
        <Swiper-Slide v-for="item in movieByCategory" :key="item" class="pt-2 sm:pt-3">
          <category-item :item="item" />
        </Swiper-Slide>
      </Swiper>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import { useMoviesStore } from '@/stores/movies.js'
import { onMounted, reactive, ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
// import required modules
import { Pagination, FreeMode, Autoplay } from 'swiper'
import CategoryItem from '@/components/Home/CategoryItem.vue'

// Import Swiper styles
import 'swiper/css'

import 'swiper/css/pagination'

export default {
  components: {
    Swiper,
    SwiperSlide,
    CategoryItem
  },
  setup() {
    const api_key = import.meta.env.VITE_APP_API_KEY
    const defaultCategory = reactive({
      class: 'bg-secondary text-white',
      id: null
    })
    const movieByCategory = ref([])

    const movieStore = useMoviesStore()

    const getMovieByCategory = async (id) => {
      defaultCategory.id = id == null ? 28 : id
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&with_genres=${defaultCategory.id}&page=1`
        )
        movieByCategory.value = response.data.results
      } catch (error) {
        console.log(error)
      }
    }

    const poster_path = (path) => {
      return 'https://image.tmdb.org/t/p/w500/' + path
    }

    onMounted(() => {
      getMovieByCategory()
    })

    return {
      poster_path,
      modules: [Pagination, FreeMode, Autoplay],
      movieStore,
      movieByCategory,
      defaultCategory,
      getMovieByCategory
    }
  }
}
</script>

<style></style>
