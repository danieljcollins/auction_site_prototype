function getCookie(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i=0; i<ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1);
		if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
	}
	return "";
} 

function loadItem(){
	// get the cookie that we stored so we can load the correct item from the database
	itemId = getCookie("itemId");
	console.log("itemId cookie = " + itemId);			

	var queryResultString;
	var queryResultJSON;
	
	<!-- body onload Javascript for loading the auction item that corresponds to the auction item ID sent in via cookie by the home.html -->				
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("post", "./php/load_auction_item.php", true);
	
	var temp = "itemId=";
	var ajaxPost = temp.concat(itemId);
	console.log(ajaxPost);
	
	xmlhttp.onreadystatechange = function(){
		if(xmlhttp.readyState == XMLHttpRequest.DONE && xmlhttp.status == 200){ //(xmlhttp.readyState == 4 && xmlhttp.status == 200){
			//for debugging
			//document.getElementById("debugInfo").innerHTML = xmlhttp.responseText;
			
			queryResultJSON = JSON.parse(xmlhttp.responseText);
			console.log(queryResultJSON);
									
			document.getElementById("itemName").innerHTML = queryResultJSON[0]["itemName"];
			document.getElementById("itemImg").src = queryResultJSON[0]["itemImage"];
			document.getElementById("listPrice").innerHTML = queryResultJSON[0]["listPrice"];
			document.getElementById("itemDescription").innerHTML = queryResultJSON[0]["itemDescription"];								
			
		}					
	};	// ends onreadystatechange = function block	

	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");			
	xmlhttp.send(ajaxPost);
	
	//initializePage();		
} //ends loadItem() function

function placeBid(){
	var bidAmount = document.getElementById("bidAmount").value;
	
	if(!isNaN(bidAmount)){ //would add more specificity for a production website as this isn't precise enough for catching other inputs like hex values etc.
		
		var xhr = new XMLHttpRequest();
		
		xhr.open("post", "./php/place_bid.php", true);
		
		xhr.onreadystatechange = function(){
			if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200){
				document.getElementById("textOutput").innerHTML = xhr.responseText;
			}						
		}
		
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");			
		xhr.send("bidAmount=" + bidAmount + "&itemId=" + itemId);
		console.log("bidAmount=" + bidAmount + "&itemId=" + itemId);
	}
	else{
		document.getElementById("textOutput").innerHTML = "You must enter a decimal value";
	}
		
} //ends placeBid() function block
