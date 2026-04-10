$(function(){
    $("#hint").hide();

    if($("#registerForm").length) {
        $("#registerForm").submit(function(e){
            e.preventDefault();
            let firstName = $("#firstName").val();
            let lastName = $("#lastName").val();
            let email = $("#email").val();
            let password = $("#password").val();
            let confirmPass = $("#confirmPass").val();
            let contact = $("#contact").val();

            $.ajax({
                url:"../controller/authControl.php",
                type:"POST",
                dataType:"JSON",
                data:{
                    action:"registerUser",
                    firstName:firstName,
                    lastName:lastName,
                    email:email,
                    password:password,
                    confirmPass:confirmPass,
                    contact:contact
                },
                success:function(data){
                    if(data.success){
                        alert("WOW REGISTERED NA SIYA");
                        window.location.href="login.html?registered=true"
                    } else {
                        $("#hint").text(data.hint).show();
                    }
                }
            });
        });
    }

    if($("#forgotPass").length) {
        $("#forgotPass").submit(function(e){
            e.preventDefault();

            let email = $("#email").val();
            let oldPassword = $("#oldPassword").val();
            let newPassword = $("#newPassword").val();
            let confirmNewPassword = $("#confirmNewPassword").val();

            $.ajax({
                url:"../controller/authControl.php",
                type:"POST",
                dataType:"JSON",
                data:{
                    action:"forgotPass",
                    email:email,
                    oldPassword:oldPassword,
                    newPassword:newPassword,
                    confirmNewPassword:confirmNewPassword
                },
                success:function(data){
                    if(data.success) {
                        $("#hint").text("Password changed successfully!").show();
                        setTimeout(function() {
                            if(data.role == "ADMIN" || data.role == "MANAGER" || data.role == "RECEPTIONIST") {
                                window.location.href = "../view/staff/dashboard.html";
                            } else {
                                window.location.href = "../view/guest/home.html";
                            }
                        }, 1000);
                    } else {
                        $("#hint").text(data.hint).show();
                    }
                }
            });
        });
    }

    if($("#loginForm").length) {
        $("#loginForm").submit(function(e){
            e.preventDefault();

            let email = $("#email").val();
            let password = $("#password").val();

            $.ajax({
                url:"../controller/authControl.php",
                type:"POST",
                dataType:"JSON",
                data:{
                    action:"loginUser",
                    email:email,
                    password:password
                },
                success:function(data){         
                    if(data.success){
                        $("#hint").text("Logged in successfully!").fadeIn(750).css("color", "green");
                        setTimeout(function() {
                            if(data.role == "ADMIN" || data.role == "MANAGER" || data.role == "RECEPTIONIST") {
                                window.location.href = "../view/staff/dashboard.html";
                            } else {
                                window.location.href = "../view/guest/home.html";
                            }
                        }, 1000);
                    } else {
                        $("#hint").text(data.hint).show();
                    }
                }
            });
        });
    }

    $(function(){
        let param = new URLSearchParams(window.location.search);
        if(param.get("registered") == "true") {
            $("#hint").text("Registration successful. Please log in.").css("color", "black");
        }
    });
})

