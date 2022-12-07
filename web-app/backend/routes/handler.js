const express = require("express");
const router = express.Router();
const pool = require("../config/db.js");

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
      console.log("sent");
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
      console.log("sent");
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
      console.log("sent");
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
      console.log("sent");
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
      console.log("sent");
    });
  });
});

module.exports = router;
