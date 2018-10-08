$(document).ready(function () {

  // Upon loading populate the page with information associated with the user
  // extracting user_id from the URL in the th browser address bar
  var url = window.location.search;

  var userId;
  if (url.indexOf("?user_id=") !== -1) userId = url.split("=")[1];

  var href = "/my-events?user_id=" + userId;
  $("#my-events-link").attr("href", href);
  href = "/create-event?user_id=" + userId;
  $("#create-event-link").attr("href", href);
  getEvents(userId);

  // Get all the user's events from the DB and have them added to the page
  function getEvents(userId) {
    // userId = userId || "";
    // if (userId) {
    //   userIdParam = "?user_id=" + userId;
    // }

    var userIdParam = "?user_id=" + userId;
    $.get("/api/my-events" + userIdParam, function (allEvents) {
      $("#body-wrapper1").empty();
      for (var i = 0; i < allEvents.length; i++) {
        $("#body-wrapper1").append(allEvents[i].name);
        $("#body-wrapper1").append(allEvents[i].description);
        $("#body-wrapper1").append(allEvents[i].category);
      }

    });
  }


});