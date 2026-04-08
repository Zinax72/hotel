$.ajax({
    url:"../../controller/checkSession.php",
    type:"GET",
    dataType:"JSON",
    success:function(data){ 
        if(data.role == "RECEPTIONIST") {
            $(".managerOnly").hide();
            $(".adminOnly").hide();
        } else if (data.role == "MANAGER") {
            $(".adminOnly").hide();
        }
    }
});

loadUsers();
function loadUsers() {
    $.ajax({
        url:"../../controller/manageUsers.php",
        type:"GET",
        data:{action:"getUsers"},
        success:function(data) {
            let u = JSON.parse(data);
            if (u.length == 0) {
                $("#emptyTable").html('<p>No Users Found.</p>');
                return;
            }

            u.forEach(e=>{
                let actions = `
                <div class="actionBtns">
                <button class="editBtn" data-id="${e.userID}">EDIT</button>
                <button class="deleteBtn" data-id="${e.userID}">DELETE</button>
                <button class="resetBtn" data-id="${e.userID}">RESET PASSWORD</button>
                </div>
                `;

                let table = `
                    <tr>
                        <td>${e.userID}</td>
                        <td>${e.firstName}</td>
                        <td>${e.lastName}</td>
                        <td>${e.email}</td>
                        <td>${e.contactNo}</td>
                        <td>${e.role}</td>
                        <td>${actions}</td>
                    </tr>
                `;
                $("#users").append(table);
            });
        }
    });
}

$("#logoutBtn").click(function(){
    $.ajax({
        url:"../../controller/authControl.php",
        type:"POST",
        data:{
            action:"logoutUser"
        },
        success:function(data) {
            window.location.href = "../login.html"
        }
    })
});

$(document).on("click", ".editBtn", function(){
    let userID = $(this).data("id");
    $.ajax({
        url:"../../controller/manageUsers.php",
        type:"GET",
        data:{
            action:"getUserDetails",
            userID:userID
        },
        success:function(data) {
            let d = JSON.parse(data);

            $("#editUserID").val(d.userID);
            $("#editFirstName").val(d.firstName);
            $("#editLastName").val(d.lastName);
            $("#editEmail").val(d.email);
            $("#editContactNo").val(d.contactNo);
            $("#editRole").val(d.role);

            $("#editModal").css("display", "flex");
        }
    });
});

$(document).on("click", "#editModal .close", function() {
    $("#editModal").fadeOut(200); 
});

$(document).on("click", "#saveEditBtn", function() {

    let userID = $("#editUserID").val();
    let firstName = $("#editFirstName").val();
    let lastName = $("#editLastName").val();
    let email = $("#editEmail").val();
    let contactNo = $("#editContactNo").val();
    let role = $("#editRole").val();

    $.ajax({
        url:"../../controller/manageUsers.php",
        type:"POST",
        data:{
            action:"updateUser",
            userID:userID,
            firstName:firstName,
            lastName:lastName,
            email:email,
            contactNo:contactNo,
            role:role
        },
        success:function(data) {
            let d = JSON.parse(data);

            if(d.success) {
                alert("User Updated.");
                $("#editModal").fadeOut(250);
                $("#users").empty();
                loadUsers();
            } else {
                alert(d.hint);
            }
        }
    });
});

$(document).on("click", ".deleteBtn", function() {
    if(!confirm("Delete this user?")) {
        return;
    }

    let userID = $(this).data("id");
    $.ajax({
        url:"../../controller/manageUsers.php",
        type:"POST",
        data:{
            action:"delUser",
            userID:userID
        },
        success:function(data){
            let d = JSON.parse(data);
            if(d.success) {
                alert("User Deleted");
                $("#users").empty();
                loadUsers();
            } else {
                alert(d.hint);
            }
        }
    })
});

$(document).on("click", ".resetBtn", function(){
    let userID = $(this).data("id");
    $("#passUserID").val(userID);
    $("#resetModal").css("display", "flex");
});

$(document).on("click", "#resetModal .close", function(){
    $("#resetModal").fadeOut(150);
});

$(document).on("click", "#saveResetBtn", function() {
    let userID = $("#passUserID").val();
    let newPassword = $("#newPassword").val();

    $.ajax({
        url:"../../controller/manageUsers.php",
        type:"POST",
        data:{
            action:"resetPass",
            userID:userID,
            newPassword:newPassword
        },
        success:function(data) {
            let d = JSON.parse(data);

            if(d.success) {
                alert("Reset successful");
                $("#resetModal").fadeOut(150);
                $("#users").empty();
                loadUsers();
            } else {
                alert(d.hint);
            }
        }
    });
});


$(document).on("click", "#addBtn", function() {
    $("#addModal").css("display", "flex");
});

$(document).on("click", "#addModal .close", function(){
    $("#addModal").fadeOut(150);
});

$(document).on("click", "#saveAddBtn", function(){
    let userID = $("#addUserID").val();
    let firstName = $("#addFirstName").val();
    let lastName = $("#addLastName").val();
    let email = $("#addEmail").val();
    let contactNo = $("#addContactNo").val();
    let role = $("#addRole").val();  
    
    $.ajax({
        url:"../../controller/manageUsers.php",
        type:"POST",
        data:{
            action:"addUsers",
            userID:userID,
            firstName:firstName,
            lastName:lastName,
            email:email,
            contactNo:contactNo,
            role:role
        },
        success:function(data) {
            let d = JSON.parse(data);

            if(d.success) {
                alert("User added");
                $("#addModal").fadeOut(150);
                $("#users").empty();
                loadUsers();
            } else {
                alert(d.hint);
            }
        }
    });
}); 