<?php
//Connect with Database to validate user input for login
require_once "./db_password.php";
//include "db_password.php";

//$username = $password = "";
$hashed_password = "";

//var_dump($_POST);

if($_SERVER["REQUEST_METHOD"] == "POST"){
	
	$data_array = $_POST;
	
	//run a loop that goes through the POST data and tests the input before attempting to store the new user information
	foreach($data_array as $key => $key_value){
		if(empty($key) || empty($key_value)){
			print_r("Data not received.");
			die();
		}
		elseif($key == "passwordInput"){
			//print_r("key == passwordInput");
			//we'll hash and salt the password for storage
			print_r("key and key value: " . $key . $key_value);
			test_input($key_value);
			
			$context = hash_init('sha256');
			hash_update($context, $key_value);
			$hashed_password = hash_final($context);
			
			print_r("key and key value: " . $key . $key_value);
			
		}
		else{
			test_input($key_value);
		}
	}	
}

function test_input($data){
	$data = trim($data);
	$data = stripslashes($data);
	$data = htmlspecialchars($data);
	return $data;
}

//Connect to database. Include db_password.php with your MySQL or MariaDB credentials

//open db connection and make sure there isn't a duplicate user, and then attempt to add the new user to the Users table and the Passwords table
try{
	$pdo = new PDO('mysql:host=127.0.0.1;dbname=auction_site_db', $user, $pass); //'mysql:host=localhost;dbname=auction_site_db', $user, $pass);
	
	$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	
	$pdo->beginTransaction();
	//insert user, then possibly query user to see what their newly generated ID is, then use that value to attach a userId to a password_phrase in the Passwords table
	$pdo->exec("INSERT INTO Users (firstName, lastName, userName, emailAddress, itemsSold, password_phrase) VALUES ('{$data_array["firstNameInput"]}','{$data_array["lastNameInput"]}','{$data_array["userNameInput"]}','{$data_array["emailAddressInput"]}', '0', '$hashed_password')"); //'{$data_array["passwordInput"]}')");	//"SELECT * FROM Users WHERE userName EQUALS 'jdoe'");
	$pdo->commit();
	
	//make everything null so it closes the db connection
	$stmt = null; 
	$pdo = null;
	print "INSERT Successful!" . "<br />";
}
catch (PDOException $e){
	print "Failed database transaction!: " . $e->getMessage() . "<br/>";
	$pdo->rollBack();
	die();
}

?>
