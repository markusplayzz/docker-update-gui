<template>
  <h1>Settings</h1>
  <div id="sshContainer" class="shadow-lg rounded-lg p-5 border lg:w-6/12 lg:ml-[25%]">
    <h2 class="text-center">SSH Connection to Docker Server</h2>
    <p class="text-red-500 font-bold text-lg">
      The below specified user must have at least sudo-rights!
    </p>
    <form v-on:submit.prevent="onSubmit()" class="">
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
      <label for="inputIP" class="mt-5">IP Address</label><br />
      <input id="inputIP" type="text" class="border rounded-lg p-1 w-full font-mono" /><br />
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
