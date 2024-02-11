<template>
  <h1>Settings</h1>
  <div id="sshContainer" class="shadow-lg rounded-lg p-5 border">
    <h2 class="text-center">SSH Connection to Docker Server</h2>
    <form v-on:submit.prevent="onSubmit()" ref="sshForm" class="">
      <label for="inputUsername">Username</label><br />
      <input
        id="inputUsername"
        type="text"
        class="border rounded-lg p-1 w-full font-mono"
        :placeholder="sshUsername"
      /><br />
      <label for="inputPassword" class="mt-5">Password</label><br />
      <input
        id="inputPassword"
        :type="inputPasswordType"
        class="border rounded-lg p-1 w-full font-mono"
      /><br />
      <input type="checkbox" v-model="inputShowPasswordChecked" class="mr-1 mt-2" />Show Password<br />
      <input
        class="p-2 border rounded-full bg-green-500 border-green-500 mt-2 hover:bg-green-300 transition-all cursor-pointer text-lg"
        type="submit"
        value="Submit"
      />
    </form>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Settings',
  methods: {
    onSubmit() {
      window.alert('Submitted')
      this.$refs.sshForm.reset()
    }
  },
  data() {
    return {
      inputPasswordType: 'password',
      inputShowPasswordChecked: false,
      sshUsername: 'old Username'
    }
  },
  watch: {
    async inputShowPasswordChecked() {
      if (this.inputShowPasswordChecked) {
        this.inputPasswordType = 'text'
      } else {
        this.inputPasswordType = 'password'
      }
    }
  }
}
</script>

<style scoped>
#sshContainer {
  width: 50%;
  margin-left: 25%;
}
</style>
