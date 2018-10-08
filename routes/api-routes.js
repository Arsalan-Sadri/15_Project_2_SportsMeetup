var db = require("../models");

module.exports = function (app) {

  // Grabbing user's events from DB and send it back to the client



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

  // creating a user
  app.post("/create-user", function (req, res) {
    var newUser = req.body;

    db.UserM.create(newUser).then(function (results) {
      res.json(results);
    });
  });

  // creating an event
  app.post("/create-event", function (req, res) {
    var newEvent = req.body;
    console.log("new event::: " + newEvent);
    db.EventM.create(newEvent).then(function (addedEvent) {
      res.json(addedEvent);
    });
  });
};