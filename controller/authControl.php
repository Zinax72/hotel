<?php 
session_start();
include("../db.php");
include("../model/users.php");

$conn = getAuthConnection();

$action = isset($_POST['action']) ? $_POST['action'] : '';

switch($action){ 
    case 'registerUser':
        registerUser();
        break;
    case 'loginUser':
        loginUser();
        break;
    case 'logoutUser':
        logoutUser();
        break;
    case 'forgotPass':
        forgotPass();
        break;
}

function registerUser() {
    global $conn;
    
    $firstName = $_POST['firstName'];
    $lastName = $_POST['lastName'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $confirmPass = $_POST['confirmPass'];
    $contact = $_POST['contact'];      


    $emailExists = emailExists($email);
    if($emailExists) {
        echo json_encode([
            "success" => false,
            "hint" => "Email Already Exists."
        ]);
        return;
    }

    // password must be more than 8 chractres
    if (strlen($password) < 8) {
        echo json_encode([
            "hint" => "Password must be exactly 8 or more characters."
        ]);
        return;
    }

    // if passwords do not match
    if ($password !== $confirmPass) {
        echo json_encode([
            "hint" => "Password do not match."
        ]);
        return;
    }

    //
    if (strlen($contact) != 11) {
        echo json_encode([
            "hint" => "Contact must be 11 digits."
        ]);
        return;
    }

    if(addUser()){
        echo json_encode([
            "success" => true
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "hint" => "Registration Failed."
        ]);
    }
}


function loginUser() {
    global $conn;

    $email = $_POST['email'];
    $password = $_POST['password'];

    $user = getUserByEmail($email);
    
    if(!$user || !password_verify($password, $user['password'])) {
        echo json_encode([
            "success" => false,
            "hint" => "Incorrect email or password."
        ]);
        return;
    }

    $_SESSION['userID'] = $user['userID'];
    $_SESSION['role'] = $user['role'];
    $_SESSION['email'] = $user['email'];
    $_SESSION['firstName'] = $user['firstName'];

    logAudit($user['email'], 'LOGIN');  

    echo json_encode([
        "success" => true,
        "role" => $user['role']
    ]);
}

function logoutUser() {
    session_unset();
    session_destroy();
    echo json_encode([
        "success" => true
    ]);
}

function forgotPass() {
    global $conn;

    $email = $_POST['email'] ?? null;
    $oldPassword = $_POST['oldPassword'] ?? null;
    $newPassword = $_POST['newPassword'] ?? null;
    $confirmNewPass = $_POST['confirmNewPassword'] ?? null;

    $user = getUserByEmail($email);

    if (empty($email) || empty($oldPassword) || empty($newPassword) || empty($confirmNewPass)) {
        echo json_encode([
            "success" => false,
            "hint" => "Missing required fields."
        ]);
        exit;
    }    

    if(!$user || !password_verify($oldPassword, $user['password'])) {
        echo json_encode([
            "success" => false,
            "hint" => "Old password is incorrect."
        ]);
        exit;
    }

    // if passwords do not match
    if ($newPassword !== $confirmNewPass) {
        echo json_encode([
            "success" => false,
            "hint" => "Passwords do not match."
        ]);
        exit;
    }

    // password must be more than 8 chractres
    if (strlen($newPassword) < 8) {
        echo json_encode([
            "success" => false,
            "hint" => "Password must be exactly 8 or more characters."
        ]);
        exit;
    }

    if(updatePassword($email,$newPassword)) {
        echo json_encode([
            "success" => true,
            "role" => $_SESSION['role']?? 'guest'
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "hint" => "Failed to update password"
        ]);
    }
    exit;
}
?>