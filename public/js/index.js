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
                switch (data) {
                    case "email failed":
                        $("#body-wrapper").empty();
                        var msgWrapper = $("<div>");
                        msgWrapper.append("<h3> No such an email! </h3>")
                        msgWrapper.append("<h3> Please try again later </h3>");
                        msgWrapper.css("text-shadow", "1px 6px #D7D2D1");
                        msgWrapper.css("text-align", "center");
                        msgWrapper.css("position", "absolute");
                        msgWrapper.css("top", "30%");
                        msgWrapper.css("left", "30%");
                        $("#body-wrapper").append(msgWrapper);
                        break;
                    case "password faild":
                        $("#body-wrapper").empty();
                        var msgWrapper = $("<div>");
                        msgWrapper.append("<h3> No such a password! </h3>")
                        msgWrapper.append("<h3> Please try again later </h3>");
                        msgWrapper.css("text-shadow", "1px 6px #D7D2D1");
                        msgWrapper.css("text-align", "center");
                        msgWrapper.css("position", "absolute");
                        msgWrapper.css("top", "30%");
                        msgWrapper.css("left", "30%");
                        $("#body-wrapper").append(msgWrapper);
                        break;
                    case "success":
                        $("#body-wrapper").empty();
                        var msgWrapper = $("<div>");
                        msgWrapper.append("<h3> Login successful! </h3>");
                        msgWrapper.css("text-shadow", "1px 6px #D7D2D1");
                        msgWrapper.css("text-align", "center");
                        msgWrapper.css("position", "absolute");
                        msgWrapper.css("top", "30%");
                        msgWrapper.css("left", "30%");
                        $("#body-wrapper").append(msgWrapper);
                        break;
                }
            });
    });


    // Code to handle user signup
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

                // Updating navbar links after sign up and having received the newly-created user from the server
                var href;

                href = "/my-events?user_id=" + newUser.id;
                $("#my-events-link").attr("href", href);

                href = "/create-event?user_id=" + newUser.id;
                $("#create-event-link").attr("href", href);

                href = "/all-events?user_id=" + newUser.id;
                $("#all-events-link").attr("href", href);

            });
    });

});