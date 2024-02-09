<template>
    <header class="bg-black border-b-2 p-5 flex justify-center">
        <nav>
            <RouterLink to="/" href="" class="text-xl mr-10 p-1 border-gray-400 text-white hover:text-blue-200 transition-all" :class="window === 'containers' ? 'underline' : 'no-underline'">Containers</RouterLink>
            <RouterLink to="/settings" class="text-xl mr-10 p-1 border-gray-400 text-white hover:text-blue-200 transition-all" :class="window === 'settings' ? 'underline' : 'no-underline'">Settings</RouterLink>
        </nav>
    </header>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<script lang="ts">
export default {
    name: "NavBar",
    props: {
        window: String
    }
}
</script>