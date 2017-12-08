const express = require('express');
const router  = express.Router();

const CapsController = require('../controllers/caps_controller.js');

router.get('/', CapsController.showCaps);
router.get('/caps-random', CapsController.showCapsRandom);


module.exports = router;