$.ajax({
    url:"../../controller/checkSession.php",
    type:"GET",
    dataType:"JSON",
    success:function(data){ 
        if(data.role == "RECEPTIONIST") {
            $(".managerOnly").hide();
            $(".adminOnly").hide();
        } else if (data.role == "MANAGER") {
            $(".adminonly").hide();
        }
    }
});

let showingArchives = false;

$("#switchBtn").text("ARCHIVES").show();
$("#tableName").text("RESERVATIONS");

loadReservations();

$("#switchBtn").click(function(){
    if(!showingArchives) {
        // switch to archives
        showingArchives = true;
        $("#tableName").text("ARCHIVES");
        $("#switchBtn").text("RESERVATIONS");
        $("#reservations").empty();
        loadArchives();
    } else {
        // switch back to reservations
        showingArchives = false;
        $("#tableName").text("RESERVATIONS");
        $("#switchBtn").text("ARCHIVES");
        $("#reservations").empty();
        loadReservations();
    }
});

$("#editModal").hide();

function loadReservations() {
    $.ajax({
        url:"../../controller/manageReservations.php",
        type:"GET",
        data:{action:"getAllRes"},
        success:function(data){
            let res = JSON.parse(data);
            if(res.length == 0) {
                $("#emptyTable").html('<p>No reservations found.</p>');
                return;
            }

            res.forEach(e=>{
                let pet = e.hasPet == 1 ? "YES" : "NO";
                let discount = e.discountType ? e.discountType : "NONE";
                
                let actions = '';
                if (e.status == "PENDING") {
                    actions = `
                    <div class="actionBtns">
                    <button class="approveBtn" data-id="${e.resID}">Approve</button>
                    <button class="cancelBtn" data-id="${e.resID}">Cancel</button>
                    <button class="editBtn" data-id="${e.resID}">Edit</button>
                    <button class="deleteBtn" data-id="${e.resID}">Delete</button>
                    </div>
                    `;
                } else if (e.status == "CONFIRMED") {
                    actions = `
                    <div class="actionBtns">
                    <button class="completeBtn" data-id="${e.resID}">Complete</button>
                    <button class="cancelBtn" data-id="${e.resID}">Cancel</button>
                    <button class="editBtn" data-id="${e.resID}">Edit</button>
                    <button class="deleteBtn" data-id="${e.resID}">Delete</button>
                    </div>
                    `;
                } else {
                    actions = `
                    <div class="actionBtns">
                    <button class="deleteBtn" data-id="${e.resID}">Delete</button>
                    </div>
                    `;
                } 

                let table = `
                    <tr>
                        <td>${e.resID}</td>
                        <td>${e.firstName} ${e.lastName}</td>
                        <td>${e.roomNo}</td>
                        <td>${e.typeName}</td>
                        <td>${e.checkIn}</td>
                        <td>${e.checkOut}</td>
                        <td>${e.guestsNum}</td>
                        <td>${pet}</td>
                        <td>${discount}</td>
                        <td>${e.status}</td>
                        <td>${actions}</td>
                    </tr>
                `;
                $("#reservations").append(table);
            });
        }
    });
}

function loadArchives() {
    $.ajax({
        url:"../../controller/manageReservations.php",
        type:"GET",
        data:{
            action:"getAllArchive"
        },
        success:function(data){
            let res = JSON.parse(data);
            if(res.length == 0) {
                $("#emptyTable").html('<p>Archive Empty.</p>');
                return;
            }

            res.forEach(e=>{
                let pet = e.hasPet == 1 ? "YES" : "NO";
                let discount = e.discountType ? e.discountType : "NONE";
                
                let actions = `
                    <div class="actionBtns">
                    <button class="archiveDel" data-id="${e.archiveID}">Delete</button>
                    </div>
                `;

                let table = `
                    <tr>
                        <td>${e.resID}</td>
                        <td>${e.firstName} ${e.lastName}</td>
                        <td>${e.roomNo}</td>
                        <td>${e.typeName}</td>
                        <td>${e.checkIn}</td>
                        <td>${e.checkOut}</td>
                        <td>${e.guestsNum}</td>
                        <td>${pet}</td>
                        <td>${discount}</td>
                        <td>${e.status}</td>
                        <td>${actions}</td>
                    </tr>
                `;
                $("#reservations").append(table);
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

$("#archivesBtn").click(function(){
    $.ajax({
        url:"../../controller/manageReservations.php",
        type:"GET",
        data:{
            action:"getAllArchive"
        },
        success:function(data){
            $("#reservations").empty();
            loadArchives();
        }
    })
});

$(document).on("click", ".approveBtn", function(){
    let resID = $(this).data("id");

    $.ajax({
        url:"../../controller/manageReservations.php",
        type:"POST",
        data:{
            action:"approveRes",
            resID:resID
        },
        success:function(data) {
            let d = JSON.parse(data);
            if(d.success) {
                alert("Reservation Approved!");
                $("#reservations").empty();               
                loadReservations();
            } else {
                alert(d.hint);
            }
        }
    });
});

$(document).on("click", ".completeBtn", function(){
    let resID = $(this).data("id");

    $.ajax({
        url:"../../controller/manageReservations.php",
        type:"POST",
        data:{
            action:"completeRes",
            resID:resID
        },
        success:function(data) {
            let d = JSON.parse(data);
            if(d.success) {
                alert("Reservation Completed!");
                $("#reservations").empty();               
                loadReservations();
            } else {
                alert(d.hint);
            }
        }
    });
});

$(document).on("click", ".cancelBtn", function(){
    let resID = $(this).data("id");

    $.ajax({
        url:"../../controller/manageReservations.php",
        type:"POST",
        data:{
            action:"cancelRes",
            resID:resID
        },
        success:function(data) {
            let d = JSON.parse(data);
            if(d.success) {
                alert("Reservation Cancelled");
                $("#reservations").empty();
                loadReservations();
            } else {
                alert(d.hint);
            }
        }
    });
});

$(document).on("click", ".editBtn", function(){
    let resID = $(this).data("id");

    $.ajax({
        url:"../../controller/manageReservations.php",
        type:"GET",
        data:{
            action:"getRes",
            resID:resID
        },
        success:function(data){
            let d = JSON.parse(data);

            $("#editResID").val(d.resID);
            $("#editCheckIN").val(d.checkIn);
            $("#editCheckOUT").val(d.checkOut);
            $("#editRoomID").val(d.roomID);
            $("#editGuestsNum").val(d.guestsNum);
            $("#editHasPet").val(d.hasPet);
            $("#editDiscountID").val(d.discountID || "");
            $("#editStatus").val(d.status);

            // load rooms dropdown
            $.ajax({
                url: "../../controller/manageReservations.php",
                type: "GET",
                data:{ 
                    action:"getRooms" 
                },
                success: function(roomData) {
                    roomData = roomData.replace('null', '');
                    let rooms = JSON.parse(roomData);
                    $("#editRoomID").empty();
                    rooms.forEach(r => {
                        $("#editRoomID").append(
                            `<option value="${r.roomID}">${r.roomNo} - ${r.typeName}</option>`
                        );
                    });
                    $("#editRoomID").val(d.roomID);
                }
            });

            $("#editModal").css("display", "flex");
        }
    });
});


$(document).on("click", "#editModal .close", function(){
    $("#editModal").fadeOut(200);
});

$(document).on("click", "#saveEditBtn", function() {
    
    let resID = $("#editResID").val();
    let checkIN = $("#editCheckIN").val();
    let checkOUT = $("#editCheckOUT").val();
    let roomID = $("#editRoomID").val();
    let guestsNum = $("#editGuestsNum").val();
    let hasPet = parseInt($("#editHasPet").val()) || 0;
    let discountID = $("#editDiscountID").val();
    let status = $("#editStatus").val();

    $.ajax({
        url:"../../controller/manageReservations.php",
        type:"POST",
        data:{
            action:"updateRes",
            resID:resID,
            checkIN:checkIN,
            checkOUT:checkOUT,
            roomID:roomID,
            guestsNum:guestsNum,
            hasPet:hasPet,
            discountID:discountID,
            status:status
        },
        success:function(data) {
            let d = JSON.parse(data);

            if(d.success) {
                alert("Reservation Updated");
                $("#editModal").fadeOut(250);
                $("#reservations").empty();
                loadReservations();
            } else {
                alert(d.hint);
            }
        }
    })
});


$(document).on("click", ".deleteBtn", function(){
    if(!confirm("Are you sure you want to delete this reservation?")) {
        return;
    }

    let resID = $(this).data("id");
    $.ajax({
        url:"../../controller/manageReservations.php",
        type:"POST",
        data:{
            action:"deleteRes",
            resID:resID
        },
        success:function(data) {
            let d = JSON.parse(data);
            if(d.success) {
                alert("Reservation Deleted");
                $("#reservations").empty();                    
                loadReservations();
            } else {
                alert(d.hint);
            }
        }
    });
});

$(document).on("click", ".archiveDel", function(){
    if(!confirm("Are you sure you want to delete this reservation?")) {
        return;
    }

    let archiveID = $(this).data("id");
    $.ajax({
        url:"../../controller/manageReservations.php",
        type:"POST",
        data:{
            action:"deleteArc",
            archiveID:archiveID
        },
        success:function(data) {
            let d = JSON.parse(data);
            if(d.success) {
                alert("Reservation Deleted");
                $("#reservations").empty();                    
                loadArchives();
            } else {
                alert(d.hint);
            }
        }
    });
});

