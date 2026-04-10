<?php 
include("../db.php");

function getAvailableRooms() {
    $conn = getConnection('ADMIN');


    $guests = isset($_GET['guests']) ? $_GET['guests'] : 1;
    $checkOUT = isset($_GET['checkOUT']) ? $_GET['checkOUT'] : '';
    $checkIN = isset($_GET['checkIN']) ? $_GET['checkIN'] : '';

    $sql = "SELECT rooms.*, roomtypes.typeName, roomtypes.pricePerNight, roomtypes.maxOccupancy
    FROM rooms
    JOIN roomtypes ON rooms.roomTypeID = roomtypes.typeID
    WHERE rooms.status = 'AVAILABLE'
    AND roomtypes.maxOccupancy >= $guests
    AND rooms.roomID NOT IN (
        SELECT roomID FROM reservations
        WHERE status IN ('PENDING', 'CONFIRMED')
        AND checkIn != '0000-00-00'
        AND checkOut != '0000-00-00'
        AND checkIn < '$checkOUT'
        AND checkOut > '$checkIN'
    )";

    $result = $conn->query($sql);

    if (!$result) {
        echo json_encode(["error" => $conn->error, "sql" => $sql]);
        return;
    }

    $data = [];
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    echo json_encode($data);
}

function getRoomDetails($roomID) {
    global $conn;

    $sql = "SELECT Rooms.*, RoomTypes.typeName, RoomTypes.pricePerNight
    FROM Rooms
    JOIN RoomTypes ON Rooms.roomTypeID = RoomTypes.typeID
    WHERE Rooms.roomID = '$roomID'";

    $result = $conn->query($sql);

    return $result->fetch_assoc();
}

function getAllRooms() {
    global $conn;

    $data = [];
    $sql = "SELECT Rooms.*, RoomTypes.typeName, RoomTypes.pricePerNight, RoomTypes.maxOccupancy
    FROM Rooms
    JOIN RoomTypes ON Rooms.roomTypeID = RoomTypes.typeID";

    $result = $conn->query($sql);

    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    echo json_encode($data);
}

function getRoomByID($roomID) {
    global $conn;

    $data = [];

    $sql = "SELECT * FROM Rooms WHERE roomID ='$roomID'";

    $result = $conn->query($sql);

    while($row = $result->fetch_assoc()){
        $data[] = $row;
    }
    echo json_encode($data);
}

function addRoom(){
    global $conn;

    $roomNo = isset($_POST['roomNo']) ? $_POST['roomNo'] : '';
    $roomTypeID = isset($_POST['roomTypeID']) ? $_POST['roomTypeID'] : '';
    $floor = isset($_POST['floor']) ? $_POST['floor'] : '';
    $status = isset($_POST['status']) ? $_POST['status'] : '';

    $sql = "INSERT INTO Rooms(roomNo, roomTypeID, floor, status) VALUES('$roomNo', '$roomTypeID', '$floor', '$status')";

    return $conn->query($sql);
}

function updateRoom($roomID) {
    global $conn;

    $status = isset($_POST['status']) ? $_POST['status'] : '';

    $sql = "UPDATE Rooms SET status='$status' WHERE roomID='$roomID'";

    return $conn->query($sql);    
}

function deleteRoom($roomID){
    global $conn;

    $sql = "DELETE FROM Rooms WHERE roomID='$roomID'";

    return $conn->query($sql);
}

function getRoomsForDropdown() {
    global $conn;
    
    $sql = "SELECT r.roomID, r.roomNo, rt.typeName 
            FROM rooms r 
            JOIN roomtypes rt ON r.roomTypeID = rt.typeID
            ORDER BY r.roomNo ASC";
    
    $result = $conn->query($sql);
    $data = [];
    
    while($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    
    return $data;
}

?>