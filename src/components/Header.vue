<script setup>
import { ref } from 'vue'

const openMenu = ref(false)
const links = ref([
  { link: '#', name: 'Movies' },
  { link: '#', name: 'Tv Show' },
  { link: '#', name: 'People' }
])

const changeMenu = () => {
  openMenu.value = !openMenu.value
}
</script>

<template>
  <div class="bg-primary sm:flex md:justify-center">
    <header class="py-3.5 px-6 md:flex md:justify-between md:w-4/5">
      <h1 class="text-3xl font-poppins text-secondary font-bold">The Movie App</h1>

      <!-- Hamburger Menu -->
      <span class="absolute md:hidden top-3 right-6 text-4xl cursor-pointer" @click="changeMenu">
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
        class="absolute top-16 duration-700 ease-in px-1 bg-primary w-full md:w-auto md:static md:flex md:items-center"
        :class="[openMenu ? '-left-14' : 'left-[-100%]']"
      >
        <li
          class="text-xl text-white px-20 my-6 hover:text-secondary md:mx-4 md:my-0 md:px-0"
          v-for="nav in links"
          :key="nav"
        >
          <a :href="nav.link">{{ nav.name }}</a>
        </li>
      </ul>
    </header>
  </div>
</template>
