import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/pages/Home.vue'
// Lazy loading
const Movies = () => import('@/pages/MoviesPage.vue')
const DetailMovie = () => import('@/pages/DetailMovie.vue')

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/movies',
    component: Movies
  },
  {
    path: '/movie/:id',
    component: DetailMovie
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
