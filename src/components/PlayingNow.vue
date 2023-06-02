<template>
  <section class="mt-6">
    <div class="px-6">
      <h1 class="text-lg font-bold text-secondary2 font-poppins">Now Playing</h1>
      <Swiper
        class="p-4 mt-2"
        :modules="modules"
        :spaceBetween="25"
        :freeMode="true"
        :pagination="{
          clickable: true
        }"
      >
        <Swiper-Slide v-for="item in nowPlaying" :key="item" class="pb-9">
          <NowPlayingItem :item="item" />
        </Swiper-Slide>
      </Swiper>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import { Swiper, SwiperSlide } from 'swiper/vue'
// import required modules
import { Pagination, FreeMode } from 'swiper'

// Import Swiper styles
import 'swiper/css'

import 'swiper/css/pagination'
import { onMounted, onUpdated, ref } from 'vue'

import NowPlayingItem from './Home/NowPlayingItem.vue'
export default {
  components: {
    Swiper,
    SwiperSlide,
    NowPlayingItem
  },
  setup() {
    const nowPlaying = ref([])

    const getNowPlaying = async () => {
      try {
        const response = await axios.get(
          'https://api.themoviedb.org/3/movie/now_playing?api_key=24c3da9cbad7b70ea81d42919f3ee7b3'
        )
        nowPlaying.value = response.data.results.splice(0, 10)
      } catch (error) {
        console.log(error)
      }
    }

    onMounted(() => {
      getNowPlaying()
    })

    const swiperTextBase = ref([
      {
        title: 'Spider-Man: Across the Spider-Verse',
        date: 'May 31, 2023',
        img: 'https://images.pexels.com/photos/10721612/pexels-photo-10721612.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
      },
      {
        title: 'The Little Mermaid',
        date: 'May 18, 2023',
        img: 'https://images.pexels.com/photos/10721612/pexels-photo-10721612.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
      },
      {
        title: 'Dungeons & Dragons: Honor Among Thieves',
        date: 'Mar 23, 2023',
        img: 'https://images.pexels.com/photos/10721612/pexels-photo-10721612.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
      }
    ])

    return { modules: [Pagination, FreeMode], swiperTextBase, nowPlaying }
  }
}
</script>
