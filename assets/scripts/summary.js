function openSummary(roomID, checkIN, checkOUT, numAdults, numChildren, hasPet, discountID) {
    $.ajax({
        url:"../../controller/booking.php",
        type:"GET",
        data:{
            action:"getSummary",
            roomID:roomID,
            checkIN:checkIN,
            checkOUT:checkOUT,
            numAdults:numAdults,
            numChildren:numChildren,
            hasPet:hasPet,
            discountID:discountID
        },
        success:function(data){ 
            let d = JSON.parse(data);

            $("#room").text("ROOM " + d.roomNo + " - " + d.typeName);
            $("#checkINDisplay").text("CHECK IN: " + d.checkIN);
            $("#checkOUTDispaly").text("CHECK OUT: " + d.checkOUT);
            $("#adultsDisplay").text("ADULTS: " + d.numAdults);
            $("#childrenDisplay").text("CHILDREN: " + d.numChildren);
            $("#petsDisplay").text("PETS: " + (d.hasPet == 1 ? "YES": "NO"));
            $("#discountDisplay").text("DISCOUNT: " + (d.discountID ? d.discountID : "NONE"));
            $("#pricePerNightDisplay").text("₱" + d.pricePerNight + " / night");
            $("#totalDisplay").text("Total: ₱" + d.totalPrice + " (" + d.nights + " nights");

            $("#roomID").val(d.roomID);
            $("#checkIN").val(d.checkIN);
            $("#checkOUT").val(d.checkOUT);
            $("#numAdults").val(d.numAdults);
            $("#numChildren").val(d.numChildren);
            $("#hasPet").val(d.hasPet);
            $("#discountID").val(d.discountID);

            $("#summaryModal").show();
        }
    });
}



