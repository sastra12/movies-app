<template>
  <section class="mt-6 sm:mt-10">
    <div class="px-6 sm:px-0 sm:w-4/5 sm:mx-auto">
      <div class="flex gap-x-4">
        <h1 class="text-lg sm:text-xl font-bold text-secondary2 font-poppins">Free To Watch</h1>
        <div>
          <button
            class="px-3 min-w-max py-1 text-xs rounded-full bg-gray-100 mr-2"
            :class="[defaultFreeToWatch.today ? defaultFreeToWatch.class : '']"
            @click="movies()"
          >
            Movies
          </button>
          <button
            class="px-3 min-w-max py-1 text-xs rounded-full bg-gray-100"
            :class="[defaultFreeToWatch.week ? defaultFreeToWatch.class : '']"
            @click="tv()"
          >
            TV
          </button>
        </div>
      </div>

      <!-- Free To Watch -->
      <div
        class="p-2 mt-2 grid grid-cols-2 min-[455px]:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4"
      >
        <div class="pt-2 sm:pt-3" v-for="item in freeToWatch" :key="item.id">
          <FreeToWatchItem :item="item" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import { ref, reactive, onMounted, watch } from 'vue'
import FreeToWatchItem from './Home/FreeToWatchItem.vue'

export default {
  components: {
    FreeToWatchItem
  },
  setup() {
    const api_key = import.meta.env.VITE_APP_API_KEY
    const freeToWatch = ref([])
    const defaultType = ref('movie')
    const defaultFreeToWatch = reactive({
      class: 'bg-secondary text-white',
      today: true,
      week: false
    })

    const movies = () => {
      defaultType.value = 'movie'
      defaultFreeToWatch.today = true
      defaultFreeToWatch.week = false
    }

    const tv = () => {
      defaultType.value = 'tv'
      defaultFreeToWatch.week = true
      defaultFreeToWatch.today = false
    }

    const getFreeToWatch = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/${defaultType.value}?api_key=${api_key}&sort_by=popularity.desc&watch_region=US&page=1&with_watch_monetization_types=free`
        )
        console.log(response)
        freeToWatch.value = response.data.results
      } catch (error) {
        console.log(error)
      }
    }

    onMounted(() => {
      getFreeToWatch()
    })

    watch(defaultType, () => {
      getFreeToWatch()
    })

    return {
      defaultFreeToWatch,
      movies,
      tv,
      freeToWatch
    }
  }
}
</script>
