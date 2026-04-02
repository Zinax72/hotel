<?php 
session_start();

if(isset($_SESSION['userID'])) {
    echo json_encode([
        "loggedIN" => true,
        "role" => $_SESSION['role'],
        "firstName" => $_SESSION['firstName'] ?? ''
    ]);
} else {
    echo json_encode([
        "loggedIN" => false
    ]);
}

?>