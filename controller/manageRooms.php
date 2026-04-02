<?php 
include"db.php";

function createRooms() {

    if($_SERVER['REQUEST_METHOD']=='GET') {
        $roomNo = $_GET['roomNo'];
        $roomType = $_GET['roomType'];
        $floor = $_GET['floor'];

        i
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form action="" method="get">
        <input type="hidden" name="roomID" id="roomID"> 
        <label for="roomNo">Room NO</label><br>
        <input type="text" name="roomNo" id="roomNo"><br>
    
        <label for="roomType">Room Type (ID)</label>
        <input type="text" name="roomTypeID" id="roomTypeID">

        <input type="hidden" name="floor" id="floor">
    </form>
</body>
</html>