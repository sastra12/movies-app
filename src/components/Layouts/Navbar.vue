<template>
  <section>
    <nav class="w-full bg-primary">
      <div class="py-3 px-6 sm:px-0 sm:w-4/5 sm:mx-auto sm:flex sm:items-center sm:justify-between">
        <router-link to="/">
          <h1 class="text-secondary text-xl sm:text-2xl font-bold">
            Movie<span class="text-secondary2">App</span>
          </h1>
        </router-link>

        <!-- Hamburger Menu -->
        <span
          class="absolute sm:hidden top-3.5 right-6 text-2xl cursor-pointer"
          @click="changeMenu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 384 512"
            v-if="openMenu"
          >
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
          class="absolute duration-700 ease-in bg-white w-full z-50 left-0 sm:static sm:flex sm:w-auto sm:bg-primary sm:duration-0"
          :class="[openMenu ? 'top-[52px]' : '-top-40']"
        >
          <li
            class="py-3 text-base text-center hover:text-secondary sm:py-0 sm:ml-4 sm:text-lg sm:text-white"
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
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const openMenu = ref(false)
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
</script>
