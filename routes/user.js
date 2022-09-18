const express = require('express');
const router = express.Router();
const  userController = require('../controllers/users_controllers');
const passport = require('passport');

router.get('/review', userController.review);
router.get('/sign-in', userController.signIn);

router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-up'}
),userController.createSession);

router.get('/sign-up', userController.signUp);
router.post('/create', userController.create);
module.exports = router;