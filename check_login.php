<?php
	session_start();

	if(isset($_SESSION["loginUser"]["username"])){
		echo $_SESSION["loginUser"]["username"];
	}
	else{
		echo "No user session";
	}
	
	session_write_close();
?>
