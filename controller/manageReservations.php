<?php 
session_start();
include("../db.php");
include("../model/reservations.php");

if(!isset($_SESSION['userID']) || 
   !in_array($_SESSION['role'], ['RECEPTIONIST', 'MANAGER', 'ADMIN'])) {
    echo json_encode([
        "success" => false,
        "hint" => "Unauthorized"
    ]);
    exit();
}

$conn = getConnection($_SESSION['role']);
$action = isset($_POST['action']) ? $_POST['action'] : '';

switch($action) {
    case 'getAllRes':
        getAllReservation();
        break;
    case 'approveRes':
        approveRes();
        break;
    case 'cancelRes':
        cancelRes();
        break;
    case 'completeRes':
        completeRes();
        break;
    case 'deleteRes':
        deleteRes();
        break;
}

function approveRes() {
    global $conn;

    $resID = $_POST['resID'];
    $success = updateReservationStatus($resID, 'CONFIRMED');

    echo json_encode([
        "success" => $success
    ]);
}

function cancelRes() {
    global $conn;

    $resID = $_POST['resID'];
    $success = updateReservationStatus($resID, 'CANCELLED');

    echo json_encode([
        "success" => $success
    ]);
}

function completeRes() {
    global $conn;

    $resID = $_POST['resID'];
    $success = updateReservationStatus($resID, 'COMPLETED');

    echo json_encode([
        "success" => $success
    ]);
}

function deleteRes() {
    global $conn;
    
    $resID = $_POST['resID'];

    $success = archiveReservation($resID, 'DELETED');

    echo json_encode([
        "success" => $success
    ]);
}

?>