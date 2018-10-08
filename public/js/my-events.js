var map;

function initMap() {
  map = new google.maps.Map(document.getElementById('mapDiv'), {
    zoom: 11,
    center: {
      lat: 33.684566,
      lng: -117.826508
    }
  });
}

function geocodeAddress(address) {
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({
    'address': address
  }, function (results, status) {
    if (status === 'OK') {
      // .geometry.location property contains a LatLng object, refering the place 
      // we searched for. Retrieve it and assign it to the map's center 
      map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}


$(document).ready(function () {

  // Upon loading the page, updating the links with information associated with the user
  var url = window.location.search;
  var userId;
  if (url.indexOf("?user_id=") !== -1) userId = url.split("=")[1];
  if (url.indexOf("?event_id=") !== -1) eventId = url.split("=")[1];

  var href;

  if (userId) {
    href = "/my-events?user_id=" + userId;
    $("#my-events-link").attr("href", href);

    href = "/create-event?user_id=" + userId;
    $("#create-event-link").attr("href", href);

    href = "/all-events?user_id=" + userId;
    $("#all-events-link").attr("href", href);

    // Grabbing all events from DB
    getUserEvents(userId);
  }

  if (eventId) {

    deleteEvent(eventId);
  }

  function deleteEvent(eventId) {

    $.ajax({
        method: "DELETE",
        url: "/api/delete-event/" + eventId
      })
      .then(function () {
        getUserEvents(userId)
      });
  }


  function getUserEvents(userId) {
    // userId = userId || "";
    // if (userId) {
    //   userIdParam = "?user_id=" + userId;
    // }

    var userIdParam = "?user_id=" + userId;
    $.get("/api/my-events" + userIdParam, function (allEvents) {

      for (var i = 0; i < allEvents.length; i++) {
        geocodeAddress(allEvents[i].city);
      }

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
      tr += "<td>" + "<a href=" + "/delete-event?event_id=" + allEvents[i].id + "&user_id=" + allEvents[i].UserM.id + ">Delete</a>" + "</td>";
      tr += "<td>" + '<a href="/modify-event?event_id="' + allEvents[i].id + '>Modify</a>' + "</td>";
      tr += "</tr>";

      $("#my-table").append(tr);
    }
  }

  function initMap() {
    var map = new google.maps.Map(document.getElementById('mapDiv'), {
      zoom: 13,
      center: {
        lat: 33.684566,
        lng: -117.826508
      }
    });
    var geocoder = new google.maps.Geocoder();

    document.getElementById('submit').addEventListener('click', function () {
      geocodeAddress(geocoder, map);
    });
  }

});