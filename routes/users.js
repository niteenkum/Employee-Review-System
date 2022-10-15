/* Importing the required modules. */
const express = require("express");
const router = express.Router();
const userController = require("../controllers/users_controller");
const passport = require("passport");

/* This is a route to the user profile. */
router.get("/profile", passport.checkAuthentication, userController.profile);
/* This is a route to the user dashboard. */
router.get(
  "/user_dashboard",
  passport.checkAuthentication,
  userController.userDashboard
);
/* This is a route to the admin dashboard. */
router.get(
  "/admin_dashboard",
  passport.checkAuthentication,
  userController.adminDashboard
);
/* A route to the sign up page. */
router.get("/sign-up", userController.SignUp);
/* A route to the sign in page. */
router.get("/sign-in", userController.SignIn);
/* Creating a new user. */
router.post("/create", userController.create);
/* A route to the add feedback page. */
router.post("/add-feedback/:id", userController.addFeedback);



// use passport as a middleware to authenticate
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/users/sign-in" }),
  userController.createSession
);

// SIgn Out
router.get("/sign-out", userController.destroySession);

module.exports = router;
