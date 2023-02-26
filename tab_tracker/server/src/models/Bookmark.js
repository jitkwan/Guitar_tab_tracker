module.exports = (sequelize, DataTypes) => {
  const Bookmark = sequelize.define('Bookmark', {}) // model bookmarks initiate as empty obj

  Bookmark.associate = function (models) {
    Bookmark.belongsTo(models.User)
    Bookmark.belongsTo(models.Song)
  }

  return Bookmark
}
