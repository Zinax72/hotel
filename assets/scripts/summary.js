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
            $("#checkOUTDisplay").text("CHECK OUT: " + d.checkOUT);
            $("#adultsDisplay").text("ADULTS: " + d.numAdults);
            $("#childrenDisplay").text("CHILDREN: " + d.numChildren);
            $("#petsDisplay").text("PETS: " + (d.hasPet == 1 ? "YES": "NO"));
            let discountText = "NONE";

            if (d.discountPercent > 0) {
                discountText = d.promoName 
                    ? `${d.promoName} (${d.discountPercent}%)` 
                    : `${d.discountPercent}%`;
            }

            $("#discountDisplay").text("DISCOUNT: " + discountText);
            $("#pricePerNightDisplay").text("₱" + d.pricePerNight + " / night");
            $("#totalDisplay").text("Total: ₱" + d.totalPrice + " (" + d.nights + " nights)");

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



