CREATE DATABASE auction_site_db;

use auction_site_db;

CREATE TABLE `Users`
(
`userId` int NOT NULL AUTO_INCREMENT,
`firstName` varchar(255) NOT NULL,
`lastName` varchar(255) NOT NULL,
`userName` varchar(255) NOT NULL,
`emailAddress` varchar(255),
`itemsSold` int,
`password_phrase` varchar(255),
`reputationPoints` int,
`joinDate` DATE,
PRIMARY KEY(`userId`)
);

CREATE TABLE `AuctionItems`
(
`itemId` int NOT NULL AUTO_INCREMENT,
`itemName` varchar(255) NOT NULL,
`itemDescription` varchar(255) NOT NULL,
`category` varchar(255),
`listPrice` DECIMAL(15,2) NOT NULL,
`itemImage` varchar(255),
`userId` int NOT NULL,
PRIMARY KEY(`itemId`),
FOREIGN KEY(`userId`) REFERENCES Users(userId)
);

CREATE TABLE `Transactions`
(
`transactionId` int NOT NULL AUTO_INCREMENT,
`userId` int NOT NULL,
`itemId` int NOT NULL,
`bid` DECIMAL(15,2) NOT NULL,
PRIMARY KEY(`transactionId`),
FOREIGN KEY(`userId`) REFERENCES Users(userId),
FOREIGN KEY(`itemId`) REFERENCES AuctionItems(itemId)
);
