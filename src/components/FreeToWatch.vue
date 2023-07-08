<template>
  <default-container>
    <div class="flex gap-x-4">
      <h1 class="text-lg sm:text-xl font-bold text-secondary2 font-poppins">Free To Watch</h1>
      <div class="flex gap-x-2">
        <Button
          text="Movies"
          rounded="rounded-full"
          :type="defaultType == 'movie' ? 'primary' : 'secondary'"
          @event="switchDefaultTime()"
        />
        <Button
          text="Tv"
          rounded="rounded-full"
          :type="defaultType == 'tv' ? 'primary' : 'secondary'"
          @event="switchDefaultTime()"
        />
      </div>
    </div>

    <!-- Free To Watch -->
    <div class="grid grid-cols-2 min-[455px]:grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4">
      <div class="pt-2 sm:pt-3" v-for="item in data.response" :key="item.id">
        <div v-if="data.loading">
          <skeleton-loading />
        </div>
        <FreeToWatchItem :item="item" :type="defaultType" v-else />
      </div>
    </div>
  </default-container>
</template>

<script>
import { ref, onMounted, watch, inject } from 'vue'
import FreeToWatchItem from './Home/FreeToWatchItem.vue'
import DefaultContainer from '@/components/Layouts/DefaultContainer.vue'
import SkeletonLoading from '@/components/Home/SkeletonLoading.vue'
import Button from '@/components/Reusable/Button.vue'
import { useMoviesStore } from '../stores/movies'
import { useGetApi } from '@/composable/useGetApi'

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
    const defaultType = ref('movie')

    const switchDefaultTime = () => {
      if (defaultType.value == 'movie') {
        defaultType.value = 'tv'
      } else if (defaultType.value == 'tv') {
        defaultType.value = 'movie'
      }
    }

    const { data, fetchData, url } = useGetApi(
      `discover/${defaultType.value}?sort_by=popularity.desc&watch_region=US&page=1&with_watch_monetization_types=free`
    )

    onMounted(async () => {
      fetchData()
      await movieStore.getmovieGenres(axiosInstance)
      await movieStore.getTvGenres(axiosInstance)
    })

    watch(defaultType, () => {
      url.value = `discover/${defaultType.value}?sort_by=popularity.desc&watch_region=US&page=1&with_watch_monetization_types=free`
      fetchData()
    })

    return {
      defaultType,
      switchDefaultTime,
      data
    }
  }
}
</script>
