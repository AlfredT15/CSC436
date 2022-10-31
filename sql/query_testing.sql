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
SELECT SUM(Price_per_share*Number_of_shares)
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