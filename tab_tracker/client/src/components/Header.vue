<template>
  <v-card
    color="grey-lighten-4"
    flat
    height="200px"
    rounded="0"
  >
  <v-toolbar density="compact" class="cyan" dark>
    <v-toolbar-title class="mr-4">
        <span
        class="home"
         @click="navigateTo({name: 'root'})" >
        TabTracker
        </span>
    </v-toolbar-title>

    <v-toolbar-items>
      <v-btn
         text dark
        @click="navigateTo({name: 'songs'})">
        Browse
      </v-btn>
    </v-toolbar-items>

    <v-spacer></v-spacer>

    <v-toolbar-items>
    <v-btn
    v-if="!$store.state.isUserLoggedIn"
    text dark
    @click="navigateTo({name: 'login'})">
        Log in
      </v-btn>

    <v-btn
    v-if="!$store.state.isUserLoggedIn"
    text dark
    @click="navigateTo({name: 'register'})">
        Sign Up
      </v-btn>

      <v-btn
    v-if="$store.state.isUserLoggedIn"
    text dark
    @click="logout">
        Log out
      </v-btn>

    </v-toolbar-items>
  </v-toolbar>
</v-card>
</template>

<script>
export default {
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'root'
      })
    }
  }
}
</script>

<style scoped>
.home{
  cursor: pointer;
}
.home:hover{
  color: black
}

</style>
