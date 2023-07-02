<template>
  <default-container>
    <div class="flex flex-col sm:flex-row sm:gap-x-5 sm:mt-4">
      <div class="sm:w-2/5 lg:w-3/12">
        <img :src="poster_path" class="rounded-md h-72 sm:h-96 w-full bg-cover" alt="" />
      </div>
      <div class="sm:w-3/5 lg:w-9/12 pl-3">
        <h1 class="mt-3 sm:mt-0 font-poppins text-lg font-semibold text-secondary">
          {{ data.response.title }}
        </h1>
        <!-- Tagline -->
        <h4 class="font-poppins text-base text-secondary2 font-semibold italic" v-if="hidden">
          {{ data.response.tagline }}
        </h4>
        <span class="font-light font-poppins text-sm">{{ getGenreNames }}</span>

        <!-- Overview -->
        <h3 class="font-poppins mt-2 font-semibold text-lg">Overview</h3>
        <p class="font-poppins text-sm text-justify">
          {{ data.response.overview }}
        </p>

        <!-- Status -->
        <div>
          <div class="mt-5 flex flex-col lg:flex-row lg:gap-x-4 border-b pb-4">
            <p class="font-poppins text-base">
              Status : <span class="font-poppins opacity-80">{{ data.response.status }}</span>
            </p>
            <p class="font-poppins text-base">
              Release Date :
              <span class="font-poppins opacity-80">{{ data.response.release_date }}</span>
            </p>
            <p class="font-poppins text-base">
              Runtime : <span class="font-poppins opacity-80">{{ convertRuntime }}</span>
            </p>
          </div>
          <div class="border-b pb-4 my-4">
            <p class="font-poppins text-base">
              Director : <span class="font-poppins opacity-80">{{ getDirector }}</span>
            </p>
          </div>
          <div class="border-b pb-4">
            <p class="font-poppins text-base">
              Budget :
              <span class="font-poppins opacity-80">{{ data.response.budget }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-4 sm:mt-8">
      <h1 class="text-lg font-bold font-poppins">Top Cast</h1>
      <Swiper
        class="p-4 mt-2 sm:mt-6"
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
            slidesPerView: 8,
            spaceBetween: 10
          }
        }"
      >
        <Swiper-Slide v-for="item in data.casts" :key="item" class="pt-2 sm:pt-3">
          <cast-item :item="item" />
        </Swiper-Slide>
      </Swiper>
    </div>
  </default-container>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
// import required modules
import { Pagination, FreeMode, Autoplay } from 'swiper'
import DefaultContainer from '@/components/Layouts/DefaultContainer.vue'
import CastItem from '@/components/Discover/CastItem.vue'
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useGetApi } from '@/composable/useGetApi'

export default {
  components: {
    DefaultContainer,
    Swiper,
    SwiperSlide,
    CastItem
  },
  setup() {
    const route = useRoute()
    const { data, fetchDataById } = useGetApi(
      `movie/` + route.params.id + `?language=en-US&append_to_response=credits`
    )

    const hidden = computed(() => {
      if (data.response.tagline == '') {
        return false
      }
      return true
    })

    const convertRuntime = computed(() => {
      const hours = Math.floor(data.response.runtime / 60)
      const minutes = data.response.runtime % 60
      return `${hours}h ${minutes}m`
    })

    const getGenreNames = computed(() => {
      const genres = data.response.genres
      if (Array.isArray(genres)) {
        return genres.map((genre) => genre.name).join(', ')
      }
    })

    const getDirector = computed(() => {
      const director = data.crew.filter(function (item) {
        return item.job === 'Director'
      })

      const name = director.map(function (item) {
        return item.name
      })

      return name[0]
    })

    const poster_path = computed(() => {
      if (data.response) {
        if (data.response.poster_path) {
          return 'https://image.tmdb.org/t/p/w500/' + data.response.poster_path
        } else {
          return 'https://via.placeholder.com/300x450'
        }
      } else {
        return 'https://via.placeholder.com/300x450'
      }
    })

    onMounted(() => {
      fetchDataById()
    })

    return {
      poster_path,
      getGenreNames,
      convertRuntime,
      modules: [Pagination, FreeMode, Autoplay],
      hidden,
      getDirector,
      data
    }
  }
}
</script>
