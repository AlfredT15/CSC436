CREATE TABLE Stock_Exchange
(
  Exchange_ID INT NOT NULL,
  Country INT NOT NULL,
  Currency INT NOT NULL,
  Exchange_Name INT NOT NULL,
  PRIMARY KEY (Exchange_ID)
);

CREATE TABLE Sector
(
  Sector_ID INT NOT NULL,
  Sector_Name INT NOT NULL,
  PRIMARY KEY (Sector_ID)
);

CREATE TABLE Stock_Index
(
  Index_ID INT NOT NULL,
  Index_Name INT NOT NULL,
  PRIMARY KEY (Index_ID)
);

CREATE TABLE Share_Holders
(
  SHid INT NOT NULL,
  Name INT NOT NULL,
  PRIMARY KEY (SHid)
);

CREATE TABLE Corporation
(
  SHid INT NOT NULL,
  PRIMARY KEY (SHid),
  FOREIGN KEY (SHid) REFERENCES Share_Holders(SHid)
);

CREATE TABLE Investor
(
  SHid INT NOT NULL,
  PRIMARY KEY (SHid),
  FOREIGN KEY (SHid) REFERENCES Share_Holders(SHid)
);

CREATE TABLE Portfolio
(
  Date_Acquired INT NOT NULL,
  Ticker INT NOT NULL,
  Price_per_share INT NOT NULL,
  Number_of_shares INT NOT NULL,
  SHid INT NOT NULL,
  PRIMARY KEY (SHid),
  FOREIGN KEY (SHid) REFERENCES Share_Holders(SHid)
);

CREATE TABLE Public_Stock
(
  Stock_ID INT NOT NULL,
  Ticker INT NOT NULL,
  Open_Price INT NOT NULL,
  Close_Price INT NOT NULL,
  Days_Range INT NOT NULL,
  Shares_Outstanding INT NOT NULL,
  Volume INT NOT NULL,
  Date INT NOT NULL,
  Exchange_ID INT NOT NULL,
  Sector_ID INT NOT NULL,
  SHid INT NOT NULL,
  PRIMARY KEY (Stock_ID),
  FOREIGN KEY (Exchange_ID) REFERENCES Stock_Exchange(Exchange_ID),
  FOREIGN KEY (Sector_ID) REFERENCES Sector(Sector_ID),
  FOREIGN KEY (SHid) REFERENCES Corporation(SHid)
);

CREATE TABLE Tracked_by
(
  Index_ID INT NOT NULL,
  Stock_ID INT NOT NULL,
  PRIMARY KEY (Index_ID, Stock_ID),
  FOREIGN KEY (Index_ID) REFERENCES Stock_Index(Index_ID),
  FOREIGN KEY (Stock_ID) REFERENCES Public_Stock(Stock_ID)
);

CREATE TABLE Owned_by
(
  SHid INT NOT NULL,
  Stock_ID INT NOT NULL,
  PRIMARY KEY (SHid, Stock_ID),
  FOREIGN KEY (SHid) REFERENCES Share_Holders(SHid),
  FOREIGN KEY (Stock_ID) REFERENCES Public_Stock(Stock_ID)
);
