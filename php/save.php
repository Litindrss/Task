<?php 
require('connect.php');

	$id=$_POST['id'];
	$status=$_POST['status'];
	$text=$_POST['text'];

	$query = "UPDATE task_items SET status='$status', text='$text' WHERE id='$id'";

	$result =mysqli_query($connection, $query);

	if ($result){
	}else{
		echo "error";
	}
?>