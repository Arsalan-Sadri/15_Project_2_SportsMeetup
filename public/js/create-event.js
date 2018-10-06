$(document).ready(function () {

    $("#submit").on("click", function (event) {
        event.preventDefault();
        var newEvent = {
            // firstName: $("#first-name").val().trim(),
            // lastName: $("#last-name").val().trim(),
            // email: $("#email").val().trim(),
            name: $("#event-name").val().trim(),
            description: $("#description").val().trim(),
            streetAdd: $("#street-add").val().trim(),
            city: $("#city").val().trim(),
            state: $("#state").val().trim(),
            zipCode: $("#zip-code").val().trim(),
            category: $("#category").val().trim(),
            spots: $("#spots").val().trim()
        };

        $.post("/create-event", newEvent)
            .then(function (data) {

            });
    });

});