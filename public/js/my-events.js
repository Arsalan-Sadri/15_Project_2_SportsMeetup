$(document).ready(function () {

  // Upon loading the page, updating the links with information associated with the user
  var url = window.location.search;
  var userId;
  if (url.indexOf("?user_id=") !== -1) userId = url.split("=")[1];

  var href;

  href = "/my-events?user_id=" + userId;
  $("#my-events-link").attr("href", href);

  href = "/create-event?user_id=" + userId;
  $("#create-event-link").attr("href", href);

  href = "/all-events?user_id=" + userId;
  $("#all-events-link").attr("href", href);

  // Grabbing all events from DB
  getUserEvents(userId);

  function getUserEvents(userId) {
    // userId = userId || "";
    // if (userId) {
    //   userIdParam = "?user_id=" + userId;
    // }

    var userIdParam = "?user_id=" + userId;
    $.get("/api/my-events" + userIdParam, function (allEvents) {
      displayTable(allEvents);
    });
  }

  // Code to add events into the page in a tabular formats
  function displayTable(allEvents) {
    for (var i = 0; i < allEvents.length; i++) {

      var tr = "<tr>";
      tr += "<td>" + allEvents[i].name + "</td>";
      tr += "<td>" + allEvents[i].description + "</td>";
      tr += "<td>" + allEvents[i].category + "</td>";
      tr += "<td>" + allEvents[i].spots + "</td>";
      tr += "<td>" + allEvents[i].streetAdd + "</td>";
      tr += "<td>" + allEvents[i].city + "</td>";
      tr += "<td>" + allEvents[i].state + "</td>";
      tr += "<td>" + allEvents[i].zipCode + "</td>";
      tr += "<td>" + allEvents[i].UserM.firstName + "</td>";
      tr += "<td>" + '<a href="http://www.google.com">Delete</a>' + "</td>";
      tr += "<td>" + '<a href="http://www.google.com">Modify</a>' + "</td>";
      tr += "</tr>";

      $("#my-table").append(tr);
    }
  }

});