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
    case 'confirmPayment':
        confirmPayment();
}

function getSummary() {
    global $conn;

    $roomID      = $_GET['roomID'];
    $checkIN     = $_GET['checkIN'] ?? '';
    $checkOUT    = $_GET['checkOUT'] ?? '';
    $numAdults   = (int)($_GET['numAdults'] ?? 1);
    $numChildren = (int)($_GET['numChildren'] ?? 0);
    $hasPet      = (int)($_GET['hasPet'] ?? 0);
    $manualDiscountID = $_GET['discountID'] ?? '';

    $row = getRoomDetails($roomID);

    if (!$row) {
        echo json_encode(["success" => false, "hint" => "Room not found"]);
        return;
    }

    // date calculation
    $date1 = new DateTime($checkIN);
    $date2 = new DateTime($checkOUT);
    $nights = $date1->diff($date2)->days;
    if ($nights <= 0) $nights = 1;

    $basePrice = $nights * $row['pricePerNight'];
    $extraAdultFee = 800;
    $extraAdults = max(0, $numAdults - 2);
    $extraAdultCharge = $extraAdults * $extraAdultFee * $nights;

    $totalPrice = $basePrice + $extraAdultCharge;

    if ($hasPet == 1) {
        $totalPrice += $basePrice * 0.05;
    }

    // promotion logic
    $appliedPromoID = null;
    $appliedDiscountPercent = 0;
    $promoName = '';

    if (!empty($manualDiscountID)) {
        $appliedPromoID = $manualDiscountID;
        $appliedDiscountPercent = 20;
    } else {
        $promo = getBestActivePromotion($checkIN, $checkOUT);
        
        if ($promo) {
            $appliedPromoID = $promo['promoID'];
            $appliedDiscountPercent = $promo['discountPercent'];
            $promoName = $promo['promoName'];   
        }
    }

    // Apply discount at the very end
    if ($appliedDiscountPercent > 0) {
        $totalPrice = $totalPrice * (1 - ($appliedDiscountPercent / 100));
    }

    $totalPrice = round($totalPrice, 2);

    echo json_encode([
        "success" => true,
        "roomNo" => $row['roomNo'],
        "typeName" => $row['typeName'],
        "checkIN" => $checkIN,
        "checkOUT" => $checkOUT,
        "numAdults" => $numAdults,
        "numChildren" => $numChildren,
        "hasPet" => $hasPet,
        "discountID" => $appliedPromoID,
        "discountPercent" => $appliedDiscountPercent,
        "promoName" => $promoName,                  
        "pricePerNight" => $row['pricePerNight'],
        "nights" => $nights,
        "totalPrice" => $totalPrice,
        "roomID" => $roomID
    ]);
}


function confirmBooking() {
    global $conn;

    if(!isset($_SESSION['userID']) || $_SESSION['userID'] == '') {
        echo json_encode([
            "success" => false,
            "hint" => "Please login to confirm your booking."
        ]);
        return;
    }

    $userID      = $_SESSION['userID'];
    $resID       = $_GET['resID'] ?? '';
    $roomID      = $_GET['roomID'] ?? '';
    $checkIN     = $_GET['checkIN'] ?? '';
    $checkOUT    = $_GET['checkOUT'] ?? '';
    $numAdults   = $_GET['numAdults'] ?? 1;
    $numChildren = $_GET['numChildren'] ?? 0;
    $totalGuests = (int)$numAdults + (int)$numChildren;
    $hasPet      = $_GET['hasPet'] ?? 0;
    $discountID  = !empty($_GET['discountID']) ? $_GET['discountID'] : null;

    // Basic validation
    if ($roomID == '' || $checkIN == '' || $checkOUT == '') {
        echo json_encode([
            "success" => false,
            "hint" => "Missing required booking information."
        ]);
        return;
    }

    $success = addReservation($userID, $roomID, $checkIN, $checkOUT, $totalGuests, 
                              $numAdults, $numChildren, $hasPet, $discountID);

    if($success) {
        $amount = getReservationTotal($roomID);
        echo json_encode([
            "success" => true,
            "message" => "Booking confirmed successfully!",
            "resID" => $resID,
            "totalPrice" => $amount
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Booking failed! Please try again."
        ]);
    }
}

function confirmPayment() {
    $resID = $_POST['resID'] ?? '';
    $payMethod = $_POST['payMethod'] ?? 'CASH';

    $amount = getReservationTotal($resID);

    $paymentSuccess = addPayment($resID, $amount, $payMethod);

    if($paymentSuccess) {
        updateResAfterPayment($resID);

        echo json_encode([
            "success" => true,
            "message" => "Payment recorded successfully"
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Failed to record payment. Try again later."
        ]);
    }
}
?>