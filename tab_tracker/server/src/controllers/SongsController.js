const {Song} = require('../models')
const { Op } = require('sequelize');

module.exports = {
// get all songs and also can search if it has query
  async index (req, res) {
    try {
      let songs = null
      const search = req.query.search
      if (search) {
        songs = await Song.findAll({
          where: {
            [Op.or]: [
              { title: { [Op.like]: '%' + search + '%' } },
              { artist: { [Op.like]: '%' + search + '%' } },
              { genre: { [Op.like]: '%' + search + '%' } },
              { album: { [Op.like]: '%' + search + '%' } }
            ]
          }
        });
      } else {
        songs = await Song.findAll({
          limit: 10
        })
      }
      res.send(songs)
    } catch (err) {
      console.log(`it has error here ${err}`)
      res.status(500).send({
        error: 'an error has occured trying to fetch the songs'
      })
    }
  },
//get one song
  async show (req, res) {
    try {
      const song = await Song.findByPk(req.params.songId)
      res.send(song)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to show the songs'
      })
    }
  },
//create song
  async post (req, res) {
    try {
      const song = await Song.create(req.body)
      res.send(song)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to create the song'
      })
    }
  },
//update song
  async put (req, res) {
    try {
      await Song.update(req.body, {
        where: {
          id: req.params.songId
        }
      })
      res.send(req.body)
    } catch (err) {
      res.status(500).send({
        error: 'an error has occured trying to update the song'
      })
    }
  }
}
