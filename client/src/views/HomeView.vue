<template>
  <h1>Containers</h1>
  <p class="lg:w-6/12 lg:ml-[25%] font-bold text-lg" v-if="date !== ''">Last Poll: {{ date }}</p>
  <div
    class="w-full shadow-lg rounded-lg mt-3 border border-gray-200 p-5 grid grid-cols-2 lg:w-6/12 lg:ml-[25%]"
    v-for="(update, index) in updates"
    :key="index"
  >
    <div>
      <p class="font-bold mb-1 text-lg">{{ update.Name }}</p>
      <p><span class="font-bold">Image:</span> {{ update.Image }}</p>
      <p class="text-base" v-if="update.UpdateAvailable === true">Update available</p>
      <p><span class="font-bold">Local Etag:</span> {{ update.LocalEtag }}</p>
      <p><span class="font-bold">Remote Etag:</span> {{ update.RemoteEtag }}</p>
    </div>

    <div class="flex flex-row items-center justify-end" v-if="update.UpdateAvailable === true">
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
      updates: [] as any[],
      date: '' as string,
      polling: 0 as number
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
      this.updates = (await axios.get('http://192.168.115.106/api/updates')).data
      localStorage.setItem('updates', JSON.stringify(this.updates))
      this.date = moment().format('HH:mm:ss DD/MM/YYYY')
      localStorage.setItem('refreshDate', this.date)
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
