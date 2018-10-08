var db = require("../models");

module.exports = function (app) {

  // User log ins 
  app.post("/login", function (req, res) {
    var submittedCredential = req.body;
    // comparing client submitted credentials with that of DB
    db.UserM.findOne({
      where: {
        id: submittedCredential.email
      }
    }).then(function (test) {
      res.json(test);
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

};