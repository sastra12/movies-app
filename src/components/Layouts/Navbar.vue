<template>
  <nav class="w-full bg-primary">
    <div
      class="py-3 px-6 min-[800px]:px-0 min-[800px]:w-4/5 min-[800px]:mx-auto min-[800px]:flex min-[800px]:items-center min-[800px]:justify-between container mx-auto flex justify-between"
    >
      <router-link to="/">
        <h1 class="text-secondary text-xl min-[800px]:text-2xl font-bold">
          Movie<span class="text-secondary2">App</span>
        </h1>
      </router-link>

      <!-- Hamburger Menu -->
      <span class="min-[800px]:hidden top-3.5 text-2xl cursor-pointer" @click="changeMenu">
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512" v-if="openMenu">
          <!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
          <path
            fill="white"
            d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
          />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" v-else>
          <!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
          <path
            fill="white"
            d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"
          />
        </svg>
      </span>
      <!-- Navigation Menu -->
      <ul
        class="absolute duration-700 ease-in px-6 min-[800px]:px-0 bg-white w-full z-50 left-0 min-[800px]:static min-[800px]:flex min-[800px]:w-auto min-[800px]:bg-primary min-[800px]:duration-0"
        :class="[openMenu ? 'top-[52px]' : '-top-60']"
      >
        <input
          @keyup.enter="searchValue"
          v-model="search"
          placeholder="Search..."
          type="text"
          class="text-slate-400 mt-3 min-[800px]:mt-0 border-2 max-[799px]:w-7/12 border-secondary rounded-sm py-1.5 min-[800px]:py-0 px-2 focus:outline-none focus:ring focus:ring-teal-500 bg-white"
        />
        <button @click="searchValue" class="bg-secondary px-2 py-1.5 rounded-sm ml-2 text-white">
          Search
        </button>

        <li
          class="py-3 text-base min-[800px]:my-auto hover:text-secondary min-[800px]:py-0 min-[800px]:ml-4 min-[800px]:text-lg min-[800px]:text-white"
          v-for="nav in links"
          :key="nav"
        >
          <router-link :to="nav.link" :class="[activeLink == nav.link ? 'text-secondary' : '']">{{
            nav.name
          }}</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const openMenu = ref(false)
const router = useRouter()
const search = ref('')
const links = ref([
  { link: '/movies', name: 'Movies' },
  { link: '#', name: 'Tv Show' },
  { link: '#', name: 'People' }
])

const changeMenu = () => {
  openMenu.value = !openMenu.value
}

const activeLink = computed(() => {
  return route.fullPath
})

const searchValue = () => {
  router.push({
    name: 'SearchResult',
    query: { query: search.value, page: 1 }
  })
}
</script>
