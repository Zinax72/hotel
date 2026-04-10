<?php 
include("../db.php");

function addPayment($resID, $amount, $payMethod) {
    global $conn;

    $resID = $resID;
    $payMethod = $payMethod;

    $sql = "INSERT INTO payments (resID, amount, payMethod, payStatus)
    VALUES('$resID', '$amount', '$payMethod', 'PAID')";

    return $conn->query($sql);
}

function getAllPayments() {
    global $conn;

    $data = [];
    $sql = "SELECT * FROM payments";

    $result = $conn->query($sql);
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    echo json_encode($data);
}
?>