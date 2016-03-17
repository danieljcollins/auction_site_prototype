<?php
	require_once "./db_password.php";	

	session_start();
	
	$username;
	$userId;
	$bidAmount;
	$itemId;
	
	// determine if there is a logged in user or not
	if(isset($_SESSION["loginUser"]["username"])){
	
		$username = $_SESSION["loginUser"]["username"];
		
		if($_SERVER["REQUEST_METHOD"] == "POST"){
			$bidAmount = $_POST["bidAmount"];
			$itemId = $_POST["itemId"];
		}
		else{
			die();
		}
		
		//With input tested, connect to database. Include db_password.php with your MySQL or MariaDB credentials
		
		//open db connection and make sure there isn't a duplicate user, and then attempt to add the new user to the Users table and the Passwords table
		try{
			$pdo = new PDO('mysql:host=127.0.0.1;dbname=auction_site_db', $user, $pass); //'mysql:host=localhost;dbname=auction_site_db', $user, $pass);
			
			$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			
			// first we need to grab the user id of the user who placing a bid.
			$userStmt = "SELECT userId FROM Users WHERE userName='{$username}'";
		
			$user_query_stmt = $pdo->prepare($userStmt);
			$user_query_stmt->execute();
			$userResult = $user_query_stmt->fetch(PDO::FETCH_ASSOC);
			
			print_r("user ID = " . $userId);
			print_r("user result = " . $userResult["userId"]);
			print_r("item ID = " . $itemId);
			/*
			// then we need to grab the item id of the item being bid on			
			$itemStmt = "SELECT itemId FROM Users WHERE userName='{$username}'";			
			
			$item_query_stmt = $pdo->prepare($itemStmt);
			$item_query_stmt->execute();
			$itemResult = $item_query_stmt->fetch(PDO::FETCH_ASSOC);
			*/
			$pdo->beginTransaction();
			$pdo->exec("INSERT INTO Transactions(userId, itemId, bid) VALUES ('{$userResult["userId"]}', '{$itemId}', '{$bidAmount}')");
			//$pdo->exec("INSERT INTO Users (firstName, lastName, userName, emailAddress, itemsSold, password_phrase) VALUES ('{$data_array["firstNameInput"]}','{$data_array["lastNameInput"]}','{$data_array["userNameInput"]}','{$data_array["emailAddressInput"]}', '0', '$hashed_password')"); //'{$data_array["passwordInput"]}')");	//"SELECT * FROM Users WHERE userName EQUALS 'jdoe'");
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
		
	} // ends if isset($_SESSION) block
	else{
		echo "No user logged in";
	}

?>
