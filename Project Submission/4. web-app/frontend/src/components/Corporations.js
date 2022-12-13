import React, { useState } from "react";
import Axios from "axios";
import Table from "./Table";

function Corporation() {
  const [name, setName] = useState("");
  const [newName, setNewName] = useState("");
  const [corporationList, setCorporationList] = useState([
    { "No Data Selected": "" },
  ]);

  const addCorp = async () => {
    await Axios.post("http://localhost:3000/addCorp", {
      name: name,
    }).catch((error) => {
      console.log(error);
    });
    await getAll();
  };

  const removeCorp = async () => {
    await Axios.post("http://localhost:3000/removeCorp", {
      name: name,
    }).catch((error) => {
      console.log(error);
    });
    await getAll();
  };

  const renameCorp = async () => {
    await Axios.post("http://localhost:3000/renameCorp", {
      oldName: name,
      newName: newName,
    }).catch((error) => {
      console.log(error);
    });
    await getAll();
  };

  const getAll = () => {
    console.log("Getting all corporate Shares");
    Axios.get("http://localhost:3000/corporationsShow")
      .then((response) => setCorporationList(response.data))
      .catch((error) => {
        console.log(error);
      });
  };

  const getShares = () => {
    Axios.get("http://localhost:3000/corporationsShares")
      .then((response) => setCorporationList(response.data))
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <section>
      <div className="buttonTop">
        <button
          onClick={getAll}
          className="buttonTopStyle btn btn-primary mb-2"
        >
          Show All Corporations
        </button>
        <button
          onClick={getShares}
          className="buttonTopStyle btn btn-primary mb-2"
        >
          Show All Corporations Shares
        </button>
      </div>

      <div className="queryGroup">
        <div className="information">
          <label>Add Corporation</label>
          <input
            type="text"
            onChange={(event) => {
              setName(event.target.value);
            }}
            placeholder="Name"
          />
          <button onClick={addCorp} className="btn btn-primary mb-2">
            Add
          </button>
        </div>

        <div className="information">
          <label>Remove Corporation</label>
          <input
            type="text"
            onChange={(event) => {
              setName(event.target.value);
            }}
            placeholder="Name"
          />
          <button onClick={removeCorp} className="btn btn-primary mb-2">
            Remove
          </button>
        </div>

        <div className="information">
          <label>Rename Corporation</label>
          <input
            type="text"
            onChange={(event) => {
              setName(event.target.value);
            }}
            placeholder="Old Name"
          />
          <input
            type="text"
            onChange={(event) => {
              setNewName(event.target.value);
            }}
            placeholder="New Name"
          />
          <button onClick={renameCorp} className="btn btn-primary mb-2">
            Rename
          </button>
        </div>
      </div>

      <div className="tableOutput">
        <Table data={corporationList} />
      </div>
    </section>
  );
}

export default Corporation;
