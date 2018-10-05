var EventM = require("../models/event-model");

module.exports = function (app) {

  // creating new event
  app.post("/create-event", function (req, res) {
    var event = req.body;
    console.log(event);
    EventM.create(event).then(function (results) {
      res.end();
    });
  });


};