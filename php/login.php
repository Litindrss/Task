<?php
require('connect.php');

if (isset($_POST['username']) and isset ($_POST['password'])) 
{
	$username=$_POST['username'];
	$password=$_POST['password'];

	$query="SELECT * FROM users WHERE username='$username' and password='$password'";
	$result=mysqli_query($connection, $query);
	$count=mysqli_num_rows($result);

	if ($count==1)
	{
		$_SESSION['username']=$username;
	}
	else
	{
		echo "error";
	}
}
if (isset($_SESSION['username'])) 
{
	$userHeader=$_SESSION['username'];
	echo $userHeader;
}
?>