$(document).ready(function () {

    $("#submit").on("click", function (event) {
        event.preventDefault();
        var newEvent = {
            name: $("#event-name").val().trim(),
            description: $("#description").val().trim(),
            streetAdd: $("#street-add").val().trim(),
            city: $("#city").val().trim(),
            state: $("#state").val().trim(),
            zipCode: $("#zip-code").val().trim(),
            category: $("#category").val().trim(),
            spots: $("#spots").val().trim()
        };

        // extracting user_id from the URL in the th browser address bar
        var url = window.location.search;
        if (url.indexOf("?user_id=") !== -1) var userId = url.split("=")[1];
        // 
        newEvent.UserMId = userId;

        $.post("/create-event", newEvent)
            .then(function (data) {
                // window.location.href = "https://www.google.com/";
            });
    });

});