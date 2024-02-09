<template>
    <header class="bg-black border-b-2 p-5 flex justify-center">
        <nav>
            <a href="" class="text-xl mr-10 p-1 border-gray-400 text-white hover:text-blue-200 transition-all" :class="window === 'updates' ? 'underline' : 'no-underline'">Updates</a>
            <a href="" class="text-xl mr-10 p-1 border-gray-400 text-white hover:text-blue-200 transition-all" :class="window === 'images' ? 'underline' : 'no-underline'">Images</a>
            <a href="" class="text-xl mr-10 p-1 border-gray-400 text-white hover:text-blue-200 transition-all" :class="window === 'settings' ? 'underline' : 'no-underline'">Settings</a>
        </nav>
    </header>
</template>

<script lang="ts">
export default {
    name: "NavBar",
    props: {
        window: String
    }
}

</script>