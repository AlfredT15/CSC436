-- A stock holder buying a new stock
INSERT INTO Portfolio 
VALUES (2, 141.32, 10, '2022-10-07', 'AAPL');

SELECT *
FROM Portfolio;

-- Removing the stock from a share holder
DELETE FROM Portfolio
WHERE SHid = 2 AND Ticker = 'AAPL';

-- Removing only a few stocks from a share holder
UPDATE Portfolio
SET Number_of_shares = 5
WHERE SHid = 1 AND Ticker = 'ADBE' AND Date_Acquired = '2022-10-13';

SELECT * FROM Portfolio;

-- See what corporations are investing in
SELECT Name, Ticker, Number_of_shares
FROM Corporation NATURAL LEFT JOIN Share_Holders NATURAL LEFT JOIN Portfolio
WHERE Corporation.SHid = Share_Holders.SHid AND Ticker IS NOT NULL;

SELECT SHid, Ticker, Number_of_shares
FROM Corporation NATURAL LEFT JOIN Portfolio
WHERE Ticker IS NOT NULL;

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
