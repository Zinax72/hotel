<?php 
include("../db.php");

session_start();

// protect the page
if(!in_array($_SESSION['role'], ['ADMIN', 'MANAGER'])) {
    header("Location: ../../view/loginPage.html");
    exit();
}

$sql = "select res.*, u.userID, u.email, r.roomNo, rt.typeName, d.discountType
from reservations res
join users u ON res.userID = u.userID
join rooms r ON res.roomID = r.roomID
join roomtypes rt ON r.roomTypeID = rt.typeID
left join discount d ON res.discountID = d.discountID
ORDER BY res.createdAt DESC";

$result = $conn->query($sql);

echo"<table border = 1>
<th>RESERVATION ID</th>
<th>GUEST NAME</th>
<th>ROOM NUMBER</th>
<th>ROOM TYPE</th>
<th>CHECK IN</th>
<th>CHECK OUT</th>
<th>GUESTS</th>
<th>PETS</th>
<th>DISCOUNT</th>
<th>NIGHTS</th>
<th>STATUS</th>
<th>BOOKED ON</th>
<th>ACTIONS</th>
";


while ($row = $result->fetch_assoc()){
    echo"<td>";
    echo 
    echo"</td>";

    echo"<td>";
    echo 
    echo"</td>";

    echo"<td>";
    echo 
    echo"</td>";

    echo"<td>";
    echo 
    echo"</td>";

    echo"<td>";
    echo 
    echo"</td>";

    echo"<td>";
    echo 
    echo"</td>";

    echo"<td>";
    echo 
    echo"</td>";

    echo"<td>";
    echo 
    echo"</td>";
    
    echo"<td>";
    echo 
    echo"</td>";
}

?>