//changing this to have the actual field values in assoc array. if field has no value it would come up false anyway
//loop through associative array and add up true results. an empty field would mean false and thus, not ready to send data. if all fields are true then we are ready to send the data to php script
var readyToSend = false;
var sum = 0;	//represents the number of fields filled
var temp = "";

//make sure all of the fields are full
// fieldFilled is an array which will have false or true in each element to ensure that each HTML element has been filled and is ready to send to the php script to add the information to the database
// this makes sure that an incomplete form is not sent
var fieldFilled = [];
fieldFilled["itemName"] = "";
fieldFilled["itemDescription"] = "";
fieldFilled["listPrice"] = "";
fieldFilled["itemImage"] = "";

function addItem(){
					
	if(!document.getElementById("itemName").value){
		document.getElementById("itemNameResponse").innerHTML = "Field cannot be empty";
		fieldFilled["itemName"] = "";
	}
	else{
		document.getElementById("itemNameResponse").innerHTML = "";
		fieldFilled["itemName"] = document.getElementById("itemName").value;;
	}
	
	if(!document.getElementById("itemDescription").value){
		document.getElementById("itemDescriptionResponse").innerHTML = "Field cannot be empty";
		fieldFilled["itemDescription"] = "";
	}
	else{
		document.getElementById("itemDescriptionResponse").innerHTML = "";
		fieldFilled["itemDescription"] = document.getElementById("itemDescription").value;
	}
	
	if(!document.getElementById("listPrice").value){
		document.getElementById("listPriceResponse").innerHTML = "Field cannot be empty";
		fieldFilled["listPrice"] = "";
	}
	else{
		document.getElementById("listPriceResponse").innerHTML = "";
		fieldFilled["listPrice"] = document.getElementById("listPrice").value;
	}							
	
	for(var key in fieldFilled){
		if(fieldFilled[key] != ""){
			sum += 1;
			//console.log(key + " : " + fieldFilled[key] + "\n");
		}					
	}
	
	// If all three fields are filled, we should make an AJAX string with the data to send to the PHP script
	if(sum == 3){
		readyToSend = true;					
		//var ajaxPost = temp.concat("itemNameInput=", fieldFilled["itemName"], "&itemDescriptionInput=", fieldFilled["itemDescription"], "&listPriceInput=", fieldFilled["listPrice"], "&itemImageInput=", fieldFilled["itemImage"]);					
	}
	
	addImage();
	
} //end of addItem() function

function addImage(){				
	
	var form = document.getElementById("fileForm");
	var fileSelect = document.getElementById("fileSelect");
	var submitButton = document.getElementById("submitButton");
	
	//event.preventDefault();	//prevent the browser from submitting the form so we can upload using AJAX instead
					
	if(readyToSend == true){
		submitButton.innerHTML = "Uploading...";
	
		// Get the selected files from the input
		var files = fileSelect.files;
		
		// create new FormData object, which is used to construct the key/value pairs which form the data payload for the AJAX request
		var formData = new FormData();
		
		// loop through each of the files
		for(var i = 0; i < files.length; i++){
			var file = files[i];
			
			// check the file type
			if(!file.type.match("image.*")){
				continue;
			}
			
			// add the file to the AJAX request
			formData.append("photos[]", file, file.name);
		}
		
		// add the string data from the text fields to the form data object
		formData.append("itemNameInput", fieldFilled["itemName"]);
		formData.append("itemDescriptionInput", fieldFilled["itemDescription"]);
		formData.append("listPriceInput", fieldFilled["listPrice"]);
							
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function(){
			if(xmlhttp.readyState == XMLHttpRequest.DONE && xmlhttp.status == 200){
				document.getElementById("debugInfo").innerHTML = xmlhttp.responseText;
			}
			else{
				document.getElementById("debugInfo").innerHTML = "Server connection failed. Try again.";
			}
		};
							
		xmlhttp.open("POST", "add_item.php");
		//xmlhttp.setRequestHeader("Content-Type", "multipart/form-data");					
		xmlhttp.send(formData);
	} // end of readyToSend block
	else{
		document.getElementById("debugInfo").innerHTML = "Required fields are empty.";
	}				
} // end of addImage() function block
