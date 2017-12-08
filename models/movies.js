// const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {

  // DESIGN
  let Movies = sequelize.define('movies', {
    title: {
      type: DataTypes.STRING,
      required: true,
      validate: {
        notEmpty: true,
      }
    }
  }, {
    underscored: true
  });

  // 1 movie have many screencap
  Movies.associate = function(db){
    db.movies.hasMany(db.screencaps);
  }

  return Movies;
};