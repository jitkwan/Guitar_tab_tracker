import Api from './Api'

export default {
  index () {
    return Api().get('songs')
  },
  post (song) {
    return Api().post('songs', song)
  }
}
