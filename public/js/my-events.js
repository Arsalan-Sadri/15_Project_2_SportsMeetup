$(document).ready(function () {

  //
  var bodyWrapper = $("#body-wrapper1");
  // var allEvents;

  // Upon loading the page, updating the links with information associated with the user
  var url = window.location.search;
  var userId;
  if (url.indexOf("?user_id=") !== -1) userId = url.split("=")[1];
  var href = "/my-events?user_id=" + userId;
  $("#my-events-link").attr("href", href);
  href = "/create-event?user_id=" + userId;
  $("#create-event-link").attr("href", href);

  // Grabbing all events from DB
  getEvents(userId);

  function getEvents(userId) {
    // userId = userId || "";
    // if (userId) {
    //   userIdParam = "?user_id=" + userId;
    // }

    var userIdParam = "?user_id=" + userId;
    $.get("/api/my-events" + userIdParam, function (allEvents) {
      // Code to add events into the page in a tabular formats
      // allEvents = dbEvents;
      // displayTable();


      bodyWrapper.empty();
      for (var i = 0; i < allEvents.length; i++) {
        bodyWrapper.append(allEvents[i].name);
        bodyWrapper.append($("<br>"));
        bodyWrapper.append(allEvents[i].description);
        bodyWrapper.append($("<br>"));
        bodyWrapper.append(allEvents[i].category);
        bodyWrapper.append($("<br>"));
        bodyWrapper.append(allEvents[i].streetAdd);
        bodyWrapper.append($("<br>"));
        bodyWrapper.append(allEvents[i].city);
        bodyWrapper.append($("<br>"));
        bodyWrapper.append(allEvents[i].zipCode);
        bodyWrapper.append($("<br>"));
        bodyWrapper.append(allEvents[i].spots);
        bodyWrapper.append($("<br>"));
        bodyWrapper.append(allEvents[i].state);
        bodyWrapper.append($("<br>"));
        bodyWrapper.append(allEvents[i].UserM.firstName);
      }


    });
  }

  function displayTable() {
    bodyWrapper.empty();
    var eventsArr = [];
    for (var i = 0; i < allEvents.length; i++) {
      eventsArr.push(createNewRow(allEvents[i]));
    }
    bodyWrapper.append(eventsArr);
  }

  // This function constructs a post's HTML
  function createNewRow(post) {
    var formattedDate = new Date(post.createdAt);
    formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    var newPostCard = $("<div>");
    newPostCard.addClass("card");
    var newPostCardHeading = $("<div>");
    newPostCardHeading.addClass("card-header");
    var deleteBtn = $("<button>");
    deleteBtn.text("x");
    deleteBtn.addClass("delete btn btn-danger");
    var editBtn = $("<button>");
    editBtn.text("EDIT");
    editBtn.addClass("edit btn btn-info");
    var newPostTitle = $("<h2>");
    var newPostDate = $("<small>");
    var newPostAuthor = $("<h5>");
    newPostAuthor.text("Written by: " + post.Author.name);
    newPostAuthor.css({
      float: "right",
      color: "blue",
      "margin-top": "-10px"
    });
    var newPostCardBody = $("<div>");
    newPostCardBody.addClass("card-body");
    var newPostBody = $("<p>");
    newPostTitle.text(post.title + " ");
    newPostBody.text(post.body);
    newPostDate.text(formattedDate);
    newPostTitle.append(newPostDate);
    newPostCardHeading.append(deleteBtn);
    newPostCardHeading.append(editBtn);
    newPostCardHeading.append(newPostTitle);
    newPostCardHeading.append(newPostAuthor);
    newPostCardBody.append(newPostBody);
    newPostCard.append(newPostCardHeading);
    newPostCard.append(newPostCardBody);
    newPostCard.data("post", post);
    return newPostCard;
  }

});