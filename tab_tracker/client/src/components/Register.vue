<template>
  <div>
    <h1>Register</h1>
    <input
    type="text"
    name="email"
    v-model="email"
    placeholder="email"/>
    <br>
    <br>
    <input
    type="password"
    name="password"
    v-model="password"
    placeholder="password"/>
    <br>
    <br>
    <div class="error" v-html="error" />
    <button @click="register">
        Register</button>

  </div>
</template>

<script>
import AuthenticationService from '../services/AuthenticationService'
export default {
  data () {
    return {
      email: '',
      password: '',
      error: null

    }
  },
  methods: {
    async register () {
      try {
        await AuthenticationService.register({
          email: this.email,
          password: this.password
        })
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<style scoped>
.error {
  color: red;
}
</style>
