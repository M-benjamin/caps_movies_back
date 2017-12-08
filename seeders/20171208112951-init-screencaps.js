const path   = require('path')
const bcrypt = require('bcrypt')

module.exports = {
  up: (queryInterface, Sequelize) => {

    let screencaps = require(path.join(__dirname, '..', 'data', 'screencaps.json'));

      screencaps = screencaps.map((s, index) => {

        s.id = index + 1
        s.created_at = s.updated_at = new Date()

        return s
      })

    return queryInterface.bulkInsert('screencaps', screencaps)
  },

  down: (queryInterface, Sequelize) => {
    return [
      queryInterface.bulkDelete('screencaps', null, {}),
    ]
  }
}