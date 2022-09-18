const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controllers');

router.get('/', homeController.dashboard);
// router.auth('')
router.use('/users', require('./user'));
 
module.exports = router;