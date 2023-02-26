<template>
  <v-layout column>
    <v-flex>
      <songs-search-panel class="mt-4 mr-4 ml-4 rounded-sm"  />
    </v-flex>
  <v-layout>
    <v-flex xs6 v-if="isUserLoggedIn">
      <songs-bookmarks class="mt-12 mr-2 ml-4 rounded-sm" />
      <recently-viewed-songs class="mt-4 mr-2 ml-4 rounded-sm" />
    </v-flex>

    <v-flex :class="{
        xs12: !isUserLoggedIn,
        xs6: isUserLoggedIn
      }" class="ml-2">
      <songs-panel class="mt-12 mr-4 ml-2 rounded-sm" />
    </v-flex>
  </v-layout>
  </v-layout>
</template>

<script>
import SongsPanel from './SongsPanel'
import SongsBookmarks from './SongsBookmarks'
import RecentlyViewedSongs from './RecentlyViewedSongs'
import SongsService from '@/services/SongsService'
import {mapState} from 'vuex'
import SongsSearchPanel from './SongsSearchPanel'

export default {
  components: {
    SongsPanel,
    SongsBookmarks,
    RecentlyViewedSongs,
    SongsSearchPanel
  },
  computed: {
    ...mapState([
      'isUserLoggedIn'
    ])
  },
  data () {
    return {
      songs: null
    }
  },
  async mounted () {
    this.songs = (await SongsService.index()).data
  }
}
</script>

<style scoped>
.song {
  padding: 20px;
  height: 330px;
  overflow: hidden;
}

.song-title {
  font-size: 30px;
}

.song-artist {
  font-size: 24px;
}

.song-genre {
  font-size: 18px;
}

.album-image {
  width: 70%;
  margin: 0 auto;
}
</style>
