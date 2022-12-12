LOAD DATA LOCAL INFILE '/home/alfred/Code/School/CSC436/CSC436/data/Stock_Exchange.csv'
INTO TABLE Stock_Exchange
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE '/home/alfred/Code/School/CSC436/CSC436/data/Sector.csv'
INTO TABLE Sector
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE '/home/alfred/Code/School/CSC436/CSC436/data/Stock_Index.csv'
INTO TABLE Stock_Index
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE '/home/alfred/Code/School/CSC436/CSC436/data/Share_Holders.csv'
INTO TABLE Share_Holders
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE '/home/alfred/Code/School/CSC436/CSC436/data/Corporation.csv'
INTO TABLE Corporation
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE '/home/alfred/Code/School/CSC436/CSC436/data/Investor.csv'
INTO TABLE Investor
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

LOAD DATA LOCAL INFILE '/home/alfred/Code/School/CSC436/CSC436/data/Portfolio.csv'
INTO TABLE Portfolio
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

SELECT * FROM Portfolio;

LOAD DATA LOCAL INFILE '/home/alfred/Code/School/CSC436/CSC436/data/Public_Stock.csv'
INTO TABLE Public_Stock
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

SELECT * FROM Public_Stock;

LOAD DATA LOCAL INFILE '/home/alfred/Code/School/CSC436/CSC436/data/Tracked_by.csv'
INTO TABLE Tracked_by
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

-- SELECT * FROM Tracked_by;

LOAD DATA LOCAL INFILE '/home/alfred/Code/School/CSC436/CSC436/data/Owned_by.csv'
INTO TABLE Owned_by
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

-- SELECT * FROM Owned_by;


