<?php 
include("../db.php");

fucntion getDashboard() {
    global $conn;

    $data = [];
    $sql = " select months,total from sales";

    $result = $conn->query($sql);

    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    echo json_encode($data);
}
?>