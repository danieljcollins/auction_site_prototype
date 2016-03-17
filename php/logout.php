<?php
	session_start();

	if($_SERVER["REQUEST_METHOD"] == "POST"){
		
		//var_dump($_POST);
		
		if(strlen($_POST["usernameLogout"]) > 0){
			$user = $_POST["usernameLogout"];			
			//might need to change session variables later
			if(isset($_SESSION["loginUser"])){
				unset($_SESSION["loginUser"]);  //Is Used To Destroy Specified Session
				echo "User logged out";
			}
			else{
				echo "User session not found = " . $user;
			}			
		}
		else{
			echo "strlen > 0 false User session not found = " . $user;
		}
		
	}
	else{
		echo "It wasn't a POST";
	}
	
	session_write_close();
?>
