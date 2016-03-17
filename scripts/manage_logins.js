// These two vars are for grabbing auction items from the DB and then storing them in JSON for usage with the DOM
//var queryResultString;
var queryResultJSON;

var sessionUser;

function attemptLogin(){
	var uInput = document.getElementById("usernameInput").value;
	var pInput = document.getElementById("passwordInput").value;
	
	//console.log(uInput);
	//console.log(pInput);
	
	var temp = "";
	
	var ajaxPost = temp.concat("usernameInput=", uInput, "&passwordInput=", pInput);			
	//console.log(ajaxPost);
	
	if(uInput.length === 0){
		// change this later to nicer-looking error, like different layout of objects in form or something
		document.getElementById("usernameInput").value = "Name field can't be empty";
		return;
	}
	else if(pInput.length === 0){
		document.getElementById("passwordInput").value = "Password field can't be empty";
		return;
	}
	else{
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function(){
			if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
				document.getElementById("test").innerHTML = xmlhttp.responseText;
				location.reload(true);	//reload the page, force it to get a new copy and not a cached copy						
			}
			else{
				document.getElementById("test").innerHTML = "Sign-in failed. Try again.";
			}
		};
									
		xmlhttp.open("post", "login.php", true);
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");			
		xmlhttp.send(ajaxPost);
	}
}

function logout(){
	var xmlhttp = new XMLHttpRequest();
	
	xmlhttp.open("post", "logout.php", true);
	
	xmlhttp.onreadystatechange = function(){
		if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
			document.getElementById("test").innerHTML = xmlhttp.responseText;						
		}
		else{
			document.getElementById("test").innerHTML = "Log out failed. Try again.";
		}
	};
								
	
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");			
	
	var temp = "";			
	var ajaxPost = temp.concat("usernameLogout=", sessionUser);
	console.log("ajaxPost for logout: " + ajaxPost);
	xmlhttp.send(ajaxPost);
} //ends function logout() block

function checkLoginStatus(){
	
	// Check login status
	var xhr = new XMLHttpRequest();
	xhr.open("post", "check_login.php", true);
	xhr.onreadystatechange = function(){
		if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200){
			sessionUser = xhr.responseText;
			
			if(sessionUser == "No user session"){
				document.getElementById("loginInput").style.display = "block"; // show
				document.getElementById("userInfo").style.display = "none"; // hide
				console.log("no user session");
			}
			else if(sessionUser.length > 0){
				document.getElementById("loginInput").style.display = "none"; //hide
				document.getElementById("userInfo").style.display = "block"; // show
				document.getElementById("usernameAHREF").innerHTML = sessionUser;
				console.log("user session found: " + sessionUser);				
			}
		}
	}
	xhr.send();	
} // ends function checkLoginStatus
/*
function getUserId(){
	var userId = 0;
	var xhr = new XMLHttpRequest();
	xhr.open("post", "check_user_id.php", true);
	xhr.onreadystatechange = function(){
		if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200){
			userId = xhr.responseText;
			console.log("userId within getUserId()=" + userId);
			return userId;
		}
		else{
			return 9999;
		}
	}
	xhr.send();	
}
*/
