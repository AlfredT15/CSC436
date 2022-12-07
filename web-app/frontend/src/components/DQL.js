import React, { useEffect, useState } from "react";

function DQL() {
  useEffect(() => {
    fetchItems();
  }, []);

  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    const data = await fetch("/select");
    const items = await data.json();
    setItems(items);
  };
  return (
    <section>
      <div class="container-fluid">
        <h1 class="mt-5">DQL Queries</h1>
      </div>

      <p>Select from Table</p>
      <form method="POST" action="/select">
        <div class="input-group justify-content-center">
          <div class="input-group-prepend">
            <input
              type="text"
              name="columnName"
              placeholder="Column1, ..."
              class="form-control"
            />
            <input
              type="text"
              name="tableName"
              placeholder="Table Name"
              class="form-control"
            />
            <p>WHERE:</p>
            <input type="checkbox" name="where" />
            <input
              type="text"
              name="condition"
              placeholder="Condition"
              class="form-control"
            />
            <input type="submit" value="Send" class="btn btn-primary mb-2" />
          </div>
        </div>
      </form>

      {items.map((item) => (
        <div class="row padding">
          <div class="alert alert-info rounded-pill" role="alert">
            <i class="fa fa-user mr-2"></i> <i>{item}</i>
          </div>
        </div>
      ))}
    </section>
  );
}

export default DQL;
