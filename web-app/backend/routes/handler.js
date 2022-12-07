const express = require("express");
const router = express.Router();
const pool = require("../config/db.js");

// <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
// DDL Queries
// <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>

router.get("/ddl", async (req, res) => {
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

    var qry =
      "SELECT " + req.body.columnName + " FROM " + req.body.tableName + ";";
    if (req.body.where) {
      qry =
        "SELECT " +
        req.body.columnName +
        " FROM " +
        req.body.tableName +
        " WHERE " +
        req.body.condition +
        ";";
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

module.exports = router;
