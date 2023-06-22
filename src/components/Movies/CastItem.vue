<template>
  <div class="border text-center pb-2">
    <img :src="poster_path" alt="" class="bg-cover rounded-sm" />
    <p class="text-lg font-poppins font-semibold mt-3">{{ item.name }}</p>
    <span class="font-poppins font-light text-base">{{ item.character }}</span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  item: {
    required: true,
    type: Object
  }
})

const poster_path = computed(() => {
  if (props.item.profile_path) {
    return 'https://image.tmdb.org/t/p/w500' + props.item.profile_path
  } else if (props.item.profile_path == null) {
    return 'https://via.placeholder.com/300x450'
  }
})
</script>
