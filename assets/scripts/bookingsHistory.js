$.ajax({
    url:"../../controller/checkSession.php",
    type:"GET",
    dataType:"JSON",
    success:function(data){
        if(data.loggedIN) {
            $("#userName").text(data.firstName + ' ' + data.lastName);
        } else {
            window.location.href = "../login.html";
        }
    }
});

loadMyBookings();
function loadMyBookings() {
    $.ajax({
        url: "../../controller/booking.php",
        type: "GET",
        dataType: "JSON",
        data: { action: "getRes" },
        success: function(res) {  // already an array, no JSON.parse needed
            if (res.length == 0) {
                $("#reservations").append('<tr><td colspan="11">NO DATA AVAILABLE</td></tr>');
                return;
            }

            res.forEach(e => {
                let pet = e.hasPet == 1 ? "YES" : "NO";
                let discount = e.discountType ? e.discountType : "NONE";
                let actions = e.status === 'PENDING'
                    ? `<button class="cancelBtn" data-id="${e.resID}">Cancel</button>`
                    : '';

                let row = `
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
                $("#reservations").append(row);
            });
        }
    });
}

$(document).on("click", ".cancelBtn", function(){
    if(!confirm("Are you sure you want to cancel this booking?")) {
        return;
    }

    let resID = $(this).data("id");
    $.ajax({
        url:"../../controller/booking.php",
        type:"GET",
        data:{
            action:"cancelMyBooking",
            resID:resID
        },
        success:function(data){
            let d = JSON.parse(data);
            if(d.success) {
                alert("Booking cancelled successfully.");
                $("#reservations").empty();
                loadMyBookings();
            } else {
                alert(d.hint);
            }
        }
    });
});