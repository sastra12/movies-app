<template>
  <default-container>
    <h1 class="text-lg sm:text-xl font-bold font-poppins text-center">
      Search result for <span class="text-secondary2">"{{ searchQuery }}"</span>
    </h1>
    <div
      v-if="loading"
      class="grid grid-cols-2 min-[455px]:grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4 pt-2 sm:pt-3"
    >
      <skeleton-loading v-for="n in 15" :key="n" />
    </div>
    <div
      v-else
      class="grid grid-cols-2 min-[455px]:grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4"
    >
      <div class="pt-2 sm:pt-3" v-for="item in searchResults" :key="item.id">
        <SearchResultItem :item="item" />
      </div>
    </div>
    <div class="px-2 sm:w-3/5 md:w-4/6 lg:w-3/4 mt-6 mx-auto">
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
import SearchResultItem from '../components/Movies/SearchResultItem.vue'
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref, toRef, watch } from 'vue'
import { inject } from 'vue'
import SkeletonLoading from '../components/Home/SkeletonLoading.vue'
import { useMoviesStore } from '../stores/movies'
import Button from '@/components/Reusable/Button.vue'
import { usePreviousAndNextPage } from '@/composable/usePreviousAndNextPage.js'

const route = useRoute()
const axiosInstance = inject('$axios')
const searchResults = ref([])
const searchQuery = ref(route.query.query)
const search = toRef(searchQuery.value)
const pageNumber = ref(Number(route.query.page))
const page = toRef(pageNumber)
const totalPages = ref()
const loading = ref(false)
const movieStore = useMoviesStore()
const routeName = 'SearchResult'

const { previousPage, nextPage, lastPage, firstPage } = usePreviousAndNextPage(
  pageNumber,
  totalPages,
  searchQuery,
  routeName
)

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
      totalPages.value = response.data.total_pages
      loading.value = false
    }, 1000)
  } catch (error) {
    console.log(error)
  }
}

watch(pageNumber, () => {
  setTimeout(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }, 1000)
})

watch([search, page], () => {
  getSearchQuery()
})
</script>
