<?php 
include("../db.php");

function getRevenuePerMonth() {
    global $conn;

    $data = [];
    $sql = "SELECT DATE_FORMAT(p.payDate, '%Y-^m') AS month, SUM(p.amount) AS revenue
            FROM payments p
            WHERE p.payStatus = 'PAID'
            GROUP BY month
            ORDER BY month ASC";
    
    $result = $conn->query($sql);
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    echo json_encode($data);
}

function getMostBookedRoomTypes() {
    global $conn;

    $data = [];
    $sql = "SELECT rt.typeName, COUNT(res.resID) AS bookingCount
    FROM reservations res
    JOIN rooms r ON res.roomID = r.roomID
    JOIN roomtypes rt ON r.roomTypeID = rt.typeID
    GROUP BY rt.typeName
    ORDER BY bookingCount DESC";

    $result = $conn->query($sql);
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    echo json_encode($data);

}


function getOccupancyRate() {
    global $conn;

    $data = [];
    $sql = "SELECT r.roomNo, rt.typeName,
            COUNT(res.resID) AS totalBoookings,
            SUM(DATEDIFF(res.checkOut, res.checkIn)) AS totalNights
            FROM rooms r
            JOIN roomtypes rt ON r.roomTypeID = rt.typeID
            LEFT JOIN reservations res ON r.roomID = res.roomID
            AND res.status IN('CONFIRMED', 'COMPLETED')
            AND res.checkIn != '0000-00-00'
            GROUP BY r.roomID
            ORDER BY totalNights DESC";
    
    $result = $conn->query($sql);
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    echo json_encode($data);
}

function getMostFrequentGuests() {
    global $conn;

    $data = [];
    $sql = "SELECT u.userID, u.firstName, u.lastName, u.email,
    COUNT(res.resID) AS totalBookings,
    SUM(res.totalPrice) AS totalSpent
    FROM users u
    JOIN reservations res ON u.userID = res.userID
    WHERE u.role = 'GUEST'
    GROUP BY u.userID
    ORDER BY totalBookings DESC
    LIMIT 10";

    $result = $conn->query($sql);
    while($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    echo json_encode($data);
}
?>