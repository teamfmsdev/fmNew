<?php

$serverName =  "localhost";
$userName = "root";
$password = "";
$dbName = "ccfm";

try{
$con = new PDO("mysql:host=$serverName;dbname=$dbName","root","");
// set the PDO error mode to exception
// $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}
catch(PDOException $e){
  echo "Error: " . $e->getMessage();
}

$date = $_GET['date'];
$fmNo = $_GET['fmNo'];

$scheduleJob = $con->prepare("CALL scheduleJob('$date','$fmNo');");

if($scheduleJob->execute()){
  echo json_encode(1);
}else{
  echo json_encode(0);
}


?>