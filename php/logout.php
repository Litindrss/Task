<?php 
require('connect.php');
echo "Запущена сессия до выхода: ". $_SESSION['username'] ." " ;
unset($_SESSION['username']);
session_destroy();
echo "Запущена сессия после: ". $_SESSION['username'] ." " ;
?>