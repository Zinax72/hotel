$.ajax({
    url: "../../controller/checkSession.php",
    type: "GET",
    dataType: "JSON",
    success: function(data) {
        if (data.loggedIN) {
            $("#userName").text(data.firstName + ' ' + data.lastName);
            $("#currentEmail").val(data.email);
        } else {
            window.location.href = "../login.html";
        }
    }
});

// Update Email
$("#updateEmailBtn").click(function() {
    let newEmail    = $("#newEmail").val().trim();
    let password    = $("#emailPassword").val().trim();
    let $msg        = $("#emailMsg");

    if (!newEmail || !password) {
        $msg.removeClass("success").addClass("error").text("All fields are required.");
        return;
    }

    $.ajax({
        url: "../../controller/settings.php",
        type: "POST",
        dataType: "JSON",
        data: { action: "updateEmail", newEmail, password },
        success: function(res) {
            if (res.success) {
                $msg.removeClass("error").addClass("success").text("Email updated successfully.");
                $("#currentEmail").val(newEmail);
                $("#newEmail").val("");
                $("#emailPassword").val("");
            } else {
                $msg.removeClass("success").addClass("error").text(res.hint);
            }
        }
    });
});

// Update Password
$("#updatePasswordBtn").click(function() {
    let currentPassword = $("#currentPassword").val().trim();
    let newPassword     = $("#newPassword").val().trim();
    let confirmPassword = $("#confirmPassword").val().trim();
    let $msg            = $("#passwordMsg");

    if (!currentPassword || !newPassword || !confirmPassword) {
        $msg.removeClass("success").addClass("error").text("All fields are required.");
        return;
    }

    if (newPassword !== confirmPassword) {
        $msg.removeClass("success").addClass("error").text("New passwords do not match.");
        return;
    }

    if (newPassword.length < 8) {
        $msg.removeClass("success").addClass("error").text("Password must be at least 8 characters.");
        return;
    }

    $.ajax({
        url: "../../controller/settings.php",
        type: "POST",
        dataType: "JSON",
        data: { action: "updatePassword", currentPassword, newPassword },
        success: function(res) {
            if (res.success) {
                $msg.removeClass("error").addClass("success").text("Password updated successfully.");
                $("#currentPassword, #newPassword, #confirmPassword").val("");
            } else {
                $msg.removeClass("success").addClass("error").text(res.hint);
            }
        }
    });
});