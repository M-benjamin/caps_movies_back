const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {

  // DESIGN

  let User = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      required: true,
      validate: {
        notEmpty: true,
      }
    },
    firstname: {
      type: DataTypes.STRING,
      required: true,
      validate: {
        notEmpty: true,
      }
    },
    lastname: {
      type: DataTypes.STRING,
      required: true,
      validate: {
        notEmpty: true,
      }
    },
    email: {
      type: DataTypes.STRING,
      required: true,
      validate: {
        isEmail: true,
      },
      unique: {
        args: true,
        msg: 'Email address already in use!'
      }
    },
    password: {
      type: DataTypes.STRING,
      required: true,
      validate: {
        len: [ 5, 20 ],
      }
    },
    password_confirmation: {
      type: DataTypes.VIRTUAL
    },
  }, {
    underscored: true
  } ,{

    hooks: {
      beforeCreate: function(user) {
        if (user.password != user.password_confirmation) {
          throw new Error("Passwords doesn't match!");
        }

        let salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
      },

      //instance db user update
      //with beforebulk use attribute on values
      beforeBulkUpdate: function(user){
        if (user.attributes.password != user.attributes.password_confirmation) {
          throw new Error("Passwords doesn't match!");
        }

        let salt = bcrypt.genSaltSync();
        user.attributes.password = bcrypt.hashSync(user.attributes.password, salt);
      }, 

      //intance u.update
      beforeSave: function () {
        
      }
    }
  });

  //user can like or love for 
  //no need a relation in screen because only a user can like 
  //and love a sreencaps no have action
  User.associate = function (db){
    db.user.belongsToMany(db.screencaps, 
      { 
        through: db.post 
      });
  }

  // EXTENDS METHODS
  User.prototype.checkPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  }

  //FOR REMOVE PASSWORD ON REQUEST
  User.prototype.toJSON = function() {
    //duplicte my objet and put content in obj
    let obj = Object.assign({}, this.get());
    delete obj.password;
    return obj;
  }
   

  return User;
};
