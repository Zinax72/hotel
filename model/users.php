<?php 
include("../db.php");

function getAllUsers() {
    global $conn;

    $data = [];
    $sql = "SELECT * FROM users";

    $result = $conn->query($sql);

    while ($row = $result->fetch_assoc()){
        $data[] = $row;
    }
    echo json_encode($data);
}

function getUserByID($userID) {
    global $conn;

    $sql = "SELECT * FROM users WHERE userID='$userID'";
    $result = $conn->query($sql);
    return $result->fetch_assoc();
}

function getUserByEmail($email) {
    global $conn;

    $sql = "SELECT * FROM users WHERE email='$email'";
    $result = $conn->query($sql);
    return $result->fetch_assoc();
}

function addUser() {
    global $conn;

    $firstName = $_POST['firstName'] ?? '';
    $lastName = $_POST['lastName'] ?? '';
    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';
    $contact = $_POST['contact'] ?? '';
    $role = $_POST['role'] ?? 'GUEST';   

    //hash password
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    $sql = "INSERT INTO users(firstName, lastName, email, password, contactNo, role) 
    VALUES('$firstName', '$lastName', '$email', '$hashedPassword', '$contact', '$role')";

    return $conn->query($sql);
}

function updatePassword($email, $newPassword) {
    global $conn;

    $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);

    $sql = "UPDATE users SET password='$hashedPassword' WHERE email='$email'";
    return $conn->query($sql);
}

function updatePasswordByID($userID, $newPassword) {
    global $conn;

    $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);

    $sql = "UPDATE users SET password='$hashedPassword' WHERE userID='$userID'";
    return $conn->query($sql);
}


function updateEmail($userID, $email) {
    global $conn;

    $sql = "UPDATE users SET email='$email' WHERE userID='$userID'";
    return $conn->query($sql);
    
}

function deleteUser($userID) {
    global $conn;

    $sql = "DELETE FROM users WHERE userID='$userID'";
    return $conn->query($sql);
}

function getUserRole( $email) {
    global $conn;
    
    $sql = "SELECT * FROM users WHERE email = '$email'";
    $result = $conn->query($sql);
    $row = $result->fetch_assoc();
    return $row['role'];
}


function emailExists($email) {
    global $conn;

    $checkEmail = "SELECT * FROM users WHERE email='$email'";
    $result = $conn->query($checkEmail);
    return $result->num_rows > 0;
}

function editUser($userID) {
    global $conn;

    $firstName = $_POST['firstName'] ?? '';
    $lastName = $_POST['lastName'] ?? '';
    $email = $_POST['email'] ?? '';
    $contactNo = $_POST['contactNo'] ?? '';
    $role = $_POST['role'] ?? 'GUEST';

    $sql = "UPDATE users SET
            firstname = '$firstName',
            lastName = '$lastName',
            email = '$email',
            contactNo = '$contactNo',
            role = '$role'
            WHERE userID = '$userID'";
            
    return $conn->query($sql);
}

function logAudit($email, $action) {
    global $conn;

    $sql = "INSERT INTO login_audit(loginName, action) VALUES ('$email', '$action')";

    return $conn -> query($sql);
}

function verifyUserPassword($userID, $password) {
    global $conn;

    $sql = "SELECT password FROM users WHERE userID='$userID'";
    $result = $conn->query($sql);
    $row = $result->fetch_assoc();

    return ($row && password_verify($password, $row['password']));
}
?>