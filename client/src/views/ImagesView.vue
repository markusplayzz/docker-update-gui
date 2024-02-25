<template>
    <h1>Images</h1>
    <p class="lg:w-6/12 lg:ml-[25%] font-bold text-lg" v-if="date !== ''">Last Poll: {{ date }}</p>
    <div
        class="w-full shadow-lg rounded-lg mt-3 border border-gray-200 p-5 grid lg:w-6/12 lg:ml-[25%]"
        v-for="(image, index) in images"
        :key="index"
    >
        <div class="col-span-2 break-words">
            <p class="font-bold mb-1 text-lg">{{ image.image }}</p>
        </div>
    </div>
</template>

<script lang="ts">
export default {
  name: 'Images',
  data() {
    return {
      loading: true as boolean,
      images: [] as any[],
      date: '' as string,
      polling: 0 as number
    }
  },
  async mounted() {
    if (localStorage.getItem('images') !== null) {
      this.images = JSON.parse(localStorage.getItem('images')!)
      this.date = localStorage.getItem('refreshDate')!
    } else {
      await this.getImages()
    }
    this.loading = false
    this.pollData()
  },
  methods: {
    pollData() {
      console.log('Started status polling')
      this.polling = setInterval(() => {
        this.getImages()
      }, 60000)
    },

    async getImages() {
      this.images = (await axios.get('http://192.168.115.106/api/images')).data
      localStorage.setItem('images', JSON.stringify(this.images))
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