const express = require('express');
const router  = express.Router();

const UserController = require('../controllers/users_controller.js');

router.get('/', UserController.index);
router.get('/:id', UserController.show);
router.delete('/:id', UserController.delete);
router.put('/:id', UserController.update);

module.exports = router;