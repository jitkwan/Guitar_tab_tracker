module.exports = (sequelize, DataTypes) => 
  sequelize.define('User',{ // to define a new model 1.argue = name of model/2.argue = related info to store 
    email: {
        type: DataTypes.STRING,
        unique: true // to prevent duplicate email
    },
    password: DataTypes.STRING

})