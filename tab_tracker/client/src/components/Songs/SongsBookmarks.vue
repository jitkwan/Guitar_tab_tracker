<template>
  <panel title="Bookmarks">
    <v-data-table
      :headers="headers"
      :options.sync="pagination"
      :items="bookmarks">
      <template v-slot:items="props">
        <td class="text-xs-right">
          {{props.item.title}}
        </td>
        <td class="text-xs-right">
          {{props.item.artist}}
        </td>
      </template>
    </v-data-table>
  </panel>
</template>

<script>
import {mapState} from 'vuex'
import BookmarksService from '@/services/BookmarksService'

export default {
  data () {
    return {
      headers: [
        {
          text: 'Title',
          value: 'title'
        },
        {
          text: 'Artist',
          value: 'artist'
        }
      ],
      pagination: {
        sortBy: ['createdAt'],
        descending: true
      },
      bookmarks: []
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  async mounted () {
    if (this.isUserLoggedIn) {
      const bm = (await BookmarksService.index()).data
      for (const i of bm) {
        this.bookmarks.push({title: i.Song.title,
          artist: i.Song.artist})
      }
      // console.log('bm >>', this.bookmarks)
    }
  }}
</script>

<style>

</style>
