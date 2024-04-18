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
    await this.getContainers()
    this.loading = false
  },
  methods: {
    async getContainers() {
      this.containers = (await axios.get(`${this.baseUrl}/api/updates`)).data
      this.date = moment().format('HH:mm:ss DD/MM/YYYY')
    }
  },
}
</script>

<script setup lang="ts">
import axios from 'axios'
import moment from 'moment'
</script>
