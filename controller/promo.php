<?php
session_start();
include "../db.php";
include "../model/promo.php";

if(!isset($_SESSION['userID']) || 
   !in_array($_SESSION['role'], ['MANAGER', 'ADMIN'])) {
    echo json_encode([
        "success" => false,
        "hint" => "Unauthorized"
    ]);
    exit();
}

$conn = getConnection($_SESSION['role']);
$action = $_GET['action'] ?? $_POST['action'] ?? '';

switch($action) {
    case 'getAll':
        getAllPromotions();
        break;
    case 'getOne':
        getPromoDetail();
        break;
    case 'add':
        addPromotion();
        break;
    case 'update':
        updatePromotion();
        break;
    case 'delete':
        delPromo();
        break;
    default:
        echo json_encode(["success" => false, "hint" => "Invalid action"]);
}

function getPromoDetail() {
    global $conn;

    $promoID = $_GET['promoID'];
    $data = getPromotionByID($promoID);
    echo json_encode($data);
}

function delPromo() {
    global $conn;

    $promoID = $_POST['promoID'];
    $success = deletePromotion($promoID);
    echo json_encode([
        "success" => $success
    ]);
}
?>