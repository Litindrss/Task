<?php
require('connect.php');

$order=$_POST['order'];
$by=$_POST['by'];


if ($by=='true') {
	$result=mysqli_query($connection, "SELECT * FROM task_items ORDER BY $order ASC");
}else{
	$result=mysqli_query($connection, "SELECT * FROM task_items ORDER BY $order DESC");
}


$rows = mysqli_num_rows($result);

$response = array();
for ($i = 0 ; $i < $rows ; ++$i)
{
    $row = mysqli_fetch_row($result);
	$response[$i]=$row;
}

echo json_encode($response);
?>