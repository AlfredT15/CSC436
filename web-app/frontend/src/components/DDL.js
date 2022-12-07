import React, { useEffect, useState } from "react";

function DDL() {
  useEffect(() => {
    fetchItems();
  }, []);

  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    const data = await fetch("/ddl");
    const items = await data.json();
    setItems(items);
  };
  return (
    <section>
      <div class="container-fluid">
        <h1 class="mt-5">DDL Queries</h1>

        <p>Create Table</p>
        <form method="POST" action="/insertTable">
          <div class="input-group justify-content-center">
            <div class="input-group-prepend">
              <input
                type="text"
                name="tableName"
                placeholder="Table Name"
                class="form-control"
              />
              <input
                type="text"
                name="tableInfo"
                placeholder="Table Info"
                class="form-control"
              />
              <input type="submit" value="Send" class="btn btn-primary mb-2" />
            </div>
          </div>
        </form>

        <p>Drop Table</p>
        <form method="POST" action="/dropTable">
          <div class="input-group justify-content-center">
            <div class="input-group-prepend">
              <input
                type="text"
                name="tableName"
                placeholder="Table Name"
                class="form-control"
              />
              <input type="submit" value="Send" class="btn btn-primary mb-2" />
            </div>
          </div>
        </form>

        <p>Alter Table</p>
        <form method="POST" action="/insertTable">
          <div class="input-group justify-content-center">
            <div class="input-group-prepend">
              <input
                type="text"
                name="shareHolderName"
                placeholder=""
                class="form-control"
              />
              <input type="submit" value="Send" class="btn btn-primary mb-2" />
            </div>
          </div>
        </form>

        <p>Truncate Table</p>
        <form method="POST" action="/insertTable">
          <div class="input-group justify-content-center">
            <div class="input-group-prepend">
              <input
                type="text"
                name="shareHolderName"
                placeholder=""
                class="form-control"
              />
              <input type="submit" value="Send" class="btn btn-primary mb-2" />
            </div>
          </div>
        </form>

        <p>Rename Table</p>
        <form method="POST" action="/insertTable">
          <div class="input-group justify-content-center">
            <div class="input-group-prepend">
              <input
                type="text"
                name="shareHolderName"
                placeholder=""
                class="form-control"
              />
              <input type="submit" value="Send" class="btn btn-primary mb-2" />
            </div>
          </div>
        </form>

        {items.map((item) => (
          <div class="row padding">
            <div class="alert alert-info rounded-pill" role="alert">
              <i class="fa fa-user mr-2"></i>{" "}
              <i>
                {item.Name} ({item.Ticker}): {item.Number_of_shares}
              </i>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default DDL;
