$(function(){
    loadRooms();

    // adults
    $("#plusAdult").click(function(){
        let count = parseInt($("#adultCount").text());
        $("#adultCount").text(count + 1);
    });

    $("#minusAdult").click(function(){
        let count = parseInt($("#adultCount").text());
        if (count > 1) {
            $("#adultCount").text(count - 1);
        }
    });

    // children
    $("#plusChild").click(function(){
        let count = parseInt($("#childCount").text());
        $("#childCount").text(count + 1);
    });

    $("#minusChild").click(function(){
        let count = parseInt($("#childCount").text());
        if (count > 0) {
            $("#childCount").text(count - 1);
        }
    });

    $(".close").click(function(){
        $("#myModal").hide();
    })

    // done button
    $("#doneBtn").click(function(){
        let roomID = $("#selectedRoomID").val();
        let checkIN = $("#modalCheckIN").val();
        let checkOUT = $("#modalCheckOUT").val();
        let adults = $("#adultCount").text();
        let children = $("#childCount").text();
        let pet = $("#petCheck").is(":checked") ? 1 : 0;
        let discount = $("input[name='discount']:checked").val();

        window.location.href = `/final/controller/booking.php?roomID=${roomID}&checkIN=${checkIN}&checkOUT=${checkOUT}&numAdults=${adults}&numChildren=${children}&hasPet=${pet}&discountID=${discount}`;
    });
});

$(document).on("click",".bookBtn", function(){
    let roomID = $(this).data("roomid");
    let roomNo = $(this).data("roomno");
    let price = $(this).data("price");

    $("#selectedRoomID").val(roomID);
    $("#modalTitle").text("Book Room " + roomNo);
    $("#myModal").show();

     
});

function loadRooms(){
    $.ajax({
        url:"../../controller/search.php?action=getAllRooms",
        type:"GET",
        success:function(data){
            let rooms = JSON.parse(data);
            
            const roomImages = {
                "Standard": "../../assets/img/rooms.jpg",
                "Deluxe": "../../assets/img/standard.jpg",
                "Suite": "../../assets/img/suite.jpg",
                "Family":"../../assets/img/Family.jpg",
                "Presidential":"../../assets/img/Pres.jpg"
              
            };


            rooms.forEach(e => {
                const imageSrc = roomImages[e.typeName] || "../../assets/img/rooms.jpg";
                let row = `
                    <div class="card">
                        <div class="room-img" style="position:relative">
                            <img src=".<img src="${imageSrc}" alt="${e.typeName} Room"">
                            <span class="room-badge">${e.typeName}</span>
                        </div>
                        <div class="card-details">
                            <h3>${e.roomNo}</h3>
                            <p>₱${e.pricePerNight} / night</p>
                            <p>Max ${e.maxOccupancy} guests</p>
                            <p>Floor ${e.floor}</p>
                            <button class="bookBtn" 
                            data-roomid="${e.roomID}"
                            data-roomno="${e.roomNo}"
                            data-price="${e.pricePerNight}">
                            Book This Room
                            </button>
                        </div>
                    </div>
                `;
                $("#rooms").append(row);
            });
        }
    });
}

$.ajax({
    url:"../../controller/checkSession.php",
    type:"GET",
    dataType:"JSON",
    success:function(data){
        if(data.loggedIN) {
            $("#loginBtn").hide();
            $("#logoutBtn").show();
            $("#navUsername").text("WELCOME, Mr.  " + data.firstName);
        } else {
            $("#logoutBtn").hide();
            $("#navLogin").show();
        }
    }
});


$("#logoutBtn").click(function(){
    $.ajax({
        url:"../../controller/authControl.php",
        type:"POST",
        data:{action:"logoutUser"},
        success:function(data){
            window.location.href= "home.html"
        }
    });
});

$("#loginBtn").click(function(){
    $.ajax({
        url:"../../controller/authControl.php",
        type:"POST",
        data:{action:"loginUser"},
        success:function(data){
            window.location.href= "../login.html"
        }
    });
});
