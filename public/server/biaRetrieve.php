<?php

$serverName =  "localhost";
$userName = "root";
$password = "";
$dbName = "ccfm";

try{
$con = new PDO("mysql:host=$serverName;dbname=$dbName","root","");
// set the PDO error mode to exception
$con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}
catch(PDOException $e){
  echo "Error: " . $e->getMessage();
}

$jsonData = false;
$tempArray = false;
$date = $_GET["date"];
  $biaFetch = $con -> prepare("SELECT * FROM `biaschedule` 
  WHERE YEAR(`date`)=YEAR('$date') AND MONTH(`date`)=MONTH('$date')") ;

  if($biaFetch->execute()){
    $resultData = $biaFetch -> fetchAll(PDO::FETCH_ASSOC);

// Check date in array
// If exist, append
// If does not exist, push


    foreach ($resultData as $rowKey => $rowValue) {

      foreach ($resultData[$rowKey] as $columnKey => $columnValue) {

        switch ($columnKey) {
          case "date":
          $tempArray[$rowKey]["date"] = $columnValue;
          break;
          // case "row":
          //   $tempArray[$rowKey]["row"] = $columnValue;           
          //   break;         
          case "fmNo":
            $tempArray[$rowKey]["fmNo"] = $columnValue;        
            break;
            case "priority":
            $tempArray[$rowKey]["priority"] = $columnValue;        
            break;
          case "activities":
            $tempArray[$rowKey]["activities"] = $columnValue;                    
            break;          
          case "status":
            $columnValue == "Closed" ? $columnValue = 1: $columnValue = 0;
            $tempArray[$rowKey]["status"] = $columnValue;
           break;
          default:            
            break;
        }
      }
      // $jsonIndex = array_search($resultData[$rowKey]["date"],array_column($jsonData,"date"));
        // Append child Items array
        // $jsonData[$rowKey]=$tempArray[$rowKey];
    }
    if($tempArray){
      echo json_encode($tempArray);
    }
    else{
      echo json_encode('No data');
    }
    
    
  }else{
    echo false;
  }

  ?>