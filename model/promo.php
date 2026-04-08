<?php 
include("../db.php");

function getAllPromotions() {
    global $conn;

    $data = [];
    $sql = "SELECT * FROM promotions ORDER BY startDate DESC";

    $result = $conn->query($sql);

    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }   
    echo json_encode($data);
}

function getPromotionByID($promoID) {
    global $conn;
    $sql = "SELECT * FROM promotions WHERE promoID = '$promoID'";

    $result = $conn->query($sql);
    return $result->fetch_assoc();
}

function getActivePromotions() {
    global $conn;

    $data = [];
    $sql = "SELECT * FROM promotions 
            WHERE status = 'ACTIVE' 
            AND CURDATE() BETWEEN startDate AND endDate 
            ORDER BY discountPercent DESC";

    $result = $conn->query($sql);

    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    echo json_encode($data);
}

function addPromotion() {
    global $conn;

    $promoName       = isset($_POST['promoName']) ? $_POST['promoName'] : '';
    $discountPercent = isset($_POST['discountPercent']) ? $_POST['discountPercent'] : 0;
    $startDate       = isset($_POST['startDate']) ? $_POST['startDate'] : '';
    $endDate         = isset($_POST['endDate']) ? $_POST['endDate'] : '';
    $status          = isset($_POST['status']) ? $_POST['status'] : 'ACTIVE';

    $sql = "INSERT INTO promotions (promoName, discountPercent, startDate, endDate, status) 
            VALUES ('$promoName', '$discountPercent', '$startDate', '$endDate', '$status')";

    return $conn->query($sql);
}

function updatePromotion($promoID) {
    global $conn;

    $promoName       = isset($_POST['promoName']) ? $_POST['promoName'] : '';
    $discountPercent = isset($_POST['discountPercent']) ? $_POST['discountPercent'] : 0;
    $startDate       = isset($_POST['startDate']) ? $_POST['startDate'] : '';
    $endDate         = isset($_POST['endDate']) ? $_POST['endDate'] : '';
    $status          = isset($_POST['status']) ? $_POST['status'] : 'ACTIVE';

    $sql = "UPDATE promotions SET 
            promoName = '$promoName',
            discountPercent = '$discountPercent',
            startDate = '$startDate',
            endDate = '$endDate',
            status = '$status'
            WHERE promoID = '$promoID'";

    return $conn->query($sql);
}

function deletePromotion($promoID) {
    global $conn;

    $sql = "DELETE FROM promotions WHERE promoID = '$promoID'";

    return $conn->query($sql);
}

?>