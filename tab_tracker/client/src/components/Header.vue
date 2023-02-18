<template>
  <v-toolbar fixed class="cyan" dark>
    <v-toolbar-title class="mr-4">
        <span
        class="home"
         @click="navigateTo({name: 'root'})" >
        TabTracker
        </span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>

    <v-btn text dark
    @click="navigateTo({name: 'login'})">
        Log in
      </v-btn>

    <v-btn text dark
    @click="navigateTo({name: 'register'})">
        Sign Up
      </v-btn>

    </v-toolbar-items>
  </v-toolbar>

</template>

<script>
export default {
  methods: {
    navigateTo (route) {
      this.$router.push(route)
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
