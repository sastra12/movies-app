import { reactive, inject, ref } from 'vue'

export function useGetApi(initialUrl) {
  const axiosInstance = inject('$axios')
  const url = ref(initialUrl)

  const data = reactive({
    loading: true,
    error: null,
    response: []
  })

  const fetchData = async () => {
    data.loading = true

    const response = await axiosInstance.get(url.value)
    try {
      setTimeout(() => {
        data.response = response.data.results
        data.loading = false
      }, 1000)
    } catch (error) {
      console.log(error)
    }
  }

  return {
    data,
    fetchData,
    url
  }
}
