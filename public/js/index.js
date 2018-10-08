$(document).ready(function () {

    // code to handle user login
    $("#login-btn").on("click", function (event) {
        event.preventDefault();
        var userCredential = {
            email: $("#login-email").val().trim(),
            password: $("#login-password").val().trim()
        };
        $.post("/login", userCredential)
            .then(function (data) {

            });
    });


    // code to get the user signed up
    $("#signup-btn").on("click", function (event) {
        event.preventDefault();
        var user = {
            firstName: $("#first-name").val().trim(),
            lastName: $("#last-name").val().trim(),
            email: $("#signup-email").val().trim(),
            password: $("#signup-password").val().trim()
        };

        $.post("/create-user", user)
            .then(function (newUser) {
                $("#body-wrapper").empty();
                $("#body-wrapper").append("<h3> Congratulations!</h3>");
                // $("#body-wrapper").append("<h3> Your account has successfully been created. </h3>");
                $("h3").css("position", "absolute");
                $("h3").css("text-align", "center");
                $("h3").css("top", "40%");
                $("h3").css("text-shadow", "1px 6px #D7D2D1");
                $("h3").css("left", "12%");
                // Write the code to add user ID into My Events link
                var href = "/my-events?user_id=" + newUser.id;
                $("#my-events-link").attr("href", href);
                href = "/create-event?user_id=" + newUser.id;
                $("#create-event-link").attr("href", href);
            });
    });

});