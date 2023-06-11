import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/pages/Home.vue'
// Lazy loading
const Movies = () => import('@/pages/MoviesPage.vue')

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/movies',
    component: Movies
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
