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
        :type="item.id == defaultCategory.id ? 'primary' : 'secondary'"
        rounded="rounded-full"
        @event="getMovieByCategory(item.id)"
      />
    </div>
    <div
      v-if="loading"
      class="grid grid-cols-2 min-[455px]:grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4 pt-2 sm:pt-3"
    >
      <skeleton-loading v-for="n in 6" :key="n" />
    </div>
    <Swiper
      v-else
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
      <Swiper-Slide v-for="item in movieByCategory" :key="item" class="pt-2 sm:pt-3">
        <category-item :item="item" />
      </Swiper-Slide>
    </Swiper>
  </default-container>
</template>

<script>
import { useMoviesStore } from '@/stores/movies.js'
import { onMounted, reactive, ref, watch } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
// import required modules
import { Pagination, FreeMode, Autoplay } from 'swiper'
import CategoryItem from '@/components/Home/CategoryItem.vue'
import DefaultContainer from '@/components/Layouts/DefaultContainer.vue'
import { inject } from 'vue'
import Button from '@/components/Reusable/Button.vue'
import SkeletonLoading from '@/components/Home/SkeletonLoading.vue'

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
    const axiosInstance = inject('$axios')
    const defaultCategory = reactive({
      id: null
    })
    const movieByCategory = ref([])
    const loading = ref(true)

    const movieStore = useMoviesStore()

    const getMovieByCategory = async (id) => {
      defaultCategory.id = id == null ? 28 : id
      const response = await axiosInstance.get(
        `discover/movie?with_genres=${defaultCategory.id}&page=1`
      )
      loading.value = true
      try {
        setTimeout(() => {
          movieByCategory.value = response.data.results
          loading.value = false
        }, 1000)
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
      getMovieByCategory,
      loading
    }
  }
}
</script>

<style></style>
