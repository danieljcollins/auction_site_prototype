<?php
	//require_once "db_password.php";
	include "./db_password.php";
//Connect with Database to get AuctionItem information, for a single item

// This will store the item id if we are looking for one id specifically
$itemId = 0;

if($_SERVER["REQUEST_METHOD"] == "POST"){
	
	//if(!empty($_POST["itemId"]) && intval($_POST["itemId"]) >= 37)){
		// Then we are specifically looking for one auction item
		$GLOBALS["itemId"] = $_COOKIE["itemId"];
		//var_dump($_COOKIE);
	//}	
}

//Connect to database. Include db_password.php with your MySQL or MariaDB credentials

//open db connection and look for AuctionItems to send to the home page
try{
	//change database name in PDO declaration to your db name if you're running this code
	$pdo_single = new PDO('mysql:host=127.0.0.1;dbname=auction_site_db', $user, $pass); //'mysql:host=localhost;dbname=auction_site_db', $user, $pass);
	
	// then we are looking for a specific item so we will look it up
	$itemMatchStmt = "SELECT * FROM AuctionItems WHERE itemId=:itemId";  //'39'";	//{$GLOBALS["$itemId"]}";	//{$_POST["itemId"]}";
		
	$item_stmt = $pdo_single->prepare($itemMatchStmt);
	$item_stmt->execute(array(":itemId" => $GLOBALS["itemId"]));
	$itemQueryResult = $item_stmt->fetchAll(PDO::FETCH_BOTH);
	
	//echo $itemMatchStmt;
	//print_r($itemQueryResult);
	
	if($itemQueryResult){
		echo json_encode(array_values($itemQueryResult));
	}
	
	//make everything null so it closes the db connection
	$itemMatchStmt = null; 
	$pdo_single = null;
}
catch (PDOException $e){
	print "Error!: " . $e->getMessage() . "<br/>";
	die();
}

?>
