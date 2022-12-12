const express = require("express");
const router = express.Router();
const pool = require("../config/db.js");

// <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
// Cool Queries
// <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>

router.get("/cq", async (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;

    try {
      const qry = `SELECT Name, Ticker, Number_of_shares
            FROM Corporation NATURAL LEFT JOIN Share_Holders NATURAL LEFT JOIN Portfolio
            WHERE Corporation.SHid = Share_Holders.SHid AND Ticker IS NOT NULL`;
      conn.query(qry, (err, result) => {
        conn.release();
        if (err) throw err;
        res.send(JSON.stringify(result));
      });
    } catch (err) {
      console.log(err);
      res.end();
    }
  });
});

// <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
// DDL Queries
// <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>

router.post("/insertTable", async (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;

    const qry =
      "CREATE TABLE " + req.body.tableName + " ( " + req.body.tableInfo + " );";
    console.log(req.body);
    conn.query(qry, (err, data) => {
      if (err) throw err;
    });
  });
});

router.post("/dropTable", async (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;

    const qry = "DROP TABLE " + req.body.tableName + ";";
    console.log(req.body);
    conn.query(qry, (err, data) => {
      if (err) throw err;
    });
  });
});

router.post("/alterTable", async (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;

    const qry =
      "ALTER TABLE " +
      req.body.tableName +
      " " +
      req.body.opType +
      " " +
      req.body.tableInfo +
      ";";
    console.log(req.body);
    conn.query(qry, (err, data) => {
      if (err) throw err;
    });
  });
});

router.post("/truncateTable", async (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;

    const qry = "TRUNCATE TABLE " + req.body.tableName + ";";
    console.log(req.body);
    conn.query(qry, (err, data) => {
      if (err) throw err;
    });
  });
});

router.post("/renameTable", async (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;

    const qry =
      "RENAME TABLE " +
      req.body.tableName +
      " TO " +
      req.body.newTableName +
      ";";
    console.log(req.body);
    conn.query(qry, (err, data) => {
      if (err) throw err;
    });
  });
});

router.post("/createIndex", async (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;

    const qry =
      "CREATE INDEX " +
      req.body.indexName +
      " ON " +
      req.body.tableInfo +
      " );";
    console.log(req.body);
    conn.query(qry, (err, data) => {
      if (err) throw err;
    });
  });
});

router.post("/createView", async (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;

    var qry =
      "CREATE VIEW " +
      req.body.indexName +
      " AS SELECT " +
      req.body.columnName +
      " FROM " +
      req.body.tableName;

    if (req.body.where) {
      qry += " WHERE " + req.body.condition;
    }
    if (req.body.groupBy) {
      qry += " GROUP BY " + req.body.conditionGroupBy;
    }
    if (req.body.orderBy) {
      qry += " ORDER BY " + req.body.conditionOrderBy;
    }
    console.log(req.body);
    conn.query(qry, (err, data) => {
      if (err) throw err;
    });
  });
});

// <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
// DML Queries
// <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>

router.post("/insertIntoTable", async (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;

    var qry =
      "INSERT INTO " +
      req.body.tableName +
      " VALUES ( " +
      req.body.value +
      " );";
    if (req.body.columnName) {
      qry =
        "INSERT INTO " +
        req.body.tableName +
        "(" +
        req.body.columnName +
        ") VALUES ( " +
        req.body.value +
        " );";
    }

    console.log(req.body);
    conn.query(qry, (err, data) => {
      if (err) throw err;
    });
  });
});

router.post("/updateTable", async (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;

    var qry = "UPDATE " + req.body.tableName + " SET " + req.body.value + ";";
    if (req.body.condition) {
      qry =
        "UPDATE " +
        req.body.tableName +
        " SET " +
        req.body.value +
        " WHERE " +
        req.body.condition +
        ";";
    }

    console.log(req.body);
    conn.query(qry, (err, data) => {
      if (err) throw err;
    });
  });
});

router.post("/deleteTable", async (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;

    var qry =
      "DELETE FROM " +
      req.body.tableName +
      " WHERE " +
      req.body.condition +
      ";";
    console.log(req.body);
    conn.query(qry, (err, data) => {
      if (err) throw err;
    });
  });
});

// <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
// DQL Queries
// <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>

router.post("/select", async (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;

    var qry = "SELECT " + req.body.columnName + " FROM " + req.body.tableName;
    if (req.body.where) {
      qry += " WHERE " + req.body.condition;
    }
    if (req.body.groupBy) {
      qry += " GROUP BY " + req.body.conditionGroupBy;
    }
    if (req.body.orderBy) {
      qry += " ORDER BY " + req.body.conditionOrderBy;
    }
    console.log(req.body);
    conn.query(qry, (err, data) => {
      if (err) throw err;
      console.log(JSON.stringify(data));
      // res.send(JSON.stringify(data));
    });
  });
});

router.post("/selectJoin", async (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;

    var qry = "SELECT " + req.body.columnName + " FROM " + req.body.tableName;
    if (req.body.joinType === "natural") {
      qry += " NATURAL ";
    }
    if (req.body.joinOpType === "left") {
      qry += " LEFT JOIN ";
    }
    if (req.body.joinOpType === "right") {
      qry += " RIGHT JOIN ";
    }
    if (req.body.joinOpType === "regular") {
      qry += " JOIN ";
    }
    qry += req.body.joinTable;
    if (req.body.joinType === "none") {
      qry += " ON " + req.body.joinOn;
    }

    if (req.body.where) {
      qry += " WHERE " + req.body.condition;
    }
    if (req.body.groupBy) {
      qry += " GROUP BY " + req.body.conditionGroupBy;
    }
    if (req.body.orderBy) {
      qry += " ORDER BY " + req.body.conditionOrderBy;
    }
    console.log(req.body);
    conn.query(qry, (err, data) => {
      if (err) throw err;
      console.log(JSON.stringify(data));
      // res.send(JSON.stringify(data));
    });
  });
});

router.post("/selectCustom", async (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;

    var qry =
      "SELECT " +
      req.body.columnName +
      " FROM " +
      req.body.tableName +
      " " +
      req.body.freeForm;

    console.log(req.body);
    conn.query(qry, (err, data) => {
      if (err) throw err;
      conn.release();
      console.log(JSON.stringify(data));
      // res.send(JSON.stringify(data));
    });
  });
});

// <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
// DCL Queries
// <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>

router.post("/grant", async (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;

    const qry =
      "GRANT " +
      req.body.privilege +
      " ON " +
      req.body.object +
      " TO " +
      req.body.user;
    console.log(req.body);
    conn.query(qry, (err, data) => {
      if (err) throw err;
    });
  });
});

router.post("/revoke", async (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;

    const qry =
      "REVOKE " +
      req.body.privilege +
      " ON " +
      req.body.object +
      " FROM " +
      req.body.user;
    console.log(req.body);
    conn.query(qry, (err, data) => {
      if (err) throw err;
    });
  });
});

// <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
// Corporation Queries
// <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>

router.post("/addCorp", async (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;

    var qry =
      `INSERT INTO Share_Holders VALUES(null, "` + req.body.name + `");`;
    var qry2 = `insert into Corporation Values(LAST_INSERT_ID());`;
    console.log(req.body);
    conn.query(qry, (err, data) => {
      if (err) throw err;
      console.log(JSON.stringify(data));
    });
    conn.query(qry2, (err, data) => {
      if (err) throw err;
      console.log(JSON.stringify(data));
      conn.release();
      res.end();
    });
  });
});

router.post("/removeCorp", async (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;

    var qry =
      `DELETE FROM Share_Holders WHERE SHName = "` + req.body.name + `";`;
    console.log(req.body);
    conn.query(qry, (err, data) => {
      if (err) throw err;
      console.log(JSON.stringify(data));
      conn.release();
      res.end();
    });
  });
});

router.post("/renameCorp", async (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;

    var qry =
      `UPDATE Share_Holders SET SHName = "` +
      req.body.newName +
      `" WHERE SHName = "` +
      req.body.oldName +
      `";`;
    console.log(req.body);
    conn.query(qry, (err, data) => {
      if (err) throw err;
      console.log(JSON.stringify(data));
      conn.release();
      res.end();
    });
  });
});

router.get("/corporationsShow", async (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;

    var qry = `SELECT SHName as Name
    FROM Corporation c NATURAL LEFT JOIN Share_Holders s`;
    console.log(req.body);
    conn.query(qry, (err, data) => {
      if (err) throw err;
      console.log(JSON.stringify(data));
      res.send(JSON.stringify(data));
      conn.release();
    });
  });
});

router.get("/corporationsShares", async (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;

    var qry = `SELECT SHName as Name, Ticker, Price_per_share as Price, Number_of_shares as '# Shares'
    FROM Corporation c NATURAL LEFT JOIN Share_Holders s NATURAL LEFT JOIN Portfolio p
    WHERE Ticker IS NOT NULL`;
    console.log(req.body);
    conn.query(qry, (err, data) => {
      if (err) throw err;
      console.log(JSON.stringify(data));
      res.send(JSON.stringify(data));
      conn.release();
    });
  });
});

// <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
// Portfolio Queries
// <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>

router.get("/averagePortfolioSH", async (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;

    var qry =
      `SELECT Ticker, SHName as Name,  AVG(Price_per_share) as 'Average Purchase Price'
      FROM  Share_Holders NATURAL JOIN Portfolio
    WHERE SHName = '` +
      req.query.name +
      `' GROUP BY Ticker, SHName
    ORDER BY 'Average Purchase Price' DESC;`;
    console.log(req.query);
    conn.query(qry, (err, data) => {
      if (err) throw err;
      console.log(JSON.stringify(data));
      res.send(JSON.stringify(data));
      conn.release();
    });
  });
});

router.get("/averagePortfolio", async (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;

    var qry = `SELECT Ticker, AVG(Price_per_share) as 'Average Purchase Price'
    FROM Portfolio
    GROUP BY Ticker
    ORDER BY 'Average Purchase Price' DESC;`;
    console.log(req.body);
    conn.query(qry, (err, data) => {
      if (err) throw err;
      console.log(JSON.stringify(data));
      res.send(JSON.stringify(data));
      conn.release();
    });
  });
});

router.get("/averageRetailInvestor", async (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;

    var qry = `SELECT SHName as Name, Ticker, AVG(Price_per_share) as 'Average Purchase Price'
    FROM Share_Holders NATURAL LEFT JOIN Portfolio
    WHERE Ticker IS NOT NULL AND SHId NOT IN (SELECT SHid FROM Corporation)
    GROUP BY Ticker, Name;`;
    console.log(req.body);
    conn.query(qry, (err, data) => {
      if (err) throw err;
      console.log(JSON.stringify(data));
      res.send(JSON.stringify(data));
      conn.release();
    });
  });
});

router.get("/averageCorporateInvestor", async (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;

    var qry = `SELECT SHName as Name, Ticker, AVG(Price_per_share) as 'Average Purchase Price'
    FROM Corporation NATURAL LEFT JOIN Share_Holders NATURAL LEFT JOIN Portfolio
    WHERE Ticker IS NOT NULL
    GROUP BY Ticker, Name;`;
    console.log(req.body);
    conn.query(qry, (err, data) => {
      if (err) throw err;
      console.log(JSON.stringify(data));
      res.send(JSON.stringify(data));
      conn.release();
    });
  });
});

router.get("/shareHolders", async (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;

    var qry = `SELECT SHName as Name FROM Share_Holders;`;
    console.log(req.body);
    conn.query(qry, (err, data) => {
      if (err) throw err;
      console.log(JSON.stringify(data));
      res.send(JSON.stringify(data));
      conn.release();
    });
  });
});

router.get("/averageExchange", async (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;

    var qry =
      `SELECT AVG(Price_per_share) as Average_Price_per_Share, Exchange_Name
    FROM Portfolio
    NATURAL JOIN (SELECT DISTINCT Ticker, Exchange_Name
    FROM Public_Stock
    LEFT JOIN Stock_Exchange
    USING (Exchange_ID)) as sub
    WHERE Exchange_Name = '` +
      req.query.name +
      `'
    GROUP BY Exchange_Name;`;
    console.log(req.body);
    conn.query(qry, (err, data) => {
      if (err) throw err;
      console.log(JSON.stringify(data));
      res.send(JSON.stringify(data));
      conn.release();
    });
  });
});

router.get("/averageExchangeAll", async (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;

    var qry = `SELECT AVG(Price_per_share) as Average_Price_per_Share, Exchange_Name
    FROM Portfolio
    NATURAL JOIN (SELECT DISTINCT Ticker, Exchange_Name
    FROM Public_Stock
    LEFT JOIN Stock_Exchange
    USING (Exchange_ID)) as sub
    GROUP BY Exchange_Name;`;
    console.log(req.body);
    conn.query(qry, (err, data) => {
      if (err) throw err;
      console.log(JSON.stringify(data));
      res.send(JSON.stringify(data));
      conn.release();
    });
  });
});

router.post("/addToPort", async (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;

    var qry =
      `INSERT INTO Portfolio (SHid, Price_per_share, Number_of_shares, Date_acquired, Ticker) 
      VALUES ((SELECT SHid FROM Share_Holders WHERE SHName = '` +
      req.body.name +
      `'),` +
      req.body.price +
      `, ` +
      req.body.quantity +
      `, '` +
      req.body.date +
      `', '` +
      req.body.ticker +
      `');`;
    console.log(req.body);
    conn.query(qry, (err, data) => {
      if (err) throw err;
      console.log(JSON.stringify(data));
      conn.release();
      res.end();
    });
  });
});

router.post("/removeFromPort", async (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;

    var qry =
      `DELETE FROM Portfolio WHERE SHid IN (SELECT SHid FROM Share_Holders WHERE SHName = '` +
      req.body.name +
      `') AND Price_per_share = ` +
      req.body.price +
      ` AND Number_of_shares = ` +
      req.body.quantity +
      ` AND Date_Acquired = '` +
      req.body.date +
      `' AND Ticker = '` +
      req.body.ticker +
      `';`;
    console.log(req.body);
    conn.query(qry, (err, data) => {
      if (err) throw err;
      console.log(JSON.stringify(data));
      conn.release();
      res.end();
    });
  });
});

router.post("/updatePort", async (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;

    var qry =
      `UPDATE Portfolio SET ` +
      req.body.column +
      ` = ` +
      req.body.newValue +
      ` WHERE SHid in (SELECT SHid FROM Share_Holders WHERE SHName = '` +
      req.body.name +
      `') AND ` +
      req.body.column +
      ` = ` +
      req.body.oldValue +
      `;`;
    console.log(req.body);
    conn.query(qry, (err, data) => {
      if (err) throw err;
      console.log(JSON.stringify(data));
      conn.release();
      res.end();
    });
  });
});

router.get("/shareholderPortfolio", async (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;

    var qry =
      `SELECT  SHName as Name, Ticker, Number_of_shares as Quantity, Price_per_share as Price, Date_Acquired as Date
    FROM  Share_Holders NATURAL JOIN Portfolio
    WHERE SHName = "` +
      req.query.name +
      `";`;
    console.log(req.query);
    conn.query(qry, (err, data) => {
      if (err) throw err;
      console.log(JSON.stringify(data));
      res.send(JSON.stringify(data));
      conn.release();
    });
  });
});

// <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
// ShareHolder Queries
// <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>

router.post("/addToSH", async (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;

    var qry = `INSERT INTO Share_Holders VALUES(null,'` + req.body.name + `');`;
    console.log(req.body);
    conn.query(qry, (err, data) => {
      if (err) throw err;
      console.log(JSON.stringify(data));
      conn.release();
      res.end();
    });
  });
});

router.post("/removeFromSH", async (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) throw err;

    var qry =
      `DELETE FROM Share_Holders WHERE SHName = '` + req.body.name + `';`;
    console.log(req.body);
    conn.query(qry, (err, data) => {
      if (err) throw err;
      console.log(JSON.stringify(data));
      conn.release();
      res.end();
    });
  });
});

module.exports = router;
