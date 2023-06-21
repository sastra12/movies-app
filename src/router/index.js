import { createRouter, createWebHistory } from 'vue-router'

const Home = () => import('@/pages/Home.vue')
// Lazy loading
const Movies = () => import('@/pages/MoviesPage.vue')
const DetailMovie = () => import('@/pages/DetailMovie.vue')
const DetailTv = () => import('@/pages/DetailTv.vue')

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
    path: '/movie/:id',
    component: DetailMovie
  },
  {
    path: '/tv/:id',
    component: DetailTv
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
