<?php
	require_once "./db_password.php";
	//include "db_password.php";
//Connect with Database to get AuctionItem information, including image info to populate main page with auction items to peruse

//error reporting features (very useful)
//ini_set('display_errors','On');
//error_reporting(E_ALL);

if($_SERVER["REQUEST_METHOD"] == "POST"){
	
	
}

//Connect to database. Include db_password.php with your MySQL or MariaDB credentials

//open db connection and look for AuctionItems to send to the home page
try{
	//change database name in PDO declaration to your db name
	$pdo = new PDO('mysql:host=127.0.0.1;dbname=auction_site_db', $user, $pass); //'mysql:host=localhost;dbname=auction_site_db', $user, $pass);
	
	$matchStmt = "SELECT * FROM AuctionItems LIMIT 12";
	$query_stmt = $pdo->prepare($matchStmt);
	$query_stmt->execute();
	$queryResult = $query_stmt->fetchAll(PDO::FETCH_ASSOC);
		
	if($queryResult){
		echo json_encode(array_values($queryResult));		//($queryResult, JSON_HEX_QUOT | JSON_HEX_TAG);	
	}	
	
	//make everything null so it closes the db connection
	$query_stmt = null; 
	$pdo = null;
}
catch (PDOException $e){
	print "Error!: " . $e->getMessage() . "<br/>";
	die();
}

?>
