// const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {

  // DESIGN

  let Screencaps = sequelize.define('screencaps', {
  
    path: {
      type: DataTypes.STRING,
      required: true,
      validate: {
        notEmpty: true,
      }
    }
  }, {
    underscored: true
  });

  // one table have one screencaps
  Screencaps.associate = function (db){
    db.screencaps.belongsTo(db.movies , {  
      onDelete: "CASCADE",
      foreignKey:{
        allownull:false
      }
    });
  }


  return Screencaps;
};
