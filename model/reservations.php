<?php 
include("../db.php");

function getAllReservation() {
    global $conn;

    $data = [];
    $sql = "select res.*, u.firstName, u.lastName, u.userID, u.email, r.roomNo, rt.typeName, d.discountType
        from reservations res
        join users u ON res.userID = u.userID
        join rooms r ON res.roomID = r.roomID
        join roomtypes rt ON r.roomTypeID = rt.typeID
        left join discount d ON res.discountID = d.discountID
        ORDER BY res.createdAt DESC";

    $result = $conn->query($sql);

    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    echo json_encode($data);
}

function getReservationByID($resID) {
    global $conn;

    $sql = "SELECT * FROM reservations WHERE resID='$resID'";

    $result = $conn->query($sql);

    return $result->fetch_assoc();
}

function getReservationByUser($search) {
    global $conn;

    $data = [];

    $sql = "SELECT res.*, u.firstName, u.lastName, u.email 
    FROM reservations res
    JOIN users u ON res.userID = u.userID
    WHERE u.lastName LIKE '%$search%' 
    OR u.firstName LIKE '%$search%'";

    $result = $conn->query($sql);

    while ($row = $result->fetch_assoc()){
        $data[] = $row;
    }
    echo json_encode($data);
}

function addReservation($userID) {
    global $conn;

    $roomID = $_GET['roomID'] ?? '';
    $checkIN = $_GET['checkIN'] ?? '';
    $checkOUT = $_GET['checkOUT'] ?? '';
    $numAdults = $_GET['numAdults'] ?? 1;
    $numChildren = $_GET['numChildren'] ?? 0;
    $totalGuests = $numAdults + $numChildren;
    $hasPet = $_GET['hasPet'] ?? 0;        
    $discountID = !empty($_GET['discountID']) ? $_GET['discountID'] : NULL;
    
    if ($discountID) {
        $discountVal = "'$discountID'";
    } else {
        $discountVal = "NULL";
    }

    $sql = "INSERT INTO reservations(userID, roomID, checkIN, checkOut, guestsNum, numAdults, numChildren, hasPet, discountID, status) 
            VALUES ('$userID','$roomID', '$checkIN', '$checkOUT', '$totalGuests', '$numAdults', '$numChildren', '$hasPet', $discountVal, 'PENDING')";

    return $conn->query($sql);
}

function updateReservationStatus($resID, $status){
    global $conn;

    $sql = "UPDATE reservations SET status='$status' WHERE resID='$resID'";

    return $conn->query($sql);
}

function archiveReservation($resID, $reason) {
    global $conn;

    $sql = "SELECT * FROM reservations WHERE resID='$resID'";
    $result = $conn->query($sql);
    $row = $result->fetch_assoc();

    $archiveSql = "INSERT INTO reservations_archive(resID, userID, roomID, checkIn, checkOut, guestsNum, numAdults, numChildren, hasPet, discountID, status, createdAt, archiveReason)
    VALUES('$row[resID]', '$row[userID]', '$row[roomID]', '$row[checkIn]', '$row[checkOut]', '$row[guestsNum]', '$row[numAdults]', 
    '$row[numChildren]', '$row[hasPet]', '$row[discountID]', '$row[status]', '$row[createdAt]', '$reason')";

    $conn->query($archiveSql);

    $deleteSql = "DELETE FROM reservations WHERE resID='$resID'";

    return $conn->query($deleteSql);
}

function deleteReservation($archiveID) {
    global $conn;

    $sql = "DELETE FROM reservations_archive WHERE archiveID='$archiveID'";

    return $conn->query($sql);
}

function editReservation($resID) {
    global $conn;

    $checkIN    = $_POST['checkIN'] ?? '';
    $checkOUT   = $_POST['checkOUT'] ?? '';
    $roomID     = $_POST['roomID'] ?? '';
    $guestsNum  = $_POST['guestsNum'] ?? 1;
    $hasPet     = $_POST['hasPet'] ?? 0;
    $discountID = $_POST['discountID'] ?? '';
    $status     = $_POST['status'] ?? 'PENDING';
    
    // Handle discountID correctly (NULL vs value)
    if ($discountID == '' || $discountID == '0') {
        $discountPart = "discountID = NULL";
    } else {
        $discountPart = "discountID = '$discountID'";
    }

    $sql = "UPDATE reservations SET
            checkIN = '$checkIN', 
            checkOUT = '$checkOUT', 
            roomID = '$roomID', 
            guestsNum = '$guestsNum', 
            hasPet = '$hasPet', 
            $discountPart, 
            status = '$status'
            WHERE resID = '$resID'";

    return $conn->query($sql);
}

function getAllArchive() {
    global $conn;

    $data = [];
    $sql = "select resa.*, u.firstName, u.lastName, u.userID, u.email, r.roomNo, rt.typeName, d.discountType
        from reservations_archive resa
        join users u ON resa.userID = u.userID
        join rooms r ON resa.roomID = r.roomID
        join roomtypes rt ON r.roomTypeID = rt.typeID
        left join discount d ON resa.discountID = d.discountID
        ORDER BY resa.createdAt DESC";

    $result = $conn->query($sql);

    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    echo json_encode($data);
}
?>