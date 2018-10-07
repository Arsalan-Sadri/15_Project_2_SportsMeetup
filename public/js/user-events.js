$(document).ready(function () {

  // code to grab all already-created user's events from DB and update the empty html page
  var url = window.location.search;

  var userId;
  var allEvents;

  if (url.indexOf("?user_id=") !== -1) {
    userId = url.split("=")[1];
    getEvents(userId);
  }

  // Function to grab all events and display them into an already loaded empty html page 
  function getEvents(userId) {
    userId = userId || "";
    if (userId) {
      userId = "/?author_id=" + userId;
    }
    $.get("/api/posts" + userId, function (data) {

      allEvents = data;
      if (!allEvents || !allEvents.length) {
        displayEmpty(userId);
      } else {
        initializeRows();
      }
    });
  }
});