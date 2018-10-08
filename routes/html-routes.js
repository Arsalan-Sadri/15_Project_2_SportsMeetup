var path = require("path");


// Routes
// =============================================================
module.exports = function (app) {

  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/html/index.html"));
  });

  app.get("/create-event", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/html/create-event.html"));
  });

  app.get("/my-events", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/html/my-events.html"));
  });

  app.get("/all-events", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/html/all-events.html"));
  })

};