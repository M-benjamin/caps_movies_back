const path   = require('path')
const bcrypt = require('bcrypt')

module.exports = {
  up: (queryInterface, Sequelize) => {

    let movies = require(path.join(__dirname, '..', 'data', 'movies.json'));

      movies = movies.map((m, index) => {

        m.id = index + 1
        m.created_at = m.updated_at = new Date()

        return m
      })

    return queryInterface.bulkInsert('movies', movies)
  },

  down: (queryInterface, Sequelize) => {
    return [
      queryInterface.bulkDelete('movies', null, {}),
    ]
  }
}