// Search functions for finding auction items

// master JSON object var which holds all queries returned in one var
var queryResultJSON = [];

//set vars to default values so php script can detect which one was used easily
var sName = "0";
var sDescription = "0";
var sPrice = "0";

// var to keep track of rows added to table
var rowCount = 0;

//this function will append search results to a table based on either the item name, description or price, depending
//on which html button was pressed
function searchItems(searchType){
	// reset variables (for each call) so the php script can detect which ones are empty or not for future searches
	sName = "0";
	sDescription = "0";
	sPrice = "0";
	
	// no user input filtering here, add that later
	if(searchType == 'name'){
		sName = document.getElementById("searchName").value;
	}
	else if(searchType == 'description'){
		sDescription = document.getElementById("searchDescription").value;
	}
	else if(searchType == 'price'){
		sPrice = document.getElementById("searchPrice").value;		
	}
	
	var ajaxString = "sName=" + sName + "&sDescription=" + sDescription + "&sPrice=" + sPrice;
	console.log(ajaxString);
	
	var xhr = new XMLHttpRequest();
	xhr.open("post","./php/search_items.php", true);
	xhr.onreadystatechange = function(){
		if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200){
			
			// return strings from php for debug purposes (to see echo's and what not)
			/*
			json_result = JSON.stringify(xhr.responseText);
			//document.getElementById("test").innerHTML = json_result;
			//console.log(json_result);
			//console.log("response text= " + xhr.responseText);
			*/
			//end of stringify debugging block			
			
			json_result = JSON.parse(xhr.responseText);
			var table = document.getElementById("resultsTable");
			
			// determine number of rows returned so that I can dynamically generate an html table to display data
			var result_length = Object.keys(json_result).length;
									
			var itemNameCell = [];
			var itemDescriptionCell = [];
			var itemPriceCell = [];
			
			//populate the table rows with the items
			for(var i = 0; i < result_length; i++){
				
				// add the query results to the query master (cumulative results of all queries)
				queryResultJSON.push(json_result[i]);
				//console.log(queryResultJSON[i]["itemId"]);
				console.log(json_result);
				console.log("item id within for loop " + json_result[i]["itemId"]);
				var itemId = json_result[i]["itemId"];
				
				//add a new row at the bottom of the table
				var row = table.insertRow();
				//add new cells for each column of the data
				itemNameCell.push(row.insertCell(0));
				itemDescriptionCell.push(row.insertCell(1));
				itemPriceCell.push(row.insertCell(2));
				
				// populate the new cells with the column data from the JSON object array
				itemNameCell[i].innerHTML = json_result[i]["itemName"];
				itemDescriptionCell[i].innerHTML = json_result[i]["itemDescription"];
				itemPriceCell[i].innerHTML = json_result[i]["listPrice"];
				
				// add a function call when the user clicks one of the newly created cells
				// each function call will send in the itemId so that it can access the appropriate item for viewing
				itemNameCell[i].addEventListener("click", sendItemId, false);
				itemDescriptionCell[i].addEventListener("click", sendItemId, false);
				itemPriceCell[i].addEventListener("click", sendItemId, false);
				
				rowCount++;
			}				
		}
		else{
			//document.getElementById("test").innerHTML = "Request was not sent.";
		}
		//console.log(queryResultJSON);
	}
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.send(ajaxString);
} //ends searchItems() function block

// This function will capture the click event on a table cell in the resultsTable element and 
// find out the itemId of the clicked item, and send it to viewItem() which will then create
// a cookie of the id and send it to view_item.html
// viewItem() is a separate function because user click events could be from the search page or the main page,
// and each is slightly different in how they have access to variables and such.
// Could probably refactor a few aspects of how this works to have one or two less functions
function sendItemId(e){
	//determine what was clicked
	var clickedItem = e.target.innerHTML;
	//alert(clickedItem);
	
	// check current query results for match and then send itemId that matches
	// possibility of name collision here, as two different items could have same name or description but different
	// itemId's and prices, but workable for this prototype project
	
	var array_length = Object.keys(queryResultJSON).length;
	for(var i = 0; i < array_length; i++){
		if(queryResultJSON[i]["itemName"] == clickedItem || queryResultJSON[i]["itemDescription"] == clickedItem || queryResultJSON[i]["listPrice"] == clickedItem){
			viewItem(queryResultJSON[i]["itemId"],queryResultJSON[i]["itemId"], "search lookup");
		}
	}
}

// this function will clear search text input fields, and remove the rows of table results from previous searches
function clearSearch(){
	//clear out HTML input elements
	document.getElementById("searchName").value = "";
	document.getElementById("searchDescription").value = "";
	document.getElementById("searchPrice").value = "";
	
	// reset variables so the php script can detect which ones are empty or not for future searches
	sName = "0";
	sDescription = "0";
	sPrice = "0";
	
	var table = document.getElementById("resultsTable");
	// delete all of the rows
	for(var i = 0; i < rowCount; i++){
		table.deleteRow(rowCount-i);		
	}
	rowCount = 0;
} //ends clearResults() function block
