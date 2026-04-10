$(function() {
    $("#myModal").hide();

    $("#searchForm").submit(function(e){
        e.preventDefault();
        let checkIN = $('#checkIN').val();
        let checkOUT = $('#checkOUT').val();
        let today = new Date();
        if (checkIN < today) {
            alert("Check-in date cannot be in the past.");
            return;
        }

        if (checkIN >= checkOUT) {
            alert("Check-out date must be after check-in date.");
            return;
        }

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
    $("#myModal .close").click(function() {
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
                        $("#summaryModal").hide();
                        
                        let resID = d.resID || $("#roomID").val();
                        let totalAmount = d.totalPrice || 0

                        showPaymentModal(resID, totalAmount);

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
        $("#summaryModal").hide();
    });

    $(document).on("click", "#confirmModal .close", function(){
        $("#confirmModal").hide();
    });

    $(document).on("click", ".closeConfirmBtn", function(){
        $("#confirmModal").hide();
    });

    $("#burgerBtn").click(function(e){
        e.stopPropagation();
        $("#burgerMenu").toggle();
    });

    // closes when clicking anywhere else
    $(document).click(function(){
        $("#burgerMenu").hide();
    });

    $.ajax({
        url:"../../controller/checkSession.php",
        type:"GET",
        dataType:"JSON",
        success:function(data){
            if(data.loggedIN) {
                $("#loginBtn").hide();
                $("#burgerBtn").show(); // ✅ show when logged in
                $("#navUsername").text("WELCOME, Mr. " + data.firstName);
            } else {
                $("#burgerBtn").hide(); // ✅ hide when not logged in
                $("#loginBtn").show();  // make sure login shows
            }
        }
    });
});

$("#burgerBtn").click(function(){
    $(".sidebar").toggleClass("open");
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
                            <button class="bookNowBtn"
                                data-roomID="${e.roomID}"
                                data-checkin="${checkIN}"
                                data-checkout="${checkOUT}"
                                data-numadults="${numAdults}"
                                data-numchildren="${numChildren}"
                                data-haspet="${hasPet}"
                                data-discountid="${discountID}">
                                BOOK NOW
                            </button>
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

$(document).on("click", ".bookNowBtn", function(){
    let roomID = $(this).data("roomid");
    let checkIN = $(this).data("checkin");
    let checkOUT = $(this).data("checkout");
    let numAdults = $(this).data("numadults");
    let numChildren = $(this).data("numchildren");
    let hasPet = $(this).data("haspet");
    let discountID = $(this).data("discountid");

    openSummary(roomID, checkIN, checkOUT, numAdults, numChildren, hasPet, discountID);
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

