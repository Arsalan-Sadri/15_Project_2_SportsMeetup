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