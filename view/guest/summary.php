<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Booking Summary</title>
    <link rel="stylesheet" href="../../assets/styles/guest.css">
</head> 
<body>
    <div class="topnav">
        <a href="home.html">Home</a>
        <a href="rooms.html">Rooms</a>
        <a href="amenities.html">Amenities</a>
    </div> 
    <div class='card'>
        <h2>BOOKING SUMMARY</h2>
        <h3><?php echo $row['roomNo'] . " - " . $row['typeName']; ?></h3>
        <p>CHECK IN: <?php echo $checkIN; ?></p>
        <p>CHECK OUT: <?php echo $checkOUT; ?></p>
        <p>ADULTS: <?php echo $numAdults; ?></p>
        <p>CHILDREN: <?php echo $numChildren; ?></p>    
        <p>PETS: <?php echo $hasPet ? 'YES' : 'NO'; ?></p>
        <p>DISCOUNT: <?php echo $discountID ? $discountID : 'None'; ?></p>
        <p>₱<?php echo $row['pricePerNight']; ?> / night</p>
        <p>Total: ₱<?php echo $totalPrice; ?> (<?php echo $nights; ?> nights)</p>

        <form method='POST' action='/final/controller/booking.php'>
            <input type='hidden' name='roomID' value='<?php echo $roomID; ?>'>
            <input type='hidden' name='checkIN' value='<?php echo $checkIN; ?>'>
            <input type='hidden' name='checkOUT' value='<?php echo $checkOUT; ?>'>
            <input type='hidden' name='numAdults' value='<?php echo $numAdults; ?>'>
            <input type='hidden' name='numChildren' value='<?php echo $numChildren; ?>'>
            <input type='hidden' name='hasPet' value='<?php echo $hasPet; ?>'>
            <input type='hidden' name='discountID' value='<?php echo $discountID; ?>'>
            <button type='submit'>CONFIRM BOOKING</button>
        </form>
    </div>
</body>
</html>