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

    // updating the links in the navbar once page is loaded 
    var url = window.location.search;

    if (url.indexOf("?user_id=") !== -1) var userId = url.split("=")[1];

    var href;

    href = "/my-events?user_id=" + userId;
    $("#my-events-link").attr("href", href);

    href = "/create-event?user_id=" + userId;
    $("#create-event-link").attr("href", href);

    href = "/all-events?user_id=" + userId;
    $("#all-events-link").attr("href", href);

    // Hiding the table first
    $("#table-wrapper").hide();

    // Search button handler
    $("#search").on("click", function (e) {
        e.preventDefault();

        var loc = $("#search-box").val().trim();
        // Grabbing all events from DB
        getAllEvents(loc);
    });


    function getAllEvents(loc) {
        var locParam = "?loc=" + loc;
        $.get("/api/all-events" + locParam, function (allEvents) {

            for (var i = 0; i < allEvents.length; i++) {
                geocodeAddress(allEvents[i].city);
            }

            $("#table-wrapper tbody").empty();
            displayTable(allEvents);
            $("#table-wrapper").show();
        });
    }

    // Code to add events into the page in a tabular formats
    function displayTable(allEvents) {
        tb = "<tbody>";
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
            // tr += "<td>" + allEvents[i].UserM.firstName + "</td>";
            // tr += "<td>" + '<a href="http://www.google.com">Delete</a>' + "</td>";
            // tr += "<td>" + '<a href="http://www.google.com">Modify</a>' + "</td>";
            tr += "</tr>";

            tb += tr;

        }
        tb += "</tbody>";
        $("#my-table").append(tb);
    }

});