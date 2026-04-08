<?php 
session_start();
include("../db.php");
include_once("../model/rooms.php");

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
    case'addRoom':
        addRoom();
        break;
    case 'getRooms':
        getAllRooms();
        break;
    case 'delRoom':
        delRoom();
        break;
    case 'updateRoom':
        updateStatus();
        break;
    case 'getRoomStatus':
        getRoomDetail();
        break;
}

function getRoomDetail() {
    global $conn;

    $roomID = $_GET['roomID'];
    $data = getRoomDetails($roomID);
    echo json_encode($data);
}

function updateStatus() {
    global $conn;

    $roomID = $_POST['roomID'];
    $data = updateRoom($roomID);
    echo json_encode([
        "success" => $data
    ]);
}

function delRoom() {
    global $conn;

    $roomID = $_POST['roomID'];
    $success = deleteRoom($roomID);
    echo json_encode([
        "success" => $success
    ]);
}
?>