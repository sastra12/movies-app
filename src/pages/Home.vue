<template>
  <div>
    <PlayingNow />
    <CategoryMovie />
    <TrendingAll />
    <FreeToWatch />
  </div>
</template>

<script setup>
import TrendingAll from '@/components/TrendingAll.vue'
import CategoryMovie from '@/components/CategoryMovie.vue'
import PlayingNow from '@/components/PlayingNow.vue'
import FreeToWatch from '@/components/FreeToWatch.vue'
</script>
