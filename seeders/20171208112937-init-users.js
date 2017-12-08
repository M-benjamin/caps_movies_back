const path   = require('path')
const bcrypt = require('bcrypt')

module.exports = {
  up: (queryInterface, Sequelize) => {

    // loading modules from json
    let users = require(path.join(__dirname, '..', 'data', 'users.json'));

      // map the array...
      users = users.map((u, index) => {

        // ... and adding an id and specific timestamps
        u.id = index + 1
        u.created_at = u.updated_at = new Date()

        u.password = bcrypt.hashSync(u.password, bcrypt.genSaltSync())

        return u
      })

    return queryInterface.bulkInsert('users', users)
  },

  down: (queryInterface, Sequelize) => {
    return [
      queryInterface.bulkDelete('users', null, {}),
    ]
  }
}