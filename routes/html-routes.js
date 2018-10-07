var path = require("path");


// Routes
// =============================================================
module.exports = function (app) {

  app.get("/user-events", function () {
    res.sendFile(path.join(__dirname, "../public/html/user-events.html"));
  });

  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/html/index.html"));
  });

  app.get("/create-event", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/html/create-event.html"));
  });
};