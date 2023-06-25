import { useRouter } from 'vue-router'
import { computed } from 'vue'

export function usePreviousAndNextPage(pageNumber, totalPages, searchQuery = undefined, routeName) {
  const router = useRouter()
  const queryParams = computed(() => {
    let query
    if (searchQuery) {
      query = { query: searchQuery.value, page: pageNumber.value }
    } else {
      query = { page: pageNumber.value }
    }
    return query
  })

  const previousPage = () => {
    if (pageNumber.value > 1) {
      pageNumber.value--
      router.push({ name: routeName, query: queryParams.value })
    }
  }

  const nextPage = () => {
    if (pageNumber.value < totalPages.value) {
      pageNumber.value++
      router.push({ name: routeName, query: queryParams.value })
    }
  }

  const lastPage = () => {
    pageNumber.value = totalPages.value
    router.push({ name: routeName, query: queryParams.value })
  }

  const firstPage = () => {
    if (pageNumber.value > 1) {
      pageNumber.value = 1
      router.push({ name: routeName, query: queryParams.value })
    }
  }

  return { firstPage, lastPage, nextPage, previousPage }
}
