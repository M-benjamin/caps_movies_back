const db = require('../models');

class UsersController {

  // GET /users
  index(req, res) {
    db.user.findAll().then( users => {
      res.status(200).json({ users });
    })
  }

  // GET /users/:id
  show(req, res) {
    let id = req.params.id;
    
    db.user.findById(req.params.id).then(user => { 
        if(!user) {
          res.status(400).end();
        } else {
          res.status(200).json({ user: user});
        }
        
    })
  }

  // PUT /users/:id
  update(req, res) {
    
    let id = req.params.id;

    db.user.update(
      req.body,
    {
      where: { id: id }
    })
    .then(user => {
        if (!user) {
          res.status(400).end(); 
        } else {
          res.status(204).end(); 
        }
       
    });

  }

  // DELETE /users/:id
  delete(req, res) {
    let id = req.params.id;
    db.user.destroy({
      where: {
         id: id 
      }
   }).then(u => {
      res.status(200).json({ message: "user delete success" });
   })
  }
}

module.exports = new UsersController();
