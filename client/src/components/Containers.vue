<template>
  <h1 class="">Containers</h1>
  <div
    class="min-w-full shadow-lg rounded-lg mt-2 border border-gray-200 p-1 text-lg grid grid-cols-2"
  >
    <div>
      <p class="font-bold mb-1">Container Name</p>
      <p class="text-base">Update available</p>
      <div class="flex justify-start text-base">
        <p class="text-red-600 mr-2">1.0.0</p>
        <p class="text-black mr-2">-></p>
        <p class="text-green-600">2.0.0</p>
      </div>
    </div>

    <div class="flex flex-row items-center justify-end">
      <button
        class="rounded-full border bg-green-500 border-green-500 p-3 mr-2 hover:bg-green-300 transition-all"
      >
        Update
      </button>
    </div>
  </div>

  <div
    class="min-w-full shadow-lg rounded-lg mt-3 border border-gray-200 p-1 text-lg grid grid-cols-2"
  >
    <div>
      <p class="font-bold mb-1">Container Name 2</p>
      <p class="text-base">All updates installed</p>
      <div class="flex justify-start text-base">
        <p class="text-green-600">2.1.0</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Containers'
}
</script>
