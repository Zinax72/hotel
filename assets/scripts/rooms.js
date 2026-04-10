function closeAllModals() {
    $(".modal").hide();
}

function openModal(modalID) {
    closeAllModals();
    $(modalID).fadeIn(150);
}

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
        $("#myModal").fadeOut(150);
    })

    // done button
    $(document).on("click", "#doneBtn", function(){
        let roomID = $("#selectedRoomID").val();
        let checkIN = $("#modalCheckIN").val();
        let checkOUT = $("#modalCheckOUT").val();
        let adults = $("#adultCount").text();
        let children = $("#childCount").text();
        let pet = $("#petCheck").is(":checked") ? 1 : 0;
        let discount = $("input[name='discount']:checked").val();

        openModal("#summaryModal"); 
        openSummary(roomID, checkIN, checkOUT, adults, children, pet, discount);
    });

    $("#modalSumm").load("../../view/guest/summary.html", function(){

        $("#confirmModal").appendTo("body");
        $(document).on("click", "#confirmBtn", function(){
            $.ajax({
                url:"../../controller/booking.php",
                type:"GET",
                data:{
                    action:"confirmBooking",
                    roomID: $("#roomID").val(),
                    checkIN: $("#checkIN").val(),
                    checkOUT: $("#checkOUT").val(),
                    numAdults: $("#numAdults").val(),
                    numChildren: $("#numChildren").val(),
                    hasPet: $("#hasPet").val(),
                    discountID: $("#discountID").val()
                },
                success:function(data) {
                    let d = JSON.parse(data);

                    if (d.success) {
                        openModal("#confirmModal"); 

                        resetBookingForm(); 

                        // reset hidden inputs
                        $("#roomID").val('');
                        $("#checkIN").val('');
                        $("#checkOUT").val('');
                        $("#numAdults").val('');
                        $("#numChildren").val('');
                        $("#hasPet").val('');
                        $("#discountID").val('');

                        // reset summary display
                        $("#room").text('');
                        $("#checkINDisplay").text('');
                        $("#checkOUTDisplay").text('');
                        $("#adultsDisplay").text('');
                        $("#childrenDisplay").text('');
                        $("#petsDisplay").text('');
                        $("#discountDisplay").text('');
                        $("#pricePerNightDisplay").text('');
                        $("#totalDisplay").text('');
                    } else {
                        alert(d.hint);
                    }
                }
            });
        });
    });

    $(document).on("click", "#summaryModal .close", function(){
        openModal("#myModal"); 
    });

    $(document).on("click", "#confirmModal .close", function(){
        closeAllModals(); 
    });

    $(document).on("click", ".closeConfirmBtn", function(){
        closeAllModals(); 
    });

    $(document).on("click",".bookBtn", function(){
        let roomID = $(this).data("roomid");
        let roomNo = $(this).data("roomno");

        $("#selectedRoomID").val(roomID);
        $("#modalTitle").text("Book Room " + roomNo);

        openModal("#myModal"); 
    });
});


function resetBookingForm() {
    $("#selectedRoomID").val('');
    $("#modalCheckIN").val('');
    $("#modalCheckOUT").val('');

    $("#adultCount").text('1');
    $("#childCount").text('0');

    $("#petCheck").prop("checked", false);

    $("input[name='discount'][value='']").prop("checked", true);
}

function loadRooms(){
    $.ajax({
        url:"../../controller/search.php?action=getAllRooms",
        type:"GET",
        success:function(data){
            let rooms = JSON.parse(data);
            
            if (rooms.length == 0) {
                $("#room").append('<tr><td colspan="11">NO DATA AVAILABLE</td></tr>');
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

function showPaymentModal(resID, totalAmount) {
    $("#paymentResID").val(resID);
    $("#paymentAmount").text("₱" + totalAmount);
    $("#payMethod").val("CASH");
    $("#cardDetailsForm").hide();
    $("#cardNumber, #cardName, #cardExpiry, #cardCVV").val('');
    $("#paymentModal").css("display", "flex");
}

$(document).on("click", "#paymentModal .close", function() {
    $("#paymentModal").fadeOut(150);
});

$(document).on("change", "#payMethod", function() {
    if($(this).val() == "CARD") {
        $("#cardDetailsForm").slideDown(200);
    } else {
        $("#cardDetailsForm").slideUp(200);
    }
});     

$(document).on("click", "#confirmPaymentBtn", function() {
    let resID = $("#paymentResID").val();
    let payMethod = $("#payMethod").val();

    if(payMethod == "CARD") {
        let cardNumber = $("#cardNumber").val().trim();
        let cardName = $("#cardName").val().trim();

        if(cardNumber == '' || cardName == '') {
            alert("Please fill in all card details");
            return;
        }
    }

    $.ajax({
        url:"../../controller/booking.php",
        type:"POST",
        data:{
            action:"confirmPayment",
            resID:resID,
            payMethod:payMethod
        },
        success:function(data) {
            let d = JSON.parse(data);

            if(d.success) {
                $("#paymentModal").fadeOut(150);
                $("#confirmModal").css("display", "flex");
            } else {
                alert(d.hint);
            }
        }
    });
});

