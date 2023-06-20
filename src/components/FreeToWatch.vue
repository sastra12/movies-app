<template>
  <default-container>
    <div class="flex gap-x-4">
      <h1 class="text-lg sm:text-xl font-bold text-secondary2 font-poppins">Free To Watch</h1>
      <div class="flex gap-x-2">
        <Button
          text="Movies"
          :type="defaultType == 'movie' ? 'primary' : 'secondary'"
          @event="switchDefaultTime()"
        />
        <Button
          text="Tv"
          :type="defaultType == 'tv' ? 'primary' : 'secondary'"
          @event="switchDefaultTime()"
        />
      </div>
    </div>

    <!-- Free To Watch -->
    <div
      v-if="loading"
      class="grid grid-cols-2 min-[455px]:grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4 pt-2 sm:pt-3"
    >
      <skeleton-loading v-for="n in 5" :key="n" />
    </div>
    <div
      class="grid grid-cols-2 min-[455px]:grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4"
      v-else
    >
      <div class="pt-2 sm:pt-3" v-for="item in freeToWatch" :key="item.id">
        <FreeToWatchItem :item="item" :type="defaultType" />
      </div>
    </div>
  </default-container>
</template>

<script>
import { ref, onMounted, watch } from 'vue'
import FreeToWatchItem from './Home/FreeToWatchItem.vue'
import DefaultContainer from '@/components/Layouts/DefaultContainer.vue'
import SkeletonLoading from '@/components/Home/SkeletonLoading.vue'
import Button from '@/components/Reusable/Button.vue'
import { inject } from 'vue'
import { useMoviesStore } from '../stores/movies'

export default {
  components: {
    FreeToWatchItem,
    Button,
    DefaultContainer,
    SkeletonLoading
  },
  setup() {
    const axiosInstance = inject('$axios')
    const movieStore = useMoviesStore()
    const freeToWatch = ref([])
    const defaultType = ref('movie')
    const loading = ref(true)

    const switchDefaultTime = () => {
      if (defaultType.value == 'movie') {
        defaultType.value = 'tv'
      } else if (defaultType.value == 'tv') {
        defaultType.value = 'movie'
      }
    }

    const getFreeToWatch = async () => {
      loading.value = true
      const response = await axiosInstance.get(
        `discover/${defaultType.value}?sort_by=popularity.desc&watch_region=US&page=1&with_watch_monetization_types=free`
      )
      try {
        setTimeout(() => {
          freeToWatch.value = response.data.results
          loading.value = false
        }, 1000)
      } catch (error) {
        console.log(error)
      }
    }

    onMounted(async () => {
      getFreeToWatch()
      await movieStore.getmovieGenres(axiosInstance)
      await movieStore.getTvGenres(axiosInstance)
    })

    watch(defaultType, () => {
      getFreeToWatch()
    })

    return {
      defaultType,
      switchDefaultTime,
      freeToWatch,
      loading
    }
  }
}
</script>
