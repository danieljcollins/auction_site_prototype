<?php
//Connect with Database to validate user input for login
	require_once "db_password.php";
	//include "db_password.php";

$username = $password = "";

if($_SERVER["REQUEST_METHOD"] == "POST"){
	if(empty($_POST["usernameInput"])){
		//echo "Username is required";
	}
	else{	
		$username = test_input($_POST["usernameInput"]);
		//Check if name only contains letters
		if(!preg_match("/^[a-zA-Z]*$/", $username)){
			//echo "Only letters allowed";
		}
	}
	
	if(empty($_POST["passwordInput"])){
		//echo "Password is required";
	}
	else{
		//Hash the password using sha256 to prepare it for storage
		$password = test_input($_POST["passwordInput"]);
		
		$context = hash_init('sha256');
		hash_update($context, $password);
		$hashed_password = hash_final($context);		
	}	
}

function test_input($data){
	$data = trim($data);
	$data = stripslashes($data);
	$data = htmlspecialchars($data);
	return $data;
}

//Connect to database. Include db_password.php with your MySQL or MariaDB credentials

//open db connection and look for username and password
try{
	//change database name in PDO declaration to your db name
	$pdo = new PDO('mysql:host=127.0.0.1;dbname=auction_site_db', $user, $pass); //'mysql:host=localhost;dbname=auction_site_db', $user, $pass);
		
	$matchStmt = "SELECT * FROM Users WHERE userName='{$username}' AND password_phrase='{$hashed_password}'";
		
	$pass_query_stmt = $pdo->prepare($matchStmt);
	$pass_query_stmt->execute();
	$passwordResult = $pass_query_stmt->fetch(PDO::FETCH_ASSOC);
	
	// we've found a user that is a match, so let's start a session
	if($passwordResult){
		session_start();
		$_SESSION["loginUser"] = array();
		$_SESSION["loginUser"]["username"] = $username;
		$_SESSION["loginUser"]["userId"] = $passwordResult["userId"];
		//$_SESSION["userId"] = "2";//$passwordResult["userId"];
		//print_r($_SESSION["loginUser"]);
		session_write_close();
		
		//print_r($passwordResult);
		//print_r("Successful match");
	}
	else{
		//print_r("Unsuccessful match");
	}
			
	//make everything null so it closes the db connection
	$stmt = null; 
	$pdo = null;
}
catch (PDOException $e){
	//print "Error!: " . $e->getMessage() . "<br/>";
	die();
}

?>
