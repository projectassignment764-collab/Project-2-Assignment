<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
include 'db.php';

$city = $_GET['city'] ?? '';
$sql = "SELECT DISTINCT property_id, property_name, city, address, price_per_month, available_rooms FROM properties";
if($city) {
    $sql .= " WHERE city LIKE '%".$conn->real_escape_string($city)."%'";
}
$result = $conn->query($sql);
$data = [];
while($row = $result->fetch_assoc()){ $data[] = $row; }

echo json_encode(["status"=>"success", "count"=>count($data), "data"=>$data], JSON_PRETTY_PRINT);
?>