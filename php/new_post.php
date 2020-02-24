<?php 
require('connect.php');
if (isset($_POST['username']) && ($_POST['email']) && ($_POST['text']))
{
	$username=$_POST['username'];
	$email=$_POST['email'];
	$text=$_POST['text'];

	$query="INSERT INTO task_items (username, email, text) VALUES ('$username', '$email', '$text')";
	$result=mysqli_query($connection, $query);

	if ($result){

	}else{
		echo "error";
	}
}
?>