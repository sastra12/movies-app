<template>
  <router-link :to="`movie/${props.item.id}`" class="cursor-pointer">
    <img :src="poster_path" alt="" class="rounded-md h-64 w-full bg-cover" />
    <h1 class="mt-3 font-poppins text-base font-semibold text-secondary">{{ props.item.title }}</h1>
    <span class="text-sm font-normal font-poppins">{{ genreTypeName(props.item.genre_ids) }}</span>
    <div class="flex items-center justify-between mt-2">
      <span class="font-poppins text-sm font-light">{{ props.item.release_date }}</span>
      <div class="flex items-center gap-x-0.5 sm:gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="text-sm" height="1em" viewBox="0 0 576 512">
          <!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
          <path
            fill="orange"
            d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
          />
        </svg>
        <span class="text-sm font-poppins font-light">{{
          Math.round(props.item.vote_average * 10) / 10
        }}</span>
      </div>
    </div>
  </router-link>
</template>

<script setup>
import { computed } from 'vue'
import { useMoviesStore } from '../../stores/movies'

const movieStore = useMoviesStore()
const props = defineProps({
  item: {
    required: true,
    type: Object
  }
})

const genreTypeName = (genreId) => {
  return movieStore.genreTypeName(genreId)
}

const poster_path = computed(() => {
  return 'https://image.tmdb.org/t/p/w500' + props.item.poster_path
})
</script>
