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

loadRooms();
function loadRooms() {
    $.ajax({
        url:"../../controller/manageRooms.php",
        type:"GET",
        data:{action:"getRooms"},
        success:function(data)  {
            let r = JSON.parse(data);
            if(r.length == 0) {
                $("#rooms").append('<tr><td colspan="8">NO DATA AVAILABLE</td></tr>');
                return;
            }

            r.forEach(e => {
                let actions = `
                <div class="actionBtns">
                <button class="editBtn" data-id="${e.roomID}">EDIT</button>
                <button class="deleteBtn" data-id="${e.roomID}">DELETE</button>
                </div>
                `;

                let table = `
                    <tr>
                        <td>${e.roomID}</td>
                        <td>${e.roomNo}</td>
                        <td>${e.typeName}</td>
                        <td>${e.floor}</td>
                        <td>${e.pricePerNight}</td>
                        <td>${e.maxOccupancy}</td>
                        <td>${e.status}</td>
                        <td>${actions}</td>
                    </tr>
                `;
                $("#rooms").append(table);
            });
        }
    })
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
    let roomID = $(this).data("id");
    $.ajax({
        url:"../../controller/manageRooms.php",
        type:"GET",
        data:{
            action:"getRoomStatus",
            roomID:roomID
        },
        success:function(data) {
            let d = JSON.parse(data);

            $("#editRoomID").val(d.roomID);
            $("#editModal").css("display", "flex");
        }
    });
});

$(document).on("click", "#editModal .close", function() {
    $("#editModal").fadeOut(200); 
});

$(document).on("click", "#saveEditBtn", function() {
    
    let roomID = $("#editRoomID").val();
    let status = $("#editStatus").val();

    $.ajax({
        url:"../../controller/manageRooms.php",
        type:"POST",
        data:{
            action:"updateRoom",
            roomID:roomID,
            status:status
        },
        success:function(data) {
            let d = JSON.parse(data);

            if(d.success) {
                alert("Room Updated.");
                $("#editModal").fadeOut(250);
                $("#rooms").empty();
                loadRooms();
            } else {
                alert(d.hint);
            }
        }
    });
});

$(document).on("click", ".deleteBtn", function() {
    if(!confirm("Delete this room?")) {
        return;
    }

    let roomID = $(this).data("id");
    $.ajax({
        url:"../../controller/manageRooms.php",
        type:"POST",
        data:{
            action:"delRoom",
            roomID:roomID
        },
        success:function(data){
            let d = JSON.parse(data);
            if(d.success) {
                alert("Room Deleted");
                $("#rooms").empty();
                loadRooms();
            } else {
                alert(d.hint);
            }
        }
    })
});

$(document).on("click", "#addBtn", function() {
    $("#addModal").css("display", "flex");
});

$(document).on("click", "#addModal .close", function(){
    $("#addModal").fadeOut(150);
});

$(document).on("click", "#saveAddBtn", function(){
    let roomID = $("#addRoomID").val();
    let roomNo = $("#addRoomNo").val();
    let roomTypeID = $("#addRoomTypeID").val();
    let floor = $("#addFloor").val();
    let status = $("#addStatus").val();

    $.ajax({
        url:"../../controller/manageRooms.php",
        type:"POST",
        data:{
            action:"addRoom",
            roomID:roomID,
            roomNo:roomNo,
            roomTypeID:roomTypeID,
            floor:floor,
            status:status
        },
        success:function(data) {
            alert("Room added");
            $("#addModal").fadeOut(150);
            $("#rooms").empty();
            loadRooms();
        }
    });
});