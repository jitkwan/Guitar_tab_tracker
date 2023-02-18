<template>
  <v-layout column >
    <v-flex xs6 offset-xs3>
        <panel title="Songs">

          <v-btn
          slot="action"
          @click="navigateTo({name: 'songs-create'})"
        class="cyan accent-2"
        light
        medium
        absolute
        right
        middle
        fab>
          <v-icon>add</v-icon>
        </v-btn>

            <div v-for="song in songs"
            class="song"
            :key="song.id">
            <v-layout>
              <v-flex xs6>
                <div class="song-title">
                  {{ song.title }}
                </div>
                <div class="song-artist">
                  {{ song.artist }}
                </div>
                <div class="song-genre">
                  {{ song.genre }}
                </div>

                <v-btn
            class="cyan"
            @click="navigateTo({name: 'song', params: {songId: song.id}})">
                View</v-btn>
              </v-flex>

              <v-flex xs6>
                <img class="album-image" :src="song.albumImageUrl" />
              </v-flex>
            </v-layout>

            </div>
        </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import SongService from '../services/SongsService'
import Panel from './Panel.vue'
export default {
  components: {
    Panel
  },
  data () {
    return {
      songs: null
    }
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    }
  },
  async mounted () {
    // do a request to backend for all songs
    this.songs = (await SongService.index()).data
  }
}
</script>

<style scoped>
.song{
  padding: 20px;
  height: 330px;
  overflow: hidden;
}
.song-title {
  font-size: 30px;
}
.song-title {
  font-size: 24px;
}
.song-title {
  font-size: 18px;
}
.album-image {
  width: 70%;
  margin: 0 auto;
}
</style>
