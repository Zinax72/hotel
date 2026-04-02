<?php 
session_start();
include "../db.php";
include "../model/reservations.php";
include "../model/rooms.php";

if(!isset($_SESSION['userID'])) {
    header("Location: ../view/login.html");
    exit();
}

$conn = getConnection($_SESSION['role'] ?? 'GUEST');
$userID = $_SESSION['userID'];


if($_SERVER['REQUEST_METHOD'] === 'POST') {
    $roomID = $_POST['roomID'];
    $checkIN = $_POST['checkIN'];
    $checkOUT = $_POST['checkOUT'];
    $numAdults = $_POST['numAdults'];
    $numChildren = $_POST['numChildren'];
    $totalGuests = $numAdults + $numChildren;
    $hasPet = $_POST['hasPet'];        
    $discountID = !empty($_POST['discountID']) ? $_POST['discountID'] : NULL;
    
    if ($discountID) {
        $discountVal = "'$discountID'";
    } else {
        $discountVal = "NULL";
    }
    
    $success = addReservation($userID, $roomID, $checkIN, $checkOUT, $totalGuests, $numAdults, $numChildren, $hasPet, $discountVal, 'PENDING');
    
    if($success) {
        header("Location: ../view/guest/confirmation.html");
        exit();
    } else {
        echo "Error: " . $conn->error;
        exit();
    }
}

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

include "../view/guest/summary.php";
?>