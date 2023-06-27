import { createRouter, createWebHistory } from 'vue-router'

const Home = () => import('@/pages/Home.vue')
// Lazy loading
const Movies = () => import('@/pages/MoviesPage.vue')
const Tv = () => import('@/pages/TvPage.vue')
const DetailMovie = () => import('@/pages/DetailMovie.vue')
const DetailTv = () => import('@/pages/DetailTv.vue')
const SearchResults = () => import('@/pages/SearchResults.vue')

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/movies',
    name: 'Movies',
    component: Movies
  },
  {
    path: '/tv',
    name: 'Tv',
    component: Tv
  },
  {
    path: '/movie/:id',
    name: 'movieDetail',
    component: DetailMovie
  },
  {
    path: '/tv/:id',
    name: 'tvDetail',
    component: DetailTv
  },
  {
    path: '/search/results',
    name: 'SearchResult',
    component: SearchResults
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
