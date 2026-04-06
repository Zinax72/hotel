<?php 
session_start();
include("../db.php");
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

switch ($action) {
    case 'getUsers':
        getAllUsers();
        break;
    case 'addUsers':
        addUsers();
        break;
    case 'delUser':
        delUser();
        break;
    case 'updateUser':
        updateUser();
        break;
    case 'getUserDetails':
        getUserDetails();
        break;
    case 'resetPass':
        resetPass();
        break;
}

function addUsers() {

}

function getUserDetails() {
    global $conn;

    $userID = $_GET['userID'];
    $data = getUserByID($userID);
    echo json_encode($data);
}

function updateUser() {
    global $conn;

    $userID = $_POST['userID'];
    $success = editUser($userID);
    echo json_encode([
        "success" => $success
    ]);
}

function resetPass() {

}

function delUser() {
    global $conn;

    $userID = $_POST['userID'];
    $success = deleteUser($userID);
    echo json_encode([
        "success" => $success
    ]);
}
?>