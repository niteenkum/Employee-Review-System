const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin_controller");
const passport = require("passport");

/* A route handler. It is a function that will be called when the user visits the route to add new employee. */
router.get(
  "/add_new_emp",
  passport.checkAuthentication,
  adminController.AddNew
);
/* A route handler. It is a function that will be called when the user visits the route to view the user. */
router.get(
  "/view_user/:id",
  passport.checkAuthentication,
  adminController.viewUser
);
/* A route handler. It is a function that will be called when the user visits the route to update the
user. */
router.post(
  "/update-user/:id",
  passport.checkAuthentication,
  adminController.updateUser
);
/* A route handler. It is a function that will be called when the user visits the route to make the
user admin. */
router.get(
  "/make-admin/:id",
  passport.checkAuthentication,
  adminController.makeAdmin
);
/* A route handler. It is a function that will be called when the user visits the route to delete the
user. */
router.get(
  "/delete/:id",
  passport.checkAuthentication,
  adminController.deleteUser
);

/* A route handler. It is a function that will be called when the user visits the route to assign the
reviewer. */
router.post(
  "/reviewer/:id",
  passport.checkAuthentication,
  adminController.assignReviewer
);
/* Exporting the router to be used in other files. */
module.exports = router;
