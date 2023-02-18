const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))

function hashPassword (user, options) {
  const SALT_FACTOR = 8

  if(!user.changed('password')){
    return;
  }
  return bcrypt
  .genSaltAsync(SALT_FACTOR)
  .then(salt => bcrypt.hashAsync(user.password, salt, null))
  .then(hash => {
    user.setDataValue('password',hash)
  })
}

module.exports = (sequelize, DataTypes) => {
const User = sequelize.define('User',{ // to define a new model 1.argue = name of model/2.argue = related info to store 
    email: {
        type: DataTypes.STRING,
        unique: true // to prevent duplicate email
    },
    password: DataTypes.STRING
},{
  hooks:{ // bfore store the user we want to hashpassword
    beforeCreate: hashPassword,
    beforeUpdate: hashPassword,
    beforeSave: hashPassword,
   }
  })
  User.prototype.comparePassword = function (password) {
    return bcrypt.compareAsync(password, this.password) // compare password pass in vs password of model 
  }
  return User 
}