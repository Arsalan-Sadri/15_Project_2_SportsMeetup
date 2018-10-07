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
    var event = req.body;
    console.log(event);

    db.EventM.create(event).then(function (results) {
      // res.sendFile(path.join(__dirname, "../public/html/event.html"));
    });
  });
};