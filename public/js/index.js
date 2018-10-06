$(document).ready(function () {

    $("#sign-upBtn").on("click", function (event) {
        event.preventDefault();
        var user = {
            firstName: $("#first-name").val().trim(),
            lastName: $("#last-name").val().trim(),
            email: $("#email-signup").val().trim(),
            password: $("#password-signup").val().trim()
        };

        $.post("/create-user", user)
            .then(function (data) {});
    });

});