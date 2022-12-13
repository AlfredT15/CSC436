import React, { useState } from "react";
import Axios from "axios";
import Table from "./Table";

function Portfolio() {
  const [portfolioList, setPortfolioList] = useState([
    { "No Data Selected": "" },
  ]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [date, setDate] = useState("");
  const [ticker, setTicker] = useState("");
  const [column, setColumn] = useState("");
  const [oldValue, setOldValue] = useState("");
  const [newValue, setNewValue] = useState("");

  const getAvgSH = () => {
    console.log("Getting average purchase price for " + name);
    Axios.get("http://localhost:3000/averagePortfolioSH", {
      params: { name: name },
    })
      .then((response) => setPortfolioList(response.data))
      .catch((error) => {
        console.log(error);
      });
  };

  const getSHPort = () => {
    console.log("Getting portfolio for " + name);
    Axios.get("http://localhost:3000/shareholderPortfolio", {
      params: { name: name },
    })
      .then((response) => setPortfolioList(response.data))
      .catch((error) => {
        console.log(error);
      });
  };

  const getAvgAll = () => {
    console.log("Getting all corporate Shares");
    Axios.get("http://localhost:3000/averagePortfolio")
      .then((response) => setPortfolioList(response.data))
      .catch((error) => {
        console.log(error);
      });
  };

  const getRetInv = () => {
    console.log("Getting all corporate Shares");
    Axios.get("http://localhost:3000/averageRetailInvestor")
      .then((response) => setPortfolioList(response.data))
      .catch((error) => {
        console.log(error);
      });
  };

  const getCorpInv = () => {
    console.log("Getting all corporate Shares");
    Axios.get("http://localhost:3000/averageCorporateInvestor")
      .then((response) => setPortfolioList(response.data))
      .catch((error) => {
        console.log(error);
      });
  };

  const getSH = () => {
    console.log("Getting all corporate Shares");
    Axios.get("http://localhost:3000/shareHolders")
      .then((response) => setPortfolioList(response.data))
      .catch((error) => {
        console.log(error);
      });
  };

  const getAvgEx = () => {
    console.log("Getting average purchase price for " + name);
    Axios.get("http://localhost:3000/averageExchange", {
      params: { name: name },
    })
      .then((response) => setPortfolioList(response.data))
      .catch((error) => {
        console.log(error);
      });
  };

  const getAvgExAll = () => {
    console.log("Getting average purchase price for " + name);
    Axios.get("http://localhost:3000/averageExchangeAll")
      .then((response) => setPortfolioList(response.data))
      .catch((error) => {
        console.log(error);
      });
  };

  const addToPort = async () => {
    await Axios.post("http://localhost:3000/addToPort", {
      name: name,
      price: price,
      quantity: quantity,
      date: date,
      ticker: ticker,
    }).catch((error) => {
      console.log(error);
    });
    await getSHPort();
  };

  const removeFromPort = async () => {
    await Axios.post("http://localhost:3000/removeFromPort", {
      name: name,
      price: price,
      quantity: quantity,
      date: date,
      ticker: ticker,
    }).catch((error) => {
      console.log(error);
    });
    await getSHPort();
  };

  const updatePort = async () => {
    await Axios.post("http://localhost:3000/updatePort", {
      name: name,
      column: column,
      oldValue: oldValue,
      newValue: newValue,
    }).catch((error) => {
      console.log(error);
    });
    await getSHPort();
  };

  return (
    <section>
      <div className="buttonTop">
        <button onClick={getSH} className="buttonTopStyle btn btn-primary mb-2">
          Show All Share Holders
        </button>
        <button
          onClick={getRetInv}
          className="buttonTopStyle btn btn-primary mb-2"
        >
          Average of Retail Investor Portfolios
        </button>
        <button
          onClick={getCorpInv}
          className="buttonTopStyle btn btn-primary mb-2"
        >
          Average of Corporate Portfolios
        </button>
        <button
          onClick={getAvgAll}
          className="buttonTopStyle btn btn-primary mb-2"
        >
          Average of All Portfolios
        </button>
        <button
          onClick={getAvgExAll}
          className="buttonTopStyle btn btn-primary mb-2"
        >
          Average Price on All Exchanges
        </button>
      </div>

      <div className="queryGroup">
        <div className="information">
          <label>Average Portfolio</label>
          <input
            type="text"
            onChange={(event) => {
              setName(event.target.value);
            }}
            placeholder="Share Holder Name"
          />
          <button onClick={getAvgSH} className="btn btn-primary mb-2">
            Average of Share Holder's Portfolio
          </button>
        </div>

        <div className="information">
          <label>Get Portfolio</label>
          <input
            type="text"
            onChange={(event) => {
              setName(event.target.value);
            }}
            placeholder="Share Holder Name"
          />
          <button onClick={getSHPort} className="btn btn-primary mb-2">
            Share Holder's Portfolio
          </button>
        </div>

        <div className="information">
          <label>Average by Exchange</label>
          <input
            type="text"
            onChange={(event) => {
              setName(event.target.value);
            }}
            placeholder="Exchange Name"
          />
          <button onClick={getAvgEx} className="btn btn-primary mb-2">
            Average Price on Exchange
          </button>
        </div>

        <div className="information">
          <label>Insert into Portfolio</label>
          <input
            type="text"
            onChange={(event) => {
              setName(event.target.value);
            }}
            placeholder="ShareHolder Name"
          />
          <input
            type="text"
            onChange={(event) => {
              setPrice(event.target.value);
            }}
            placeholder="Price Per Share"
          />
          <input
            type="text"
            onChange={(event) => {
              setQuantity(event.target.value);
            }}
            placeholder="Number of Shares"
          />
          <input
            type="text"
            onChange={(event) => {
              setDate(event.target.value);
            }}
            placeholder="YYYY-MM-DD"
          />
          <input
            type="text"
            onChange={(event) => {
              setTicker(event.target.value);
            }}
            placeholder="Ticker"
          />
          <button onClick={addToPort} className="btn btn-primary mb-2">
            Add
          </button>
        </div>

        <div className="information">
          <label>Remove from Portfolio</label>
          <input
            type="text"
            onChange={(event) => {
              setName(event.target.value);
            }}
            placeholder="ShareHolder Name"
          />
          <input
            type="text"
            onChange={(event) => {
              setPrice(event.target.value);
            }}
            placeholder="Price Per Share"
          />
          <input
            type="text"
            onChange={(event) => {
              setQuantity(event.target.value);
            }}
            placeholder="Number of Shares"
          />
          <input
            type="text"
            onChange={(event) => {
              setDate(event.target.value);
            }}
            placeholder="YYYY-MM-DD"
          />
          <input
            type="text"
            onChange={(event) => {
              setTicker(event.target.value);
            }}
            placeholder="Ticker"
          />
          <button onClick={removeFromPort} className="btn btn-primary mb-2">
            Remove
          </button>
        </div>

        <div className="information">
          <label>Update Portfolio</label>
          <input
            type="text"
            onChange={(event) => {
              setName(event.target.value);
            }}
            placeholder="ShareHolder Name"
          />
          <input
            type="text"
            onChange={(event) => {
              setColumn(event.target.value);
            }}
            placeholder="Column to Change Name"
          />
          <input
            type="text"
            onChange={(event) => {
              setOldValue(event.target.value);
            }}
            placeholder="Old Value"
          />
          <input
            type="text"
            onChange={(event) => {
              setNewValue(event.target.value);
            }}
            placeholder="New Value"
          />
          <button onClick={updatePort} className="btn btn-primary mb-2">
            Update
          </button>
        </div>
      </div>

      <div className="tableOutput">
        <Table data={portfolioList} />
      </div>
    </section>
  );
}

export default Portfolio;
