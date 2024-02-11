<template>
  <header class="bg-black border-b-2 p-5 flex justify-center">
    <nav>
      <RouterLink
        to="/"
        class="text-xl mr-10 p-1 text-white hover:text-blue-300 transition-all"
        :class="$route.name === 'home' ? 'underline' : 'no-underline'"
        >Containers</RouterLink
      >
      <RouterLink
        to="/settings"
        class="text-xl p-1 text-white hover:text-blue-300 transition-all"
        :class="$route.name === 'settings' ? 'underline' : 'no-underline'"
        >Settings</RouterLink
      >
    </nav>
  </header>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<script lang="ts">
export default {
  name: 'NavBar'
}
</script>
