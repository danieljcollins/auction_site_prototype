<?php
	session_start();

	if(isset($_SESSION["loginUser"]["userId"])){
		echo $_SESSION["loginUser"]["userId"];
	}
	else{
		echo "No user session found";
	}
	
	session_write_close();
?>
