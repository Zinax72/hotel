$(function() {
    $("#myModal").hide();

    $("#searchForm").submit(function(e){
        e.preventDefault();
        let checkIN = $('#checkIN').val();
        let checkOUT = $('#checkOUT').val();
        let numAdults = parseInt($("#adultCount").text());    
        let numChildren = parseInt($("#childCount").text());
        let guests = numAdults + numChildren;
        let hasPet = $("#petCheck").is(":checked") ? 1 : 0;  
        let discountID = $("input[name='discount']:checked").val(); 

        loadRooms(checkIN, checkOUT, guests, numAdults, numChildren, hasPet, discountID);
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

    // open modal
    $("#modalBtn").click(function() {
        $("#myModal").toggle();
    });

    // close modal
    $(".close").click(function() {
        $("#myModal").hide();
    });

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

    // done button
    $("#doneBtn").click(function(){
        let adults = $("#adultCount").text();
        let children = $("#childCount").text();
        let pet = $("#petCheck").is(":checked") ? 1 : 0;
        let discount = $("input[name='discount']:checked").val();

        $("#numAdults").val(adults);
        $("#numChildren").val(children);
        $("#hasPet").val(pet);
        $("#discountID").val(discount);

        $("#modalBtn").text(adults + " Adult(s), " + children + " Children");
        $("#myModal").hide();
    });
});

function loadRooms(checkIN, checkOUT, guests, numAdults, numChildren, hasPet, discountID) {
    $.ajax({
        url: "../../controller/search.php",
        type: "GET",
        data: {
            action: "getAvailableRooms",
            checkIN: checkIN,
            checkOUT: checkOUT,
            guests: guests,
            numAdults: numAdults,
            numChildren: numChildren,
            hasPet: hasPet,
            discountID: discountID
        },
        success: function(data) {
            $("#result").html('');
            let rooms = JSON.parse(data);
            console.log("rooms count:", rooms.length);
            if (rooms.length == 0) {
                $("#result").html('<p>No rooms available</p>');
                return;
            }

            rooms.forEach(e => {
                let row = `
                    <div class="card">
                        <div class="room-img" style="position:relative">
                            <img src="../../assets/img/rooms.jpg" alt="Room Image">
                            <span class="room-badge">${e.typeName}</span>
                        </div>
                        <div class="card-details">
                            <h3>${e.roomNo}</h3>
                            <p>₱${e.pricePerNight} / night</p>
                            <p>Max ${e.maxOccupancy} guests</p>
                            <p>Floor ${e.floor}</p>
                            <a href="/final/controller/booking.php?roomID=${e.roomID}&checkIN=${checkIN}&checkOUT=${checkOUT}&numAdults=${numAdults}&numChildren=${numChildren}&hasPet=${hasPet}&discountID=${discountID}">Book Now</a>
                        </div>
                    </div>
                `;
                $("#result").append(row);
            });

            $('html, body').animate({
            scrollTop: $("#result").offset().top
            }, 600);
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
