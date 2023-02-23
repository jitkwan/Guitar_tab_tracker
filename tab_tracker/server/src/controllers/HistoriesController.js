const {
  History,
  Song
} = require('../models')
const _ = require('lodash')

module.exports = {
  async index (req, res) {
    try {
      const userId = req.user.id
      const histories = await History.findAll({
        where: {
          UserId: userId
        },
        include: [
          {
            model: Song
          }
        ],
        group: [
          'SongId'
        ],
        order: [
          ['createdAt', 'DESC']
        ]
      });
      
      const historyObjects = await Promise.all(
        histories.map(async (history) => {
          const song = await history.getSong();
          return Object.assign({}, history.toJSON(), song.toJSON());
        })
      );
      
      res.send(_.uniqBy(historyObjects, history => history.SongId
        ));
      
    } catch (err) {
      console.log(`7 I have error ${err}`)
      res.status(500).send({
        error: 'an error has occured trying to fetch the history'
      })
    }
  },
  async post (req, res) {
    try {
      const userId = req.user.id
      const {songId} = req.body
      const history = await History.create({
        SongId: songId,
        UserId: userId
      })
      res.send(history)
    } catch (err) {
      console.log(`8 I have error ${err}`)
      res.status(500).send({
        error: 'an error has occured trying to create the history object'
      })
    }
  }
}
