<?php 
session_start();
include "../db.php";
include("../model/rooms.php");

$action = isset($_GET['action']) ? $_GET['action'] : '';
switch ($action) {
    case 'getAvailableRooms':
        getAvailableRooms();    
        break;
    case 'getAllRooms':
        getAllRooms();
        break;
}
?>