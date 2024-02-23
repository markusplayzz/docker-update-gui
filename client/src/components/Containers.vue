<template>
  <h1>Containers</h1>
  <p class="lg:w-6/12 lg:ml-[25%] font-bold" v-if="date !== ''">Last Poll: {{ date }}</p>
  <div
    class="w-full shadow-lg rounded-lg mt-3 border border-gray-200 p-5 grid grid-cols-2 lg:w-6/12 lg:ml-[25%]"
    v-for="(container, index) in containers"
    :key="index"
  >
    <div>
      <p class="font-bold mb-1 text-lg">{{ container.Names }}</p>
      <p>ID: {{ container.ID }}</p>
      <p>Image: {{ container.Image }}</p>
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

  <!--
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
  </div>-->
</template>

<script lang="ts">
export default {
  name: 'Containers',
  data() {
    return {
      loading: true as boolean,
      containers: [] as any[],
      images: [] as any[],
      date: '' as string,
      polling: 0 as number
    }
  },
  async mounted() {
    if (localStorage.getItem('containers') !== null) {
      this.containers = JSON.parse(localStorage.getItem('containers')!)
      this.images = JSON.parse(localStorage.getItem('images')!)
      this.date = localStorage.getItem('containersDate')!
    } else {
      await this.getContainers()
      await this.getImages()
    }
    this.loading = false
    this.pollData()
  },
  methods: {
    pollData() {
      console.log('Started status polling')
      this.polling = setInterval(() => {
        this.getContainers()
        this.getImages()
      }, 60000)
    },

    async getContainers() {
      this.containers = (await axios.get('http://192.168.115.106/api/containers')).data
      localStorage.setItem('containers', JSON.stringify(this.containers))
      this.date = moment().format('HH:mm:ss DD/MM/YYYY')
      localStorage.setItem('containersDate', this.date)
    },

    async getImages() {
      this.images = (await axios.get('http://192.168.115.106/api/images')).data
      localStorage.setItem('images', JSON.stringify(this.images))
      //this.date = moment().format('HH:mm:ss DD/MM/YYYY')
      //localStorage.setItem('containersDate', this.date)
    },
  },
  beforeDestroy() {
    clearInterval(this.polling)
  }
}
</script>

<script setup lang="ts">
import axios from 'axios'
import moment from 'moment'
</script>
