<?php
$conn = new mysqli("localhost", "root", "", "campusnest");
if ($conn->connect_error) { 
  die("Connection failed: " . $conn->connect_error); 
}
?>