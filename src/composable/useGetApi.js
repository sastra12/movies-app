import { reactive, inject, computed, ref } from 'vue'

export function useGetApi(initialUrl) {
  const axiosInstance = inject('$axios')
  const url = ref(initialUrl)

  const data = reactive({
    loading: true,
    response: [],
    totalPages: null,
    // cast for data by id
    casts: [],
    crew: []
  })

  // get data
  const fetchData = async () => {
    data.loading = true

    const response = await axiosInstance.get(url.value)
    try {
      setTimeout(() => {
        data.response = response.data.results
        data.totalPages = response.data.total_pages
        data.loading = false
      }, 1000)
    } catch (error) {
      console.log(error)
    }
  }

  // get data by id
  const fetchDataById = async () => {
    data.loading = true
    const response = await axiosInstance.get(url.value)
    try {
      data.response = response.data
      data.casts = response.data.credits.cast
      data.crew = response.data.credits.crew
      data.loading = false
    } catch (error) {
      console.log(error)
    }
  }

  const finalTotalPages = computed(() => {
    if (data.totalPages <= 500) {
      return data.totalPages
    } else if (data.totalPages > 500) {
      return 500
    }
  })

  return {
    data,
    fetchData,
    fetchDataById,
    url,
    totalPages: finalTotalPages
  }
}
