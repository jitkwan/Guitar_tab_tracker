<template>
  <panel title="YouTube Video">
    <youtube
      :video-id="youtubeId"
      :player-width="480"
      :player-height="260">
    </youtube>
  </panel>
</template>

<script>
export default {
  props: [
    'youtubeId'
  ]
}
</script>

<style scoped>
</style>
