<?php
require('connect.php');

$username=$_SESSION['username'];
	
$result=mysqli_query($connection, "SELECT * FROM users where username='$username'");

$rows = mysqli_num_rows($result);

$row = mysqli_fetch_row($result);

echo json_encode($row);
?>