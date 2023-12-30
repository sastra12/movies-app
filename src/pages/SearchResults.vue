<template>
  <default-container>
    <h1 class="text-lg sm:text-xl font-bold font-poppins text-center">
      Search result for <span class="text-secondary2">"{{ searchQuery }}"</span>
    </h1>
    <div
      v-if="data.loading"
      class="grid grid-cols-2 min-[455px]:grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4 pt-2 sm:pt-3"
    >
      <skeleton-loading v-for="n in 20" :key="n" />
    </div>
    <div v-else-if="data.response.length === 0">
      <SearchNotFound />
    </div>
    <div
      v-else
      class="grid grid-cols-2 min-[455px]:grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4"
    >
      <div class="pt-2 sm:pt-3" v-for="item in data.response" :key="item.id">
        <SearchResultItem :item="item" />
      </div>
    </div>
    <div class="px-2 sm:w-3/5 md:w-4/6 lg:w-3/4 mt-6 mx-auto" v-if="data.response.length != 0">
      <div class="flex gap-4 justify-center">
        <Button text="First Page" type="secondary" rounded="rounded-md" @event="firstPage" />
        <Button text="Prev" type="secondary" rounded="rounded-md" @event="previousPage" />
        <span class="text-xs my-auto">{{ pageNumber }}</span>
        <Button text="Next" type="primary" rounded="rounded-md" @event="nextPage" />
        <Button text="Last Page" type="primary" rounded="rounded-md" @event="lastPage" />
      </div>
    </div>
  </default-container>
</template>

<script setup>
import DefaultContainer from '../components/Layouts/DefaultContainer.vue'
import SearchResultItem from '../components/Discover/SearchResultItem.vue'
import { useRoute } from 'vue-router'
import { onMounted, ref, watch } from 'vue'
import { inject } from 'vue'
import SkeletonLoading from '../components/Home/SkeletonLoading.vue'
import { useMoviesStore } from '../stores/movies'
import Button from '@/components/Reusable/Button.vue'
import { usePreviousAndNextPage } from '@/composable/usePreviousAndNextPage.js'
import { useGetApi } from '@/composable/useGetApi'
import SearchNotFound from '@/components/SearchNotFound.vue'

const route = useRoute()
const axiosInstance = inject('$axios')
const searchQuery = ref(route.query.query)
const pageNumber = ref(Number(route.query.page))
const movieStore = useMoviesStore()
const routeName = 'SearchResult'
movieStore.modalStatus = false

// composable
const { data, fetchData, url, totalPages } = useGetApi(
  `search/multi?query=${searchQuery.value}&page=${pageNumber.value}`
)

const { previousPage, nextPage, lastPage, firstPage } = usePreviousAndNextPage(
  pageNumber,
  totalPages,
  searchQuery,
  routeName
)

onMounted(async () => {
  fetchData()
  await movieStore.getmovieGenres(axiosInstance)
  await movieStore.getTvGenres(axiosInstance)
})

watch(pageNumber, () => {
  setTimeout(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }, 1000)
})

// ketika searchQuery dan page berubah
watch([() => route.query.query, () => route.query.page], ([query, page]) => {
  movieStore.modalStatus = false
  searchQuery.value = query
  pageNumber.value = page
  url.value = `search/multi?query=${searchQuery.value}&page=${pageNumber.value}`
  if (searchQuery.value !== undefined && pageNumber.value !== undefined) {
    fetchData()
  }
  return false
})
</script>
