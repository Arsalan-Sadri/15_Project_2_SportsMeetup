var db = require("../models");

module.exports = function (app) {

  // creating a user
  app.post("/create-user", function (req, res) {
    var user = req.body;
    console.log(user);

    db.UserM.create(user).then(function (results) {
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