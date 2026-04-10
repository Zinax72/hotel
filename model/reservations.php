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

function getReservationByUser($userID) {
    global $conn;

    $data = [];
    $sql = "SELECT res.*, u.firstName, u.lastName, u.userID, u.email, r.roomNo, rt.typeName, d.discountType
        from reservations res
        join users u ON res.userID = u.userID
        join rooms r ON res.roomID = r.roomID
        join roomtypes rt ON r.roomTypeID = rt.typeID
        left join discount d ON res.discountID = d.discountID
        WHERE u.userID = '$userID'
        ORDER BY
            FIELD(res.status, 'PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED'),
            res.createdAt DESC";

    $result = $conn->query($sql);

    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    return $data;
}

function addReservation($userID, $roomID, $checkIN, $checkOUT, $totalGuests, 
                        $numAdults, $numChildren, $hasPet, $discountID, $totalPrice) {
    global $conn;

    if ($discountID !== null && $discountID !== '') {
        $discountVal = "'$discountID'";
    } else {
        $discountVal = "NULL";
    }

    $sql = "INSERT INTO reservations 
            (userID, roomID, checkIN, checkOut, guestsNum, numAdults, numChildren, hasPet, discountID, totalPrice, status) 
            VALUES 
            ('$userID', '$roomID', '$checkIN', '$checkOUT', '$totalGuests', '$numAdults', '$numChildren', '$hasPet', $discountVal, '$totalPrice', 'PENDING')";

    $conn->query($sql);
    return $conn->insert_id;
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

function getBestActivePromotion($checkIN, $checkOUT) {
    global $conn;

    $sql = "SELECT promoID, promoName, discountPercent 
            FROM promotions 
            WHERE status = 'ACTIVE' 
              AND startDate <= '$checkIN' 
              AND endDate >= '$checkOUT' 
            ORDER BY discountPercent DESC 
            LIMIT 1";

    $result = $conn->query($sql);

    return $result->fetch_assoc();
}

function updateResAfterPayment($resID) {
    global $conn;

    $sql = "UPDATE reservations SET status = 'CONFIRMED' WHERE resID='$resID'";

    return $conn->query($sql);
}

function getReservationTotal($resID) {
    global $conn;

    $sql = "SELECT totalPrice FROM reservations WHERE resID='$resID'";
    $result = $conn->query($sql);

    return $result->fetch_assoc();
}

function cancelMyBooking($resID, $userID) {
    global $conn;

    $sql = "UPDATE reservations 
            SET status = 'CANCELLED' 
            WHERE resID = '$resID' AND userID = '$userID' AND status = 'PENDING'";

    $conn->query($sql);
    return $conn->affected_rows > 0;
}
?>