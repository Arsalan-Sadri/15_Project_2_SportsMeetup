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
                var msgWrapper = $("<div>");
                msgWrapper.append("<h3> Congratulation! </h3>")
                msgWrapper.append("<h3> Your account has been successfully created. </h3>");
                msgWrapper.css("text-shadow", "1px 6px #D7D2D1");
                msgWrapper.css("text-align", "center");
                msgWrapper.css("position", "absolute");
                msgWrapper.css("top", "30%");
                msgWrapper.css("left", "30%");
                $("#body-wrapper").append(msgWrapper);

                // Updating navbar links after receving newly created user
                var href = "/my-events?user_id=" + newUser.id;
                $("#my-events-link").attr("href", href);
                href = "/create-event?user_id=" + newUser.id;
                $("#create-event-link").attr("href", href);
            });
    });

});