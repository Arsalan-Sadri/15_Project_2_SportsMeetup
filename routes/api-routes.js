var db = require("../models");

module.exports = function (app) {

  // Code to handle user login 
  app.post("/login", function (req, res) {
    var submittedCredential = req.body;
    // comparing client submitted credentials with that of DB
    db.UserM.findOne({
      where: {
        email: submittedCredential.email
      }
    }).then(function (email) {
      // If email is valid
      if (email) {
        db.UserM.findOne({
          where: {
            password: submittedCredential.password
          }
        }).then(function (password) {
          // If password is valid too
          if (password) {
            res.send("success");

          } else res.send("password faild"); // No password
        });

      } else res.send("email failed"); // No such an email
    });

  });

  // Creating a user: user sign up
  app.post("/create-user", function (req, res) {
    var newUser = req.body;
    db.UserM.create(newUser).then(function (results) {
      res.json(results);
    });
  });

  // creating an event
  app.post("/create-event", function (req, res) {
    var newEvent = req.body;
    db.EventM.create(newEvent).then(function (addedEvent) {
      res.json(addedEvent);
    });
  });

  // Grab all user's events from DB and send them back to the user
  app.get("/api/my-events", function (req, res) {
    var query = {};
    if (req.query.user_id) {
      query.UserMId = req.query.user_id;
    }
    db.EventM.findAll({
      where: query,
      include: [db.UserM]
    }).then(function (allEvents) {
      res.json(allEvents);
    });
  });

  // Grab all events from DB
  app.get("/api/all-events", function (req, res) {
    // code to grab all events based on zipcode or city name
    var query = {};
    if (req.query.loc) {
      query.city = req.query.loc;
    }

    db.EventM.findAll({
      where: query
    }).then(function (allEvents) {
      res.json(allEvents);
    });
  });

  // Delete a specific user's post
  app.delete("/api/delete-event/:id", function (req, res) {
    db.EventM.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (allEvents) {
      res.json(allEvents);
    });
  });

};