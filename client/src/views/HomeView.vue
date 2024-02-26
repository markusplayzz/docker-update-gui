<template>
  <h1>Updates</h1>
  <p class="lg:w-6/12 lg:ml-[25%] font-bold text-lg" v-if="date !== ''">Last Poll: {{ date }}</p>
  <div
    class="w-full shadow-lg rounded-lg mt-3 border border-gray-200 p-5 grid grid-cols-2 lg:w-6/12 lg:ml-[25%] lg:grid-cols-3"
    v-for="(update, index) in updates"
    :key="index"
  >
    <div class="col-span-2 break-words">
      <p class="font-bold mb-1 text-lg">{{ update.name }}</p>
      <p class="text-base font-bold text-red-600" v-if="update.update_available === 1">
        Update available
      </p>
      <p>
        <span class="font-bold">Image:</span> <code>{{ update.image }}</code>
      </p>
      <p>
        <span class="font-bold">Local Etag:</span> <code>{{ update.local_etag }}</code>
      </p>
      <p>
        <span class="font-bold">Remote Etag:</span> <code>{{ update.remote_etag }}</code>
      </p>
    </div>

    <div
      class="flex flex-row items-center col-span-2 justify-center lg:justify-end lg:col-span-1"
      v-if="update.update_available === 1"
    >
      <button
        class="rounded-full border bg-green-500 border-green-500 p-3 mr-2 hover:bg-green-300 transition-all"
      >
        Update
      </button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Updates',
  data() {
    return {
      loading: true as boolean,
      updates: [] as any[],
      date: '' as string,
      polling: 0 as number,
      baseUrl: window.location.origin as string
    }
  },
  async mounted() {
    if (localStorage.getItem('updates') !== null) {
      this.updates = JSON.parse(localStorage.getItem('updates')!)
      this.date = localStorage.getItem('refreshDate')!
    } else {
      await this.getUpdates()
    }
    this.loading = false
    this.pollData()
  },
  methods: {
    pollData() {
      console.log('Started status polling')
      this.polling = setInterval(() => {
        this.getUpdates()
      }, 60000)
    },

    async getUpdates() {
      this.updates = (await axios.get(`${this.baseUrl}/api/updates`)).data
      localStorage.setItem('updates', JSON.stringify(this.updates))
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
