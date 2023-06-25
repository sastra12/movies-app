<template>
  <default-container>
    <div class="sm:flex sm:gap-x-2">
      <h1 class="text-lg sm:text-xl font-bold text-secondary2 font-poppins">Movies</h1>
    </div>

    <div class="flex flex-col sm:flex-row sm:gap-x-2 sm:mt-2">
      <div class="sm:w-2/5 md:w-2/6 lg:w-1/4">
        <accordion header="Sort">
          <div class="px-2 py-3 rounded-md">
            <span class="text-sm sm:text-base font-semibold">Sort Results By</span>
            <div
              class="py-2 text-sm sm:text-base hover:bg-secondary hover:text-white px-2 cursor-pointer rounded-sm my-2"
              :class="[active.item == item.title || item.value == sort_by ? active.class : '']"
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
            <span class="text-sm sm:text-base font-semibold">Select By Genre</span>
            <div class="mt-2 max-h-32 sm:max-h-56 overflow-y-auto">
              <div
                class="py-1 mb-2 text-sm sm:text-base px-2 cursor-pointer rounded-sm hover:bg-secondary hover:text-white"
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
        class="px-2 grid grid-cols-2 min-[455px]:grid-cols-2 min-[800px]:grid-cols-3 lg:grid-cols-4 gap-2 sm:w-3/5 md:w-4/6 lg:w-3/4"
      >
        <div class="pt-2 sm:pt-3" v-for="item in movies" :key="item.id">
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
import DiscoverMovies from '@/components/Movies/DiscoverMovies.vue'
import { useMoviesStore } from '../stores/movies'
import { inject } from 'vue'
import { ref, onMounted, reactive, watch, computed } from 'vue'
import Button from '@/components/Reusable/Button.vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import { usePreviousAndNextPage } from '@/composable/usePreviousAndNextPage.js'

const movieStore = useMoviesStore()
const axiosInstance = inject('$axios')
const movies = ref([])
const sort_by = ref('popularity.desc')
const with_genres = ref([])
const route = useRoute()
const totalPages = ref(500)
const pageNumber = ref(Number.parseInt(route.query.page) || 1)
const routeName = 'Movies'

const active = reactive({
  class: 'bg-secondary text-white',
  item: '',
  id: ''
})

const { previousPage, nextPage, lastPage, firstPage } = usePreviousAndNextPage(
  pageNumber,
  totalPages,
  undefined,
  routeName
)

onMounted(async () => {
  getDataMovies()
  await movieStore.getmovieGenres(axiosInstance)
})

onBeforeRouteUpdate((to, from, next) => {
  // Remove query parameter from the URL
  const urlWithoutQueryParam = to.path

  // Update the route without the query parameter
  next({ path: urlWithoutQueryParam })
})

const getDataMovies = async () => {
  try {
    const response = await axiosInstance.get(
      `discover/movie?&sort_by=${sort_by.value}&with_genres=${convertWithGenresToString.value}&page=${pageNumber.value}`
    )
    movies.value = response.data.results
  } catch (error) {
    console.log(error)
  }
}

watch(
  [sort_by, with_genres, pageNumber],
  () => {
    getDataMovies()
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
  active.item = item.title
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
</script>
