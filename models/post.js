// const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    
      // DESIGN
      let Post = sequelize.define('post', {

        liked:  DataTypes.BOOLEAN, 
          loved:  DataTypes.BOOLEAN
        } , {
        underscored: true
        });

      return Post;
    };
    