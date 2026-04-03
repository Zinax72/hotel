<?php 
session_start();
include "../db.php";
include "../model/reservations.php";
include "../model/rooms.php";

$conn = getConnection($_SESSION['role'] ?? 'GUEST');

$action = isset($_GET['action']) ? $_GET['action'] : '';


switch($action) {
    case 'getSummary':
        getSummary();
        break;
    case 'confirmBooking':
        confirmBooking();
        break;
}

function getSummary() {
    global $conn;

    $roomID = $_GET['roomID'];
    $checkIN = isset($_GET['checkIN']) ? $_GET['checkIN'] : '';
    $checkOUT = isset($_GET['checkOUT']) ? $_GET['checkOUT'] : '';
    $numAdults = isset($_GET['numAdults']) ? $_GET['numAdults'] : 1;
    $numChildren = isset($_GET['numChildren']) ? $_GET['numChildren'] : 0;
    $hasPet = isset($_GET['hasPet']) ? $_GET['hasPet'] : 0;
    $discountID = isset($_GET['discountID']) ? $_GET['discountID'] : '';

    $row = getRoomDetails($roomID);

    $date1 = new DateTime($checkIN);
    $date2 = new DateTime($checkOUT);
    $nights = $date1->diff($date2)->days;

    $totalPrice = $nights * $row['pricePerNight'];

    if($hasPet) {
        $totalPrice += $totalPrice * 0.05;
    }
        
    if($discountID) {
        $totalPrice -= $totalPrice * 0.20;
    }

    echo json_encode([
        "success" => true,
        "roomNo" => $row['roomNo'],
        "typeName" => $row['typeName'],
        "checkIN" => $checkIN,
        "checkOUT" => $checkOUT,
        "numAdults" => $numAdults,
        "numChildren" => $numChildren,
        "hasPet" => $hasPet,
        "discountID" => $discountID,
        "pricePerNight" => $row['pricePerNight'],
        "nights" => $nights,
        "totalPrice" => $totalPrice,
        "roomID" => $roomID
    ]);
}


function confirmBooking() {
    global $conn;

    if(!isset($_SESSION['userID'])) {
        echo json_encode([
            "success" => false,
            "hint" => "Please login to confirm your booking."
        ]);
        return;
    }

    $userID = $_SESSION['userID'];
    $roomID = $_GET['roomID'];
    $checkIN = $_GET['checkIN'];
    $checkOUT = $_GET['checkOUT'];
    $numAdults = $_GET['numAdults'];
    $numChildren = $_GET['numChildren'];
    $totalGuests = $numAdults + $numChildren;
    $hasPet = $_GET['hasPet'];        
    $discountID = !empty($_GET['discountID']) ? $_GET['discountID'] : NULL;
    
    if ($discountID) {
        $discountVal = "'$discountID'";
    } else {
        $discountVal = "NULL";
    }
    
    $success = addReservation($userID, $roomID, $checkIN, $checkOUT, $totalGuests, $numAdults, $numChildren, $hasPet, $discountVal, 'PENDING');
    
    if($success) {
        echo json_encode([
            "success" => true,
            "message" => "Booking confirmed!"
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Booking failed! Please try again."
        ]);
    }
}
?>