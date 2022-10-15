const express = require("express");
const router = express.Router();
const userController = require("../controllers/users_controller");

/* A route to the sign in page. */
router.get('/', userController.SignIn);
/* Telling the server to use the users.js file in the routes folder. */
router.use('/users', require("./users"));
/* Telling the server to use the posts.js file in the routes folder. */
router.use('/admin', require("./admin"));



module.exports = router;