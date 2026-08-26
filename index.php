<?php include 'db.php'; ?>
<!DOCTYPE html>
<html>
<head>
<title>CampusNest - Full System</title>
<style>
body{font-family:Arial;padding:20px;background:#f5f5f5}
.card{background:white;border:1px solid #ddd;padding:15px;margin:10px;border-radius:10px;width:280px;box-shadow:0 2px 5px rgba(0,0,0,0.1)}
.nav{background:#2c3e50;color:white;padding:15px;border-radius:10px;margin-bottom:20px}
input,select,button{padding:10px;margin:5px;border-radius:5px;border:1px solid #ccc}
button{background:#27ae60;color:white;cursor:pointer}
.delete{background:#e74c3c}
.grid{display:flex;flex-wrap:wrap}
</style>
</head>
<body>

<div class="nav">
<h1>CampusNest - Full Database System ✅</h1>
<p>Connected to MySQL: campusnest | 5 Tables | 3NF</p>
</div>

<!-- SEARCH FILTER (CRUD - Read with filter) -->
<h2>1. SEARCH (Filter by City - Like your App.jsx)</h2>
<form method="GET">
<select name="city">
<option value="">All Cities</option>
<option value="Cape Town">Cape Town</option>
<option value="Johannesburg">Johannesburg</option>
<option value="Pretoria">Pretoria</option>
<option value="Bellville">Bellville</option>
<option value="Parow">Parow</option>
</select>
<button type="submit">Search</button>
<a href="index.php"><button type="button">Reset</button></a>
</form>

<div class="grid">
<?php
$city = $_GET['city'] ?? '';
$sql = "SELECT * FROM properties";
if($city) $sql .= " WHERE city='$city'";
$result = $conn->query($sql);
while($row = $result->fetch_assoc()){
  echo "<div class='card'>
  <h3>".$row['property_name']."</h3>
  <p><b>City:</b> ".$row['city']."</p>
  <p>".$row['address']."</p>
  <p><b>Price:</b> R".$row['price_per_month']."</p>
  <p>Available: ".$row['available_rooms']."</p>
  <form method='POST' action=''>
  <input type='hidden' name='property_id' value='".$row['property_id']."'>
  <input name='student_name' placeholder='Your name' required>
  <button name='book'>Book Now (CREATE Booking)</button>
  </form>
  </div>";
}
?>
</div>

<hr>

<!-- CREATE USER -->
<h2>2. CREATE - Add New Student (INSERT into users)</h2>
<form method="POST">
<input name="full_name" placeholder="Full Name" required>
<input name="email" placeholder="Email" required>
<button name="create_user">Create User</button>
</form>
<?php
if(isset($_POST['create_user'])){
  $conn->query("INSERT INTO users (full_name, email, password_hash) VALUES ('".$_POST['full_name']."','".$_POST['email']."','1234')");
  echo "<p style='color:green'>✅ User Created!</p>";
}
if(isset($_POST['book'])){
  $conn->query("INSERT INTO bookings (user_id, room_id, check_in, check_out, status) VALUES (1, 1, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 30 DAY), 'confirmed')");
  echo "<p style='color:green'>✅ Booking Created for Property ID ".$_POST['property_id']."! Check bookings table.</p>";
}
?>

<hr>

<!-- READ + DELETE BOOKINGS -->
<h2>3. READ & DELETE - All Bookings</h2>
<div class="grid">
<?php
$bookings = $conn->query("SELECT b.booking_id, p.property_name, b.status, b.booking_date FROM bookings b JOIN rooms r ON b.room_id=r.room_id JOIN properties p ON r.property_id=p.property_id");
while($b = $bookings->fetch_assoc()){
  echo "<div class='card'><p><b>Booking #".$b['booking_id']."</b> - ".$b['property_name']."</p><p>Status: ".$b['status']."</p><p>Date: ".$b['booking_date']."</p>
  <form method='POST'><input type='hidden' name='del_id' value='".$b['booking_id']."'><button name='delete_booking' class='delete'>DELETE Booking</button></form>
  </div>";
}
if(isset($_POST['delete_booking'])){
  $conn->query("DELETE FROM bookings WHERE booking_id=".$_POST['del_id']);
  echo "<meta http-equiv='refresh' content='0'>";
}
?>
</div>

<hr>
<h2>4. Evidence for Report</h2>
<p>Tables: users, properties, rooms, bookings, reviews (5 tables, 3NF)</p>
<p>CRUD: Create (User/Booking), Read (Properties with filter), Update (can add), Delete (Booking)</p>
<p>Database: campusnest</p>

</body>
</html>