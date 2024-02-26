<template>
  <h1>Containers</h1>
  <p class="lg:w-6/12 lg:ml-[25%] font-bold text-lg" v-if="date !== ''">Last Poll: {{ date }}</p>
  <div
    class="w-full shadow-lg rounded-lg mt-3 border border-gray-200 p-5 grid lg:w-6/12 lg:ml-[25%]"
    v-for="(container, index) in containers"
    :key="index"
  >
    <div class="col-span-2 break-words">
      <p class="font-bold mb-1 text-lg">{{ container.name }}</p>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Containers',
  data() {
    return {
      loading: true as boolean,
      containers: [] as any[],
      date: '' as string,
      polling: 0 as number,
      baseUrl: window.location.origin as string
    }
  },
  async mounted() {
    if (localStorage.getItem('containers') !== null) {
      this.containers = JSON.parse(localStorage.getItem('containers')!)
      this.date = localStorage.getItem('refreshDate')!
    } else {
      await this.getContainers()
    }
    this.loading = false
    this.pollData()
  },
  methods: {
    pollData() {
      console.log('Started status polling')
      this.polling = setInterval(() => {
        this.getContainers()
      }, 60000)
    },

    async getContainers() {
      this.containers = (await axios.get(`${this.baseUrl}/api/updates`)).data
      localStorage.setItem('containers', JSON.stringify(this.containers))
      this.date = moment().format('HH:mm:ss DD/MM/YYYY')
      localStorage.setItem('refreshDate', this.date)
    }
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
