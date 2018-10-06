var path = require("path");


// Routes
// =============================================================
module.exports = function (app) {

  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/html/index.html"));
  });

  app.get("/create-event", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/html/event-signup.html"));
  });

};