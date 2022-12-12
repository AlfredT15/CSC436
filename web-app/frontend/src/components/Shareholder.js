import React, { useState } from "react";
import Axios from "axios";
import Table from "./Table";

function Shareholder() {
  const [shareHolderList, setShareHolderList] = useState([
    { "No Data Selected": "" },
  ]);

  const [name, setName] = useState("");

  const getSH = () => {
    console.log("Getting all corporate Shares");
    Axios.get("http://localhost:3000/shareHolders")
      .then((response) => setShareHolderList(response.data))
      .catch((error) => {
        console.log(error);
      });
  };

  const addToSH = async () => {
    await Axios.post("http://localhost:3000/addToSH", {
      name: name,
    }).catch((error) => {
      console.log(error);
    });
    await getSH();
  };

  const removeFromSH = async () => {
    await Axios.post("http://localhost:3000/removeFromSH", {
      name: name,
    }).catch((error) => {
      console.log(error);
    });
    await getSH();
  };

  return (
    <section>
      <div className="buttonTop">
        <button onClick={getSH} className="buttonTopStyle btn btn-primary mb-2">
          Show All Share Holders
        </button>
      </div>
      <div className="queryGroup">
        <div className="information">
          <label>Add ShareHolder</label>
          <input
            type="text"
            onChange={(event) => {
              setName(event.target.value);
            }}
            placeholder="Share Holder Name"
          />
          <button onClick={addToSH} className="btn btn-primary mb-2">
            Add
          </button>
        </div>

        <div className="information">
          <label>Remove ShareHolder</label>
          <input
            type="text"
            onChange={(event) => {
              setName(event.target.value);
            }}
            placeholder="Share Holder Name"
          />
          <button onClick={removeFromSH} className="btn btn-primary mb-2">
            Add
          </button>
        </div>
      </div>

      <div className="tableOutput">
        <Table data={shareHolderList} />
      </div>
    </section>
  );
}

export default Shareholder;
