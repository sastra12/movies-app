<script setup>
import Navbar from '@/components/Layouts/Navbar.vue'
import Footer from '@/components/Layouts/Footer.vue'
</script>

<template>
  <div class="site-container">
    <Navbar />
    <div class="site-content">
      <router-view></router-view>
    </div>
    <Footer />
  </div>
</template>

<style scoped>
.site-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Ensure the container takes at least the full viewport height */
}

.site-content {
  flex: 1;
  /* Allow site content to grow and fill available space */
}

.Footer {
  /* Your footer styles, e.g., background, color, padding, etc. */
  margin-top: auto; /* Push the footer to the bottom of the container */
}
</style>
