<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'
</script>

<script lang="ts"></script>

<template>
  <div class="min-h-screen">
    <NavBar />
    <div class="m-2">
      <RouterView />
    </div>
    <Footer />
  </div>
</template>
