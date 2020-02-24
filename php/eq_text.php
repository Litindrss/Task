<?php
require('connect.php');

$id=$_POST['id_item'];

$result=mysqli_query($connection, "SELECT * FROM task_items WHERE id='$id'");


$rows = mysqli_num_rows($result);

$response = array();
for ($i = 0 ; $i < $rows ; ++$i)
{
    $row = mysqli_fetch_row($result);
	$response[$i]=$row;
}

echo json_encode($response);
?>