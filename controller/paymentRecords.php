<?php
session_start();
include("../db.php");
include_once("../model/payments.php");

if(!isset($_SESSION['userID']) || 
   !in_array($_SESSION['role'], ['MANAGER', 'ADMIN'])) {
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
    case 'getAllPayments':
        getAllPayments();
}

?>