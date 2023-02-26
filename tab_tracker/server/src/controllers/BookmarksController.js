const {
  Bookmark,
  Song
} = require('../models')
const _ = require('lodash')

module.exports = {
  //get book mark
  async index (req, res) {
    try {
      const userId = req.user.id
      const {songId} = req.query
      const where = {
        UserId: userId
      }
      if (songId) {
        where.SongId = songId
      }
      const bookmarks = await Bookmark.findAll({
        where: where,
        include: [
          {
            model: Song
          }
        ]
      });
      
      const bookmarkObjects = await Promise.all(
        bookmarks.map(async (bookmark) => {
          const song = await bookmark.getSong();
          return Object.assign({}, bookmark.toJSON(), song.toJSON());
        })
      );
      res.send(bookmarks)
    } catch (err) {
      // console.log(`1 It has error ${err}`)
      res.status(500).send({
        error: 'an error has occured trying to fetch the bookmark'
      })
    }
  },

  // create bookmark 
  async post (req, res) {
    try {
      const userId = req.user.id
      const {songId} = req.body
      const bookmark = await Bookmark.findOne({
        where: {
          SongId: songId,
          UserId: userId
        }
      })
      if (bookmark) {
        return res.status(400).send({
          error: 'you already have this set as a bookmark'
        })
      }
      const newBookmark = await Bookmark.create({
        SongId: songId,
        UserId: userId
      })
      res.send(newBookmark)
    } catch (err) {
      // console.log(`2 It has error ${err}`)
      console.log(err)
      res.status(500).send({
        error: 'an error has occured trying to create the bookmark'
      })
    }
  },
  async remove (req, res) {
    try {
      const userId = req.user.id
      const {bookmarkId} = req.params
      const bookmark = await Bookmark.findOne({
        where: {
          id: bookmarkId,
          UserId: userId
        }
      })
      if (!bookmark) {
        return res.status(403).send({
          error: 'you do not have access to this bookmark'
        })
      }
      await bookmark.destroy()
      res.send(bookmark)
    } catch (err) {
      // console.log(`3 It has error ${err}`)
      res.status(500).send({
        error: 'an error has occured trying to delete the bookmark'
      })
    }
  }
}
