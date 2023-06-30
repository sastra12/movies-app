<template>
  <default-container>
    <div class="flex flex-col sm:flex-row sm:gap-x-5 sm:mt-4">
      <div class="sm:w-2/5 lg:w-3/12">
        <img :src="poster_path" class="rounded-md h-72 sm:h-96 w-full bg-cover" alt="" />
      </div>
      <div class="sm:w-3/5 lg:w-9/12 pl-3">
        <h1 class="mt-3 sm:mt-0 font-poppins text-lg font-semibold text-secondary">
          {{ detailTv.original_name }}
        </h1>
        <span class="font-light">{{ getGenreNames }}</span>

        <!-- Overview -->
        <h3 class="font-poppins mt-2 font-semibold text-lg">Overview</h3>
        <p class="font-poppins text-sm text-justify">
          {{ detailTv.overview }}
        </p>

        <!-- Status -->
        <div>
          <div class="mt-5 flex flex-col sm:flex-row sm:gap-x-4 border-b pb-4">
            <p class="font-poppins text-base">
              Status : <span class="font-poppins opacity-80">{{ detailTv.status }}</span>
            </p>
            <p class="font-poppins text-base">
              Release Date :
              <span class="font-poppins opacity-80">{{ detailTv.first_air_date }}</span>
            </p>
            <p class="font-poppins text-base">
              Type : <span class="font-poppins opacity-80">{{ detailTv.type }}</span>
            </p>
          </div>
          <div class="border-b pb-4 my-4">
            <p class="font-poppins text-base">
              Director : <span class="font-poppins opacity-80">Louis Leterrier</span>
            </p>
          </div>
          <div class="border-b pb-4">
            <p class="font-poppins text-base">
              Budget :
              <span class="font-poppins opacity-80">{{ detailTv.budget }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-4 sm:mt-8">
      <h1 class="text-lg font-bold font-poppins">Top Cast</h1>
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
            slidesPerView: 8,
            spaceBetween: 10
          }
        }"
      >
        <Swiper-Slide v-for="item in casts" :key="item" class="pt-2 sm:pt-3">
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
import { computed, inject, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

export default {
  components: {
    DefaultContainer,
    Swiper,
    SwiperSlide,
    CastItem
  },
  setup() {
    const axiosInstance = inject('$axios')
    const route = useRoute()
    const detailTv = ref([])
    const casts = ref([])

    const getDetailMovie = async () => {
      try {
        const response = await axiosInstance(
          `tv/` + route.params.id + `?language=en-US&append_to_response=credits`
        )
        detailTv.value = response.data
        casts.value = response.data.credits.cast
      } catch (error) {
        console.log(error)
      }
    }

    const hidden = computed(() => {
      if (detailTv.tagline == '') {
        return false
      }
      return true
    })

    const getGenreNames = computed(() => {
      const genres = detailTv.value.genres
      if (Array.isArray(genres)) {
        return genres.map((genre) => genre.name).join(',')
      }
    })

    const poster_path = computed(() => {
      if (detailTv.value) {
        if (detailTv.value.poster_path) {
          return 'https://image.tmdb.org/t/p/w500/' + detailTv.value.poster_path
        } else {
          return 'https://via.placeholder.com/300x450'
        }
      } else {
        return 'https://via.placeholder.com/300x450'
      }
    })

    onMounted(async () => {
      getDetailMovie()
    })

    return {
      poster_path,
      getGenreNames,
      casts,
      modules: [Pagination, FreeMode, Autoplay],
      hidden,
      detailTv
    }
  }
}
</script>
