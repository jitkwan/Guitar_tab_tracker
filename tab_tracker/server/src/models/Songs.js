module.exports = (sequelize, DataTypes) => {
  const Song = sequelize.define('Song',{ // to define a new model 1.argue = name of model/2.argue = related info to store 
    title: DataTypes.STRING,
    artist: DataTypes.STRING,
    genre: DataTypes.STRING,
    album: DataTypes.STRING,
    albumImageUrl: DataTypes.STRING,
    youtubeId: DataTypes.STRING,
    lyrics: DataTypes.TEXT,
    tab: DataTypes.TEXT,

})
return Song
}