README for "Auctions Online" Prototype Project

The purpose of this project is to demonstrate my web development skills.

The idea behind the project is to create a simple website that allows users to auction items, or place bids on listed items.

Directory Structure for site:

auction
	base directory/ - where html and css are located
    /uploads/ - where user uploads go
    /pictures/ - where pictures for decorating the site go (not currently used)
    /js/ - where javascript files go 
    /php/ - where php scripts currently live
    /php/db_password.php - define $user and $pass as your MySQL/MariaDB user name and password in a simple php file    
    
    
Site Functionality:

Here is where you can find out what the site actually does, rather than guessing:

- User can register an account in the DB (not a ton of validation or duplicate user checks at this time)
- User can then sign in
- User can upload a picture along with some data of an "auction item" that they want to list for sale
- Adding items to the database expands the home page to load up the first 12 items for your perusal; items are clickable, which takes you to the item's page for more information
- User can place bids on items (no duplicate bid checks, or other validation checks at this time)
- Once logged in, user can click on their username (at top of page) and see their bid history (adding more info and interaction here is on a to-do list)
- User can search for items in the database by name, description and price
- Name and description require an exact match (of at least a substring within the db record); price searches return all matches at or below the indicated price
- Search results are clickable and take you to the relevant item page for more information
- User can log out to end their session
    
