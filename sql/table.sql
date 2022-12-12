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
