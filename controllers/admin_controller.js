const User = require("../models/user");
const Performance = require("../models/performance");

/* This is a function that is being exported to the controller to add new employee. */
module.exports.AddNew = function (req, res) {
  return res.render("add_new_emp", {
    title: "Add New",
  });
};

/* This is a function that is being exported to the controller to view the employee. */
module.exports.viewUser = function (req, res) {
  const id = req.params.id;
  User.find({ _id: { $ne: id }, role: "user" }, function (err, users) {
    if (err) {
      console.log("Error While finding the users");
    }
    User.findById(id, function (err, user) {
      if (err) {
        console.log("Error in finding the user");
        return;
      }

      Performance.find({user: id}, function(err, performance){
        if(err){
          console.log("Error in finding the performance");
          return;
        }
        console.log("Performancesss", performance);
        return res.render("view_user", {
          title: "View User",
          user: user,
          users: users,
          performance: performance,
        });
      })

      // return res.render("view_user", {
      //   title: "View User",
      //   user: user,
      //   users: users,
      // });
    });
  });
};

/* This is a function that is being exported to the controller to update the employee. */
module.exports.updateUser = function (req, res) {
  const id = req.params.id;
  if (res.locals.user.role === "admin") {
    User.findByIdAndUpdate(id, req.body, function (err, user) {
      if (err) {
        console.log("Error in updating the user");
        return;
      }
      return res.redirect("back");
    });
  } else {
    return res.status(401).send("Unauthorized");
  }
};

/* This is a function that is being exported to the controller to make the employee admin. */
module.exports.makeAdmin = function (req, res) {
  if (res.locals.user.role === "admin") {
    User.findByIdAndUpdate(
      req.params.id,
      { role: "admin" },
      function (err, user) {
        if (err) {
          console.log("Error in making the user admin");
          return;
        }
        return res.redirect("back");
      }
    );
  } else {
    return res.status(401).send("Unauthorized");
  }
};

// Delete Employee
module.exports.deleteUser = function (req, res) {
  console.log("id", req.params.id);
  User.findByIdAndDelete(req.params.id, function (err) {
    if (err) {
      console.log("Error in deleting the user");
      return;
    }
    return res.redirect("/");
  });
  //  User.deleteOne({_id: req.params.id})
};

// Assign Reviewer
module.exports.assignReviewer = function (req, res) {
  const id = req.params.id;
  Performance.create(
    {
      user: id,
      name: req.body.name,
      reviewer:  req.body.reviewer,
      rating: 0,
      comment: "No Comment",
      status: "pending",
    },
    function (err, performance) {
      if (err) {
        console.log("Error in creating the performance");
        return;
      }
      return res.redirect("back");
    }
  );
};
