// body onload Javascript for loading auction items on home page
// Load up some auction items to the main page for the user to peruse
function mainPageImageLoad(){
	
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("post", "load_auction_items.php", true);
	xmlhttp.onreadystatechange = function(){
		if(xmlhttp.readyState == XMLHttpRequest.DONE && xmlhttp.status == 200){ //(xmlhttp.readyState == 4 && xmlhttp.status == 200){
			queryResultJSON = JSON.parse(xmlhttp.responseText);
			console.log(queryResultJSON);
			console.log(queryResultJSON[0]["itemImage"]);
			console.log("\"/" + queryResultJSON[0]["itemImage"] + "\"");
			
			var result_length = Object.keys(queryResultJSON).length;
			
			//populate the images with the items
			for(var i = 0; i < result_length; i++){
				var item = "item" + i;
				console.log(item);
				document.getElementById(item).src = "/auction/" + queryResultJSON[i]["itemImage"];
			}
			console.log(xmlhttp.readyState);
			console.log(xmlhttp.status);
								
		}
		else{
			/*
			var queryResultJSON = JSON.parse(xmlhttp.responseText);
			console.log(queryResultJSON);
			document.getElementById("item1").src = queryResultJSON[0]["itemImage"];
			console.log(xmlhttp.readyState);
			console.log(xmlhttp.status);
								
			document.getElementById("test").innerHTML = "Error with AJAX. Try again.";
			*/
		}
	};										
	
	//xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");			
	xmlhttp.send();
	
} //end of mainPageImageLoad() function

// grab the item ID for the item that the user clicked and view the specifics of that item on another page
function viewItem(item, itemId, type){
	if(type == "homepage lookup"){	
		var itemSelected = item;	
		//old way of grabbing item ID
		itemId = queryResultJSON[item]["itemId"];
	}
	else if(type == "search lookup"){
	}
		
	
	document.cookie = "itemId=" + itemId;
	
	window.location.href="view_item.html";			
	
} //end of viewItem() function block		
