//this function will make sure all fields are filled and that the passwords match, then send an Ajax request to a PHP script which will make sure that there
// aren't any existing users with that user name and then update the Users and Passwords table with the user information (in the php script)
function attemptRegistration(){
	//make sure all of the fields are full
	
	// fieldFilled is an array which will have false or true in each element to ensure that each HTML element has been filled and is ready to send to the php script to add the information to the database
	// this makes sure that an incomplete form is not sent
	var fieldFilled = [];
	fieldFilled["firstName"] = "";
	fieldFilled["lastName"] = "";
	fieldFilled["emailAddress"] = "";
	fieldFilled["userName"] = "";
	fieldFilled["password"] = "";
	fieldFilled["retypePassword"] = "";
					
	if(!document.getElementById("firstName").value){
		document.getElementById("firstNameResponse").innerHTML = "Field cannot be empty";
		fieldFilled["firstName"] = "";
	}
	else{
		document.getElementById("firstNameResponse").innerHTML = "";
		fieldFilled["firstName"] = document.getElementById("firstName").value;;
	}
	
	if(!document.getElementById("lastName").value){
		document.getElementById("lastNameResponse").innerHTML = "Field cannot be empty";
		fieldFilled["lastName"] = "";
	}
	else{
		document.getElementById("lastNameResponse").innerHTML = "";
		fieldFilled["lastName"] = document.getElementById("lastName").value;
	}
	
	if(!document.getElementById("emailAddress").value){
		document.getElementById("emailResponse").innerHTML = "Field cannot be empty";
		fieldFilled["emailAddress"] = "";
	}
	else{
		document.getElementById("emailResponse").innerHTML = "";
		fieldFilled["emailAddress"] = document.getElementById("emailAddress").value;
	}
	
	if(!document.getElementById("userName").value){
		document.getElementById("userNameResponse").innerHTML = "Field cannot be empty";
		fieldFilled["userName"] = "";
	}
	else{
		document.getElementById("userNameResponse").innerHTML = "";
		fieldFilled["userName"] = document.getElementById("userName").value;
	}
	
	if(!document.getElementById("password").value){
		document.getElementById("passwordResponse").innerHTML = "Field cannot be empty";
		fieldFilled["password"] = "";
	}
	else{
		document.getElementById("passwordResponse").innerHTML = "";
		fieldFilled["password"] = document.getElementById("password").value;
	}
	
	if(!document.getElementById("retypePassword").value){
		document.getElementById("retypePasswordResponse").innerHTML = "Field cannot be empty";
		fieldFilled["retypePassword"] = "";
	}
	else{
		document.getElementById("retypePasswordResponse").innerHTML = "";
		fieldFilled["retypePassword"] = document.getElementById("retypePassword").value;
	}
	
	if(fieldFilled["password"] !== fieldFilled["retypePassword"]){
		document.getElementById("passwordResponse").innerHTML = "Password fields do not match";
		document.getElementById("retypePasswordResponse").innerHTML = "Password fields do not match";
	}
	else{
	
	//changing this to have the actual field values in assoc array. if field has no value it would come up false anyway
	//loop through associative array and add up true results. an empty field would mean false and thus, not ready to send data. if all fields are true then we are ready to send the data to php script
	var readyToSend = false;
	var sum = 0;	//represents the number of fields filled
	var temp = "";
	
	for(var key in fieldFilled){
		if(fieldFilled[key] != ""){
			sum += 1;
			//console.log(key + " : " + fieldFilled[key] + "\n");
		}					
	}
	}//end of else if passwords match block
	// If all six fields are filled, we should make an Ajax string with the data to send to the PHP script
	if(sum == 6){
		readyToSend = true;
		//console.log("readyToSend == true");
		var ajaxPost = temp.concat("firstNameInput=", fieldFilled["firstName"], "&lastNameInput=", fieldFilled["lastName"], "&emailAddressInput=", fieldFilled["emailAddress"], "&userNameInput=", fieldFilled["userName"], "&passwordInput=", fieldFilled["password"]);
		console.log(ajaxPost);
	}
	
	
	if(readyToSend == true){
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function(){
			if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
				document.getElementById("debugInfo").innerHTML = xmlhttp.responseText;
			}
			else{
				document.getElementById("debugInfo").innerHTML = "Server connection failed. Try again.";
			}
		};
									
		xmlhttp.open("post", "register.php", true);
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");			
		xmlhttp.send(ajaxPost);
	}				
}
