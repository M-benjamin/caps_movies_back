const db = require('../models');
const sequelize = require('../models').sequelize;

class CapsController {

  //GET /caps-random
  showCapsRandom(req, res) {
    let options = {
        include: [
            {
                model: db.movies,
                attributes: ['title']
            }
        ], order: [
            sequelize.fn('RANDOM')
          ]
    }
    db.screencaps.findOne(options).then( caps => {
      res.status(200).json({caps});
    })
  }

  //GET /caps
  showCaps(req, res) {

    let options = {
        include: [
            {
                model: db.movies,
                attributes: ['title']
            }
        ]
    }
    db.screencaps.findAll(options).then(caps => {
          res.status(200).json({caps});   
    })
  }
}

module.exports = new CapsController();


