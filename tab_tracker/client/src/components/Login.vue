<template>
  <v-layout column >
    <v-flex xs6 offset-xs3  >
      <panel title="Login">
          <v-text-field
            label="Email"
            v-model="email"
            ></v-text-field>
          <v-text-field
            label="Password"
            type="password"
            v-model="password"
            ></v-text-field>
          <br>
          <br>
          <div class="error" v-html="error" />
          <v-btn
            class="cyan"
            @click="login">
                Log in</v-btn>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import Panel from './Panel.vue'
import AuthenticationService from '../services/AuthenticationService'
export default {
  components: {
    Panel
  },
  data () {
    return {
      email: '',
      password: '',
      error: null

    }
  },
  methods: {
    async login () {
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
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
