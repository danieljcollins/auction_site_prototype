<?php

require_once "./db_password.php";

//error reporting features (very useful)
//ini_set('display_errors',1);
//error_reporting(E_ALL);

//indicates which user is running php. useful for file server permissions
//echo exec('whoami');

//print_r(var_dump($_POST));
//print_r(var_dump($_FILES));

$target_file = "";
$target_dir = "";
$username;

session_start();

// determine if there is a logged in user or not
if(isset($_SESSION["loginUser"])){
	
	$username = $_SESSION["loginUser"]["username"];
	
if($_SERVER["REQUEST_METHOD"] == "POST"){
	
	$data_array = $_POST;
	$file_name_array = array();
	$file_type_array = array();
	$photo_array = array();	
	
	//run a loop that goes through the POST data and tests the input before attempting to store the new user information
	foreach($data_array as $key => $key_value){
		if(empty($key) || empty($key_value)){
			print_r("Data not received.");
			die();
		}
		else{
			test_input($key_value);
		}
	}
	
	if(!empty($_FILES)){
		foreach($_FILES["photos"]["name"] as $data){
			array_push($file_name_array, $data);
		}
		foreach($_FILES["photos"]["type"] as $data){
			array_push($file_type_array, $data);
		}
		test_files($file_type_array);
	}
	
	//var_dump($file_name_array);
	//var_dump($file_type_array);
	
	//work on uploading the file to the server now
	$target_dir = 'uploads';
	$target_file = $_FILES["photos"]["tmp_name"][0]; //basename($_FILES["photos"]["name"][0]); //"{$target_dir}{$_FILES["photos"]["name"][0]}";	//basename($_FILES["photos"]["name"]);
	$file_name = $_FILES["photos"]["name"][0];
	$uploadOk = 1;
	$imageFileType = pathinfo($file_name); //pathinfo($target_file,PATHINFO_EXTENSION);
	print_r("FILES= " . $_FILES["photos"]["name"][0] . " target_file= " . $target_file . " imageFileType=" . $imageFileType["extension"] . " Temp name = " . $_FILES["photos"]["tmp_name"][0]);
	// Check if image file is a actual image or fake image, getimagesize works by getting width and height of an image, if there's a width and height,
	// it's a good way to see that it's an actual image
	$check = getimagesize($_FILES["photos"]["tmp_name"][0]);
	if($check !== false){
		echo "File is an image - " . $check["mime"] . ".";
		$uploadOk = 1;
	} else {
		echo "File is not an image.";
		$uploadOk = 0;
	}
	
	// Check if file already exists
	if (file_exists("$target_dir/$file_name")) {
		echo "Sorry, file already exists.";
		$uploadOk = 0;
	}
	// Check file size
	if ($_FILES["photos"]["size"][0] > 20000000) {
		echo "Sorry, your file is too large.";
		$uploadOk = 0;
	}
	// Allow certain file formats
	if($imageFileType["extension"] != "jpg" && $imageFileType["extension"] != "png" && $imageFileType["extension"] != "jpeg"
	&& $imageFileType["extension"] != "gif" ) {
		echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
		$uploadOk = 0;
	}
	// Check if $uploadOk is set to 0 by an error
	if ($uploadOk == 0) {
		echo "Sorry, your file was not uploaded.";
	// if everything is ok, try to upload file
	} else {
		if(move_uploaded_file($target_file, "$target_dir/$file_name")){ //"{$target_dir}/{$target_file}")) {
			echo "The file ". basename($_FILES["photos"]["name"][0]). " has been uploaded.";
		}else {
			echo "Sorry, there was an error uploading your file.";
		}
	}
		
	try{
		
		$pdo = new PDO('mysql:host=127.0.0.1;dbname=auction_site_db', $user, $pass);
		
		$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		
		// first we need to grab the user id; so I can link the auction item to whom has submitted it.
		$matchStmt = "SELECT userId FROM Users WHERE userName='{$username}'";
		
		$user_query_stmt = $pdo->prepare($matchStmt);
		$user_query_stmt->execute();
		$userResult = $user_query_stmt->fetch(PDO::FETCH_ASSOC);
		
		print_r($userResult["userId"]);
		
		$pdo->beginTransaction();
		
		$pdo->exec("INSERT INTO AuctionItems (itemName, itemDescription, listPrice, itemImage, userId) VALUES ('{$data_array["itemNameInput"]}', '{$data_array["itemDescriptionInput"]}', '{$data_array["listPriceInput"]}', '{$target_dir}/{$file_name}', '{$userResult["userId"]}')");
		
		$pdo->commit();
		
		//make everything null so it closes the db connection
		$matchStmt = null; 
		$pdo = null;
		print_r("{$target_file} INSERT Successful!" . "<br />");
	}
	catch (PDOException $e){
		print_r("Failed database transaction!: " . $e->getMessage() . "<br/>");
		$pdo->rollBack();
		die();
	}
	
}

} //ends if isset $_SESSION
else{
	print_r("not logged in");
}

function test_input($data){
	$data = trim($data);
	$data = stripslashes($data);
	$data = htmlspecialchars($data);
	return $data;
}

function test_files($data){
	var_dump($data);
	foreach($data as $d){
		if($d !== "image/jpeg" && $d !== "image/png"){
			print_r("File is not of a supported format. Please select a supported file (jpeg/png).");
			die();
		}
	}
}

?>
