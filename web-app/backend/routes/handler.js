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

// router.get("/dml", async (req, res) => {
//   const userTweet = req.body.tweetInput;

//   pool.getConnection((err, conn) => {
//     if (err) throw err;

//     const qry = `INSERT INTO Share_Holders VALUES(?,?)`;
//     conn.query(qry, [20, "Alfred Timperley"], (err, results) => {
//       conn.release();
//       if (err) throw err;
//       console.log("Value added to share holders");
//     });
//     res.redirect("/tweets");
//     res.end();
//   });
// });

// router.get("/ddl", async (req, res) => {
//   const userTweet = req.body.tweetInput;

//   pool.getConnection((err, conn) => {
//     if (err) throw err;

//     const qry = `CREATE TABLE ? (? ? ?,);`;
//     conn.query(qry, [20, "Alfred Timperley"], (err, results) => {
//       conn.release();
//       if (err) throw err;
//       console.log("Value added to share holders");
//     });
//     res.redirect("/tweets");
//     res.end();
//   });
// });

module.exports = router;
