<?php 
session_start();

if(isset($_SESSION['userID'])) {
    echo json_encode([
        "loggedIN" => true,
        "role" => $_SESSION['role'],
        "firstName" => $_SESSION['firstName'] ?? '',
        "lastName" => $_SESSION['lastName'] ?? '',
        "email" => $_SESSION['email'] ?? '' 
    ]);
} else {
    echo json_encode([
        "loggedIN" => false
    ]);
}

?>