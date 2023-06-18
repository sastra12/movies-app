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
      class="p-2 mt-2 grid grid-cols-2 min-[455px]:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4"
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
import Button from '@/components/Reusable/Button.vue'
import { inject } from 'vue'

export default {
  components: {
    FreeToWatchItem,
    Button,
    DefaultContainer
  },
  setup() {
    const axiosInstance = inject('$axios')

    const freeToWatch = ref([])
    const defaultType = ref('movie')

    const switchDefaultTime = () => {
      if (defaultType.value == 'movie') {
        defaultType.value = 'tv'
      } else if (defaultType.value == 'tv') {
        defaultType.value = 'movie'
      }
    }

    const getFreeToWatch = async () => {
      try {
        const response = await axiosInstance.get(
          `discover/${defaultType.value}?sort_by=popularity.desc&watch_region=US&page=1&with_watch_monetization_types=free`
        )
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
      defaultType,
      switchDefaultTime,
      freeToWatch
    }
  }
}
</script>
