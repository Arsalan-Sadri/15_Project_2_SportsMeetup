// Dependencies
// =============================================================

// This may be confusing but here Sequelize (capital) references the standard library
var Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
var database = require("../config/connection.js");


var EventM = database.define("event", {
    name: Sequelize.STRING,
    description: Sequelize.STRING,
    streetAdd: Sequelize.STRING,
    city: Sequelize.STRING,
    state: Sequelize.STRING,
    zipCode: Sequelize.INTEGER,
    category: Sequelize.STRING,
    spots: Sequelize.INTEGER
});

// Syncs with DB
EventM.sync();

// Makes the Chirp Model available for other files (will also create a table)
module.exports = EventM;