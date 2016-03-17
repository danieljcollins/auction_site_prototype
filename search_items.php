<?php
require_once "./db_password.php";

//error reporting features (very useful)
ini_set('display_errors','On');
error_reporting(E_ALL);
//var_dump($_POST);
	
	function searchName($name){
		//Connect to database. Include db_password.php with your MySQL or MariaDB credentials
	
		try{
			if(!isset($pdo)){
				$pdo = new PDO('mysql:host=127.0.0.1;dbname=auction_site_db', $GLOBALS["user"], $GLOBALS["pass"]);//'root', 'pizza64');
			}
			$queryString = 'SELECT * FROM AuctionItems WHERE itemName LIKE :itemName'; //= :itemName'; 
			//$queryString = "SELECT * FROM AuctionItems"; //for debugging
			
			$query = $pdo->prepare($queryString);
			
			//take name variable, add SQL wildcards to find more results
			//$wildcard = "%";
			//$iName = {$wildcard}{$GLOBALS["name"]}{$wildcard};
			//print_r($iName);
			//$name = "fdfd";
			
			$query->execute(array(':itemName' => $name));//$GLOBALS["name"]));	//$name));
			$query_result = $query->fetchAll(PDO::FETCH_BOTH);
			
			if($query_result){
				//echo json_encode(array_values($query_result));
				return json_encode(array_values($query_result));
			}
			else{
				//echo "No match was found";
				echo json_encode(array_values(["itemName"=>"failed", "itemDescription"=>"db query", "itemPrice"=>"match"]));
			}
			
			//make everything null so it closes the db connection
			$query = null; 
			$pdo = null;			
			
		}
		catch(PDOException $e){
			//echo json_encode(array_values(["itemName"=>"failed", "itemDescription"=>"db query", "itemPrice"=>"match"]));
			die();
		}
	
	} // ends function searchName() block
	
	function searchDescription($description){
		//Connect to database. Include db_password.php with your MySQL or MariaDB credentials
	
		try{
			if(!isset($pdo)){
				$pdo = new PDO('mysql:host=127.0.0.1;dbname=auction_site_db', $GLOBALS["user"], $GLOBALS["pass"]); //$user, $pass);
			}
			
			$queryString = 'SELECT * FROM AuctionItems WHERE itemDescription LIKE :itemDescription'; //= :itemName'; 
			//$queryString = "SELECT * FROM AuctionItems"; //for debugging
			
			$query = $pdo->prepare($queryString);
			
			//take name variable, add SQL wildcards to find more results
			//$wildcard = "%";
			//$iName = {$wildcard}{$GLOBALS["name"]}{$wildcard};
			//print_r($iName);
			//$name = "fdfd";
			
			$query->execute(array(':itemDescription' => $description));//$GLOBALS["name"]));	//$name));
			$query_result = $query->fetchAll(PDO::FETCH_BOTH);
			
			if($query_result){
				//echo json_encode(array_values($query_result));
				return json_encode(array_values($query_result));
			}
			else{
				//echo "No match was found";
				//echo json_encode(array_values(["itemName"=>"failed", "itemDescription"=>"db query", "itemPrice"=>"match"]));
			}
			
			//make everything null so it closes the db connection
			$query = null; 
			$pdo = null;			
			
		}
		catch(PDOException $e){
			//echo json_encode(array_values(["itemName"=>"failed", "itemDescription"=>"db query", "itemPrice"=>"match"]));
			die();
		}
	
	} // ends function searchDescription() block
	
	function searchPrice($price){
		//Connect to database. Include db_password.php with your MySQL or MariaDB credentials
	
		try{
			if(!isset($pdo)){
				$pdo = new PDO('mysql:host=127.0.0.1;dbname=auction_site_db', $GLOBALS["user"], $GLOBALS["pass"]);	//'root', 'pizza64');
			}
			$queryString = 'SELECT * FROM AuctionItems WHERE listPrice <= :listPrice'; //= :itemName'; 
			//$queryString = "SELECT * FROM AuctionItems"; //for debugging
			
			$query = $pdo->prepare($queryString);
			
			//take name variable, add SQL wildcards to find more results
			//$wildcard = "%";
			//$iName = {$wildcard}{$GLOBALS["name"]}{$wildcard};
			//print_r($iName);
			//$name = "fdfd";
			
			$query->execute(array(':listPrice' => $price));//$GLOBALS["name"]));	//$name));
			$query_result = $query->fetchAll(PDO::FETCH_BOTH);
			
			if($query_result){
				//echo json_encode(array_values($query_result));
				return json_encode(array_values($query_result));
			}
			else{
				//echo "No match was found";
				//echo json_encode(array_values(["itemName"=>"failed", "itemDescription"=>"db query", "itemPrice"=>"match"]));
			}
			
			//make everything null so it closes the db connection
			$query = null; 
			$pdo = null;			
			
		}
		catch(PDOException $e){
			//echo json_encode(array_values(["itemName"=>"failed", "itemDescription"=>"db query", "itemPrice"=>"match"]));
			die();
		}
	
	} // ends function searchPrice() block
	
	if($_SERVER['REQUEST_METHOD'] == 'POST'){
		$name = $_POST["sName"];
		$description = $_POST["sDescription"];
		$price = $_POST["sPrice"];
		
		if(!empty($name)){
			echo searchName($name);
			//print_r("searching name");
		}
		elseif(!empty($description)){
			echo searchDescription($description);
		}
		elseif(!empty($price)){
			echo searchPrice($price);
		}
	}	
?>
