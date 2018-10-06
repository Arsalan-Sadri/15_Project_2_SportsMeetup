var db = require("../models");

module.exports = function (app) {

  // creating new event
  app.post("/create-event", function (req, res) {
    var event = req.body;
    console.log(event);

    db.EventM.create(event).then(function (results) {
      // res.sendFile(path.join(__dirname, "../public/html/event.html"));
    });
  });
};