<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
include 'db.php';

$property_id = $_GET['property_id'] ?? '';

if ($property_id !== '') {
    $stmt = $conn->prepare(
        "SELECT a.amenity_id, a.amenity_name, a.icon
         FROM amenities a
         JOIN property_amenities pa ON pa.amenity_id = a.amenity_id
         WHERE pa.property_id = ?"
    );
    $stmt->bind_param("i", $property_id);
    $stmt->execute();
    $result = $stmt->get_result();
} else {
    $result = $conn->query("SELECT amenity_id, amenity_name, icon FROM amenities ORDER BY amenity_name");
}

$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode(["status" => "success", "count" => count($data), "data" => $data], JSON_PRETTY_PRINT);
?>
