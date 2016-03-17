function getUserId(userId){
	
	var xhr = new XMLHttpRequest();
	xhr.open("post", "check_user_id.php", false);	//synchronous because we need this to finish before next ajax call
	xhr.onreadystatechange = function(){
		if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200){
			userId = xhr.responseText;
			console.log("userId within getUserId()=" + userId);
			//return userId;
		}
		else{
			//return 9999;
		}
	}
	xhr.send();
	
	return userId;
}

function getUserTransactions(userId){
	var xhrUser = new XMLHttpRequest();
	xhrUser.open("post", "view_user.php", false);	//synchronous because we need this to finish before next ajax call
	xhrUser.onreadystatechange = function(){
		if(xhrUser.readyState == XMLHttpRequest.DONE && xhrUser.status == 200){
			//document.getElementById("textOutput").innerHTML = xhrUser.responseText;
			
			//console.log("responseText = " + xhrUser.responseText);
			var queryResultJSON = JSON.parse(xhrUser.responseText);
			//console.log(queryResultJSON);
			
			var result_length = Object.keys(queryResultJSON).length;
			
			var itemIdCell = [];			
			var itemBidCell = [];
		
			//populate the table with the data
			var table = document.getElementById("tTable");
			
			for(var i = 0; i < result_length; i++){
								
				//add a new row at the bottom of the table
				var row = table.insertRow();
				//add new cells for each column of the data
				itemIdCell.push(row.insertCell(0));				
				itemBidCell.push(row.insertCell(1));				
				
				// populate the new cells with the column data from the JSON object array
				itemIdCell[i].innerHTML = queryResultJSON[i]["itemId"];				
				itemBidCell[i].innerHTML = queryResultJSON[i]["bid"];
				
				
				// add a function call when the user clicks one of the newly created cells
				// each function call will send in the itemId so that it can access the appropriate item for viewing
				//itemIdCell[i].addEventListener("click", sendItemId, false);
				//itemBidCell[i].addEventListener("click", sendItemId, false);
				
			}									
			
		}
		else{
			
		}
	};
	xhrUser.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	
	
	xhrUser.send("userId=" + userId);
}

//load user data
function loadUserData(){
	var userId = getUserId(userId);
	
	getUserTransactions(userId);
	
}							

