const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))

function hashPassword (user, options) {
  const SALT_FACTOR = 8

  if (!user.changed('password')) {
    return
  }

  return bcrypt
    .genSaltAsync(SALT_FACTOR)
    .then(salt => bcrypt.hashAsync(user.password, salt, null))
    .then(hash => {
      user.setDataValue('password', hash)
      // console.log(`This is hash ${hash}`)
    })
}

module.exports = (sequelize, DataTypes) => { // export func that take sequelize, DataTypes
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true // to prevent duplicate email
    },
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: hashPassword
    }
  })

  User.prototype.comparePassword = function (password) {
    return bcrypt.compareAsync(password, this.password)
  }

  User.associate = function (models) {
  }

  return User
}
