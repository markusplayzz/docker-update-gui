<template>
  <h1>Containers</h1>
  <div
    class="w-full shadow-lg rounded-lg mt-3 border border-gray-200 p-5 text-lg grid grid-cols-2 lg:w-6/12 lg:ml-[25%]"
  >
    <div>
      <p class="font-bold mb-1">Nextcloud AIO</p>
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
    class="w-full shadow-lg rounded-lg mt-3 border border-gray-200 p-5 text-lg grid grid-cols-2 lg:w-6/12 lg:ml-[25%]"
  >
    <div>
      <p class="font-bold mb-1">Bitwarden Password Manager</p>
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
