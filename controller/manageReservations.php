<?php 
session_start();
include("../db.php");
include("../model/reservations.php");
include_once("../model/rooms.php");
include_once("../model/users.php");

if(!isset($_SESSION['userID']) || 
   !in_array($_SESSION['role'], ['RECEPTIONIST', 'MANAGER', 'ADMIN'])) {
    echo json_encode([
        "success" => false,
        "hint" => "Unauthorized"
    ]);
    exit();
}

$conn = getConnection($_SESSION['role']);
$action = isset($_GET['action']) ? $_GET['action'] : 
          (isset($_POST['action']) ? $_POST['action'] : '');

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
    case 'getRes':
        getRes();
        break;
    case 'updateRes':
        updateRes();
        break;
    case 'deleteRes':
        deleteRes();
        break;
    case 'getRooms':
        roomDropdown();
        break;
    case 'getAllArchive':
        getAllArchive();
        break;
    case 'deleteArc':
        deleteArc();
        break;
    case 'addRes':
        addReservation();
    case 'getUsers':
        getAllUsers();
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

function getRes() {
    global $conn;

    $resID = $_GET['resID'];
    $data = getReservationByID($resID);
    echo json_encode($data);
}

function updateRes() {
    global $conn;
    
    $resID = $_POST['resID'];
    $success = editReservation($resID);
    echo json_encode([
        "success" => $success
    ]);
}

function roomDropdown() {
    global $conn;

    $data = getRoomsForDropdown();
    echo json_encode($data);
}

function deleteArc() {
    global $conn;

    $archiveID = $_POST['archiveID'];
    $success = deleteReservation($archiveID);

    echo json_encode([
        "success" => $success
    ]);
}
?>