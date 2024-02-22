<template>
  <footer
    class="fixed bottom-0 left-0 min-w-full bg-black text-white h-6 text-sm flex flex-row items-center justify-center"
  >
    Markus Weberndorfer 2024 - {{ new Date().getFullYear() }}
  </footer>
</template>

<script setup lang="ts"></script>

<script lang="ts">
export default {
  name: 'Footer'
}
</script>
