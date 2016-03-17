<?php
	
	require_once "db_password.php";	

	if($_SERVER["REQUEST_METHOD"] == "POST"){
		$userId = $_POST["userId"];
		//echo "POST=" . $_POST["userId"];
	}
	else{
		//echo "it wasn't a post";
	}
	
	//Connect to database. Include db_password.php with your MySQL or MariaDB credentials
	
	try{
		$pdo = new PDO('mysql:host=127.0.0.1;dbname=auction_site_db', $GLOBALS["user"], $GLOBALS["pass"]);//$user, $pass);
		
		// then we are looking for the last three transactions that this user has performed
		$transactionString = "SELECT * FROM Transactions WHERE userId=:userId"; 
			
		$trans_stmt = $pdo->prepare($transactionString);
		$trans_stmt->execute(array(":userId" => $GLOBALS["userId"]));
		$transQueryResult = $trans_stmt->fetchAll(PDO::FETCH_BOTH);
				
		//print_r($transQueryResult);
		
		if($transQueryResult){
			echo json_encode(array_values($transQueryResult));
		}
		else{
			//echo "no results found";
		}
		
		//make everything null so it closes the db connection
		$trans_stmt = null; 
		$pdo = null;
	}
	catch(PDOException $e){
		echo "there was a db error!";
		die();
	}
?>
