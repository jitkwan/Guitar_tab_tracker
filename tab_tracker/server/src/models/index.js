const fs = require('fs')
const path = require('path') // use to deal with conjunction to read fs
const Sequelize = require('sequelize') // to create sqlite obj and connect db
const config = require('../config/config')
const db = {}

const sequelize = new Sequelize( //declare sqlite obj
// argument to pass to sequelize
    config.db.database,
    config.db.user,
    config.db.password,
    config.db.options

)

fs // read file in model folder
  .readdirSync(__dirname) // default = read in current dir and give us array of diff file
  .filter((file) => // filter out index file
    file !== 'index.js'
  )
  .forEach((file) => {
    // const model = sequelize.import(path.join(__dirname, file)) // import each file after filter to sqlize
    // path.join to join the dirname to the path file and the import
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
    db[model.name] = model // equal to db.User = model
  })

  db.sequelize = sequelize
  db.Sequelize = Sequelize

module.exports = db