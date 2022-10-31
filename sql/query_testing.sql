SELECT * 
FROM Portfolio p
LEFT JOIN Public_Stock ps
ON ps.Ticker = p.Ticker and ps.Stock_date = p.Date_Acquired;