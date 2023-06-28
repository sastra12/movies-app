import { reactive } from 'vue'
import { inject } from 'vue'

export function useGetApi(url) {
  const axiosInstance = inject('$axios')

  const data = reactive({
    loading: true,
    error: null,
    response: []
  })

  const fetchData = async () => {
    data.loading = true

    const response = await axiosInstance.get(url)
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
    fetchData
  }
}
