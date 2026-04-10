<?php 
session_start();
include("../db.php");
include_once("../model/users.php");

$conn = getConnection($_SESSION['role'] ?? 'GUEST');
$action = isset($_GET['action']) ? $_GET['action'] : 
          (isset($_POST['action']) ? $_POST['action'] : '');

switch ($action) {
    case 'updatePassword':
        resetPass();
        break;
    case 'updateEmail':
        resetEmail();
        break;
}


function resetPass() {
    global $conn;

    $userID          = $_SESSION['userID'];
    $currentPassword = $_POST['currentPassword'] ?? '';
    $newPassword     = $_POST['newPassword'] ?? '';

    $success = updatePasswordByID($userID, $newPassword);

    echo json_encode([
        "success" => $success
    ]);
}

function resetEmail() {
    global $conn;

    $userID   = $_SESSION['userID'];
    $newEmail = $_POST['newEmail'] ?? '';
    $password = $_POST['password'] ?? '';

    
    if (!verifyUserPassword($userID, $password)) {
        echo json_encode([
            "success" => false,
            "hint" => "Incorrect password."
        ]);
        return;
    }

    if (emailExists($newEmail)) {
        echo json_encode([
            "success" => false,
            "hint" => "Email already in use."
        ]);
        return;
    }

    $success = updateEmail($userID, $newEmail);

    echo json_encode([
        "success" => $success
    ]);
}
?>