<template>
  <default-container>
    <h1 class="text-lg sm:text-xl font-bold font-poppins text-center">
      Search result for <span class="text-secondary2">"Spiderman"</span>
    </h1>
    <div
      v-if="loading"
      class="grid grid-cols-2 min-[455px]:grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4 pt-2 sm:pt-3"
    >
      <skeleton-loading v-for="n in 10" :key="n" />
    </div>
    <div
      v-else
      class="grid grid-cols-2 min-[455px]:grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4"
    >
      <div class="pt-2 sm:pt-3" v-for="item in searchResults" :key="item.id">
        <SearchResultItem :item="item" />
      </div>
    </div>
  </default-container>
</template>

<script setup>
import DefaultContainer from '../components/Layouts/DefaultContainer.vue'
import SearchResultItem from '../components/Movies/SearchResultItem.vue'
import { useRoute } from 'vue-router'
import { onMounted, ref, watch } from 'vue'
import { inject } from 'vue'
import SkeletonLoading from '../components/Home/SkeletonLoading.vue'
import { useMoviesStore } from '../stores/movies'

const route = useRoute()
const axiosInstance = inject('$axios')
const searchResults = ref([])
const searchQuery = ref()
const pageNumber = ref(Number(route.query.page))
const totalPages = ref()
const loading = ref(false)
const movieStore = useMoviesStore()

onMounted(async () => {
  getSearchQuery()
  await movieStore.getmovieGenres(axiosInstance)
  await movieStore.getTvGenres(axiosInstance)
})

const getSearchQuery = async () => {
  loading.value = true
  const response = await axiosInstance.get(
    `search/multi?query=${searchQuery.value}&page=${pageNumber.value}`
  )
  try {
    setTimeout(() => {
      searchResults.value = response.data.results
      totalPages.value = response.data.totalPages
      loading.value = false
    }, 1000)
  } catch (error) {
    console.log(error)
  }
}

watch(
  () => route.query.query,
  (newVal) => {
    searchQuery.value = newVal
    getSearchQuery()
  }
)
</script>