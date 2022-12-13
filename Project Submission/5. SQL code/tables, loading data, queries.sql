create schema if not exists Stock_Database;
use Stock_Database;



-- creating tables
CREATE TABLE Stock_Exchange
(
  Exchange_ID INT PRIMARY KEY auto_increment,
  Country VARCHAR(15) NOT NULL,
  Currency CHAR(3) NOT NULL,
  Exchange_Name VARCHAR(30) NOT NULL
);

CREATE TABLE Sector
(
  Sector_ID INT PRIMARY KEY auto_increment,
  Sector_Name VARCHAR(30) NOT NULL
);

CREATE TABLE Stock_Index
(
  Index_ID INT PRIMARY KEY auto_increment,
  Index_Name VARCHAR(30) NOT NULL
);

CREATE TABLE Share_Holders
(
  SHid INT PRIMARY KEY auto_increment,
  SHName VARCHAR(50) NOT NULL
);

CREATE TABLE Corporation
(
  SHid INT PRIMARY KEY,
  FOREIGN KEY (SHid) REFERENCES Share_Holders(SHid) ON DELETE CASCADE
);

CREATE TABLE Investor
(
  SHid INT PRIMARY KEY,
  FOREIGN KEY (SHid) REFERENCES Share_Holders(SHid) ON DELETE CASCADE
);

CREATE TABLE Portfolio
(
  SHid INT NOT NULL,
  Price_per_share NUMERIC(9,2) NOT NULL,
  Number_of_shares NUMERIC(15) NOT NULL,
  Date_Acquired DATE NOT NULL,
  Ticker CHAR(5),
  CONSTRAINT CHK_Portfolio CHECK (Price_per_share > 0 AND Number_of_shares > 0),
  FOREIGN KEY (SHid) REFERENCES Share_Holders(SHid) ON DELETE CASCADE
);

CREATE TABLE Public_Stock
(
  Ticker CHAR(5),
  Stock_date DATE,
  Open_Price NUMERIC(9,2) NOT NULL,
  Close_Price NUMERIC(9,2) NOT NULL,
  Volume NUMERIC(15) NOT NULL,
  Exchange_ID INT NOT NULL,
  Sector_ID INT NOT NULL,
  Corporation_ID INT NOT NULL,
  CONSTRAINT CHK_Public_Stock CHECK (Open_Price > 0 AND Close_Price > 0 AND Volume > 0),
  PRIMARY KEY(Ticker, Stock_date),
  FOREIGN KEY (Exchange_ID) REFERENCES Stock_Exchange(Exchange_ID) ON DELETE CASCADE,
  FOREIGN KEY (Sector_ID) REFERENCES Sector(Sector_ID) ON DELETE CASCADE,
  FOREIGN KEY (Corporation_ID) REFERENCES Corporation(SHid) ON DELETE CASCADE
);

CREATE TABLE Tracked_by
(
  Index_ID INT auto_increment,
  Ticker CHAR(5),
  PRIMARY KEY(Index_ID, Ticker),
  FOREIGN KEY (Index_ID) REFERENCES Stock_Index(Index_ID) ON DELETE CASCADE,
  FOREIGN KEY (Ticker) REFERENCES Public_Stock(Ticker) ON DELETE CASCADE
);

SELECT * FROM Tracked_by;

CREATE TABLE Owned_by
(
  SHid INT,
  Ticker CHAR(5),
  PRIMARY KEY(SHid, Ticker),
  FOREIGN KEY (SHid) REFERENCES Share_Holders(SHid) ON DELETE CASCADE,
  FOREIGN KEY (Ticker) REFERENCES Public_Stock(Ticker) ON DELETE CASCADE
);



-- loading data from local files
-- make sure to change the directory before using!
LOAD DATA LOCAL INFILE 'CHANGETHIS/Project Submission/SQL code/data/Stock_Exchange.csv'
INTO TABLE Stock_Exchange
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE 'CHANGETHIS/Project Submission/SQL code/data/Sector.csv'
INTO TABLE Sector
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE 'CHANGETHIS/Project Submission/SQL code/data/Stock_Index.csv'
INTO TABLE Stock_Index
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE 'CHANGETHIS/Project Submission/SQL code/data/Share_Holders.csv'
INTO TABLE Share_Holders
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE 'CHANGETHIS/Project Submission/SQL code/data/Corporation.csv'
INTO TABLE Corporation
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE 'CHANGETHIS/Project Submission/SQL code/data/Investor.csv'
INTO TABLE Investor
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE 'CHANGETHIS/Project Submission/SQL code/data/Portfolio.csv'
INTO TABLE Portfolio
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

SELECT * FROM Portfolio;

LOAD DATA LOCAL INFILE 'CHANGETHIS/Project Submission/SQL code/data/Public_Stock.csv'
INTO TABLE Public_Stock
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

SELECT * FROM Public_Stock;

LOAD DATA LOCAL INFILE 'CHANGETHIS/Project Submission/SQL code/data/Tracked_by.csv'
INTO TABLE Tracked_by
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

-- SELECT * FROM Tracked_by;

LOAD DATA LOCAL INFILE 'CHANGETHIS/Project Submission/SQL code/data/Owned_by.csv'
INTO TABLE Owned_by
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

-- SELECT * FROM Owned_by;



-- various queries

-- A stock holder buying a new stock
INSERT INTO Portfolio 
VALUES (2, 141.32, 10, '2022-10-07', 'AAPL');

SELECT *
FROM Portfolio;

INSERT INTO Portfolio (SHid, Price_per_share, Number_of_shares, Date_acquired, Ticker) 
VALUES ((SELECT SHid FROM Share_Holders WHERE SHName = 'Google'),120.20, 10, '2022-10-07', 'TSLA');

revoke insert on Portfolio from temp;

SHOW GRANTS FOR 'temp'@'%';

-- Removing the stock from a share holder
DELETE FROM Portfolio
WHERE SHid = 2 AND Ticker = 'AAPL';

-- Removing only a few stocks from a share holder
UPDATE Portfolio
SET Number_of_shares = 5
WHERE SHid = 1 AND Ticker = 'ADBE' AND Date_Acquired = '2022-10-13';

SELECT * FROM Share_Holders;

-- See what corporations are investing in
SELECT SHName as Name, Ticker, Number_of_shares
FROM Share_Holders NATURAL LEFT JOIN Portfolio
WHERE Ticker IS NOT NULL AND SHId NOT IN (SELECT SHid FROM Corporation);

select * from Share_Holders;

ALTER TABLE Share_Holders RENAME COLUMN Name TO SHName;

insert into Corporation Values(LAST_INSERT_ID());

select * from Corporation;

-- Assuring check condition works
#INSERT INTO Portfolio 
#VALUES (2, -141.32, 10, '2022-10-07', 'AAPL');

-- Joining each public stock entry with what index tracks that stock
SELECT *
FROM Public_Stock p
LEFT JOIN Tracked_by t
ON p.Ticker = t.Ticker
LEFT JOIN Stock_Index si
ON t.Index_ID = si.Index_ID;

-- Getting the average purchase price of all stocks in every portfolio
SELECT Ticker, AVG(Price_per_share) as Average_purchase_price
FROM Portfolio
GROUP BY Ticker
ORDER BY Average_purchase_price DESC;

-- Getting the average purchase price of all stocks in specific portfolio
SELECT Ticker, SHName as Name,  AVG(Price_per_share) as Average_purchase_price
FROM  Share_Holders NATURAL JOIN Portfolio
WHERE SHName = "Bank of America"
GROUP BY Ticker, SHName
ORDER BY Average_purchase_price DESC;

SELECT  SHName as Name, Ticker, Number_of_shares as Quantity, Price_per_share as Price, Date_Acquired as Date
FROM  Share_Holders NATURAL JOIN Portfolio
WHERE SHName = "Bank of America"
GROUP BY Ticker, SHName
ORDER BY Average_purchase_price DESC;

-- Getting the name of every shareholder, the company they are invested in, and what industry that company is in
SELECT Name, Ticker, Sector_Name
FROM Share_Holders
NATURAL JOIN Portfolio
LEFT JOIN (SELECT DISTINCT Ticker, Sector_Name
FROM Public_Stock
LEFT JOIN Sector
USING(Sector_ID)) as sub
USING(Ticker);

-- Getting the total sum of the amount of stock bought after a certain date
SELECT SUM(Price_per_share*Number_of_shares) as Sum_Total_Bought
FROM Portfolio
WHERE Date_Acquired > '2022-10-10';

-- Getting the average price for stocks sold on each exchange
SELECT AVG(Price_per_share) as Average_Price_per_Share, Exchange_Name
FROM Portfolio
NATURAL JOIN (SELECT DISTINCT Ticker, Exchange_Name
FROM Public_Stock
LEFT JOIN Stock_Exchange
USING (Exchange_ID)) as sub
WHERE Exchange_Name = 'NASDAQ'
GROUP BY Exchange_Name;

#Find transactions done by shareholders in certain month
SELECT  EXTRACT(Month FROM Date_acquired) AS month,
		COUNT(number_of_shares) AS Shareholder_transactions,
        Sum(number_of_shares) AS Shareholder_stock_purchase_number
FROM portfolio
GROUP BY EXTRACT(Month FROM Date_acquired)
ORDER BY EXTRACT(Month FROM Date_acquired) ASC;

#Find all of a shareholders portfolio
select * from share_holders inner join portfolio
where share_holders.SHid = portfolio.SHid;

#View of total amount in money shareholders spent
CREATE VIEW Total_spent AS
SELECT SHid, SUM(Price_per_share * Number_of_shares) as Total_spent
FROM Portfolio
GROUP BY SHid;

SELECT *
FROM Total_spent;

CREATE INDEX When_Bought
ON Portfolio (SHid, Date_Acquired);

SELECT SHid
FROM Portfolio USE INDEX(When_Bought)
WHERE Date_Acquired = '2022-10-13';
