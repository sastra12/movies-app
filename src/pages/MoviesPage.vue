<template>
  <default-container>
    <div class="sm:flex sm:gap-x-2">
      <h1 class="text-lg sm:text-xl font-bold text-secondary2 font-poppins">Movies</h1>
    </div>

    <div class="flex flex-col sm:flex-row sm:gap-x-2 sm:mt-2">
      <div class="sm:w-2/5 md:w-2/6 lg:w-1/4">
        <accordion header="Sort">
          <div class="px-2 py-3 rounded-md">
            <span class="text-sm sm:text-base font-semibold font-poppins">Sort Results By</span>
            <div
              class="py-2 text-sm sm:text-base hover:bg-secondary hover:text-white px-2 cursor-pointer rounded-sm my-2 font-poppins"
              :class="[item.value == sort_by ? 'bg-secondary text-white' : '']"
              v-for="item in movieStore.sort_by"
              :key="item"
              @click="addSortBy(item)"
            >
              {{ item.title }}
            </div>
          </div>
        </accordion>

        <accordion header="Filters">
          <div class="px-2 py-3 rounded-md">
            <span class="text-sm sm:text-base font-semibold font-poppins">Select By Genre</span>
            <div class="mt-2 max-h-32 sm:max-h-56 overflow-y-auto">
              <div
                class="py-1 mb-2 text-sm sm:text-base px-2 cursor-pointer rounded-sm hover:bg-secondary hover:text-white font-poppins"
                :class="[activeGenres.includes(item.id) ? 'bg-secondary text-white' : '']"
                v-for="item in movieStore.movieGenres"
                :key="item.id"
                @click="selectGenres(item.id)"
              >
                {{ item.name }}
              </div>
            </div>
          </div>
        </accordion>
      </div>

      <div
        v-if="data.loading"
        class="px-2 grid grid-cols-2 min-[455px]:grid-cols-2 min-[800px]:grid-cols-3 lg:grid-cols-4 gap-2 sm:w-3/5 md:w-4/6 lg:w-3/4"
      >
        <div class="pt-2 sm:pt-3" v-for="n in 20" :key="n">
          <SkeletonLoading />
        </div>
      </div>
      <div
        v-else
        class="px-2 grid grid-cols-2 min-[455px]:grid-cols-2 min-[800px]:grid-cols-3 lg:grid-cols-4 gap-2 sm:w-3/5 md:w-4/6 lg:w-3/4"
      >
        <div class="pt-2 sm:pt-3" v-for="item in data.response" :key="item.id">
          <DiscoverMovies :item="item" />
        </div>
      </div>
    </div>
    <div class="px-2 sm:w-3/5 md:w-4/6 lg:w-3/4 mt-6 ml-auto">
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
import Accordion from '@/components/Reusable/Accordion.vue'
import DiscoverMovies from '@/components/Discover/DiscoverMovies.vue'
import { useMoviesStore } from '../stores/movies'
import { inject } from 'vue'
import { ref, onMounted, watch, computed } from 'vue'
import Button from '@/components/Reusable/Button.vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import { usePreviousAndNextPage } from '@/composable/usePreviousAndNextPage.js'
import SkeletonLoading from '../components/Home/SkeletonLoading.vue'

const movieStore = useMoviesStore()
const axiosInstance = inject('$axios')
const sort_by = ref('popularity.desc')
const with_genres = ref([])
const route = useRoute()
const pageNumber = ref(Number.parseInt(route.query.page) || 1)
const routeName = 'Movies'
import { useGetApi } from '@/composable/useGetApi'

onMounted(async () => {
  fetchData()
  await movieStore.getmovieGenres(axiosInstance)
})

onBeforeRouteUpdate((to, from, next) => {
  // Remove query parameter from the URL
  const urlWithoutQueryParam = to.path

  // Update the route without the query parameter
  next({ path: urlWithoutQueryParam })
})

watch(
  [sort_by, with_genres, pageNumber],
  () => {
    url.value = `discover/movie?&sort_by=${sort_by.value}&with_genres=${convertWithGenresToString.value}&page=${pageNumber.value}`
    fetchData()
  },
  { deep: true }
)

watch(pageNumber, () => {
  setTimeout(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }, 1000)
})

const addSortBy = (item) => {
  sort_by.value = item.value
}

const activeGenres = computed(() => {
  return with_genres.value.map(function (item) {
    return item
  })
})

const convertWithGenresToString = computed(() => {
  return with_genres.value.map(String).join(',')
})

const selectGenres = (genreId) => {
  if (with_genres.value.includes(genreId)) {
    // Remove the genre from the selected genres if it is already selected
    with_genres.value = with_genres.value.filter((genre) => genre !== genreId)
    pageNumber.value = 1
  } else {
    // Add the genre to the selected genres if it is not already selected
    with_genres.value.push(genreId)
    pageNumber.value = 1
  }
}

// composable
const { data, fetchData, url, totalPages } = useGetApi(
  `discover/movie?&sort_by=${sort_by.value}&with_genres=${convertWithGenresToString.value}&page=${pageNumber.value}`
)

const { previousPage, nextPage, lastPage, firstPage } = usePreviousAndNextPage(
  pageNumber,
  totalPages,
  undefined,
  routeName
)
</script>
