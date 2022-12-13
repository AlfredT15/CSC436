import React from "react";

function DML() {
  return (
    <section>
      <div class="container-fluid">
        <h1 class="mt-5">DML Queries</h1>
      </div>

      <p>Insert into Table</p>
      <form method="POST" action="/insertIntoTable">
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
              name="columnName"
              placeholder="Column1, ..."
              class="form-control"
            />
            <input
              type="text"
              name="value"
              placeholder="value1, ..."
              class="form-control"
            />
            <input type="submit" value="Send" class="btn btn-primary mb-2" />
          </div>
        </div>
      </form>

      <p>Update Table</p>
      <form method="POST" action="/updateTable">
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
              name="value"
              placeholder="value1, ..."
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

      <p>Delete Table</p>
      <form method="POST" action="/deleteTable">
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
              name="condition"
              placeholder="Condition"
              class="form-control"
            />
            <input type="submit" value="Send" class="btn btn-primary mb-2" />
          </div>
        </div>
      </form>
    </section>
  );
}

export default DML;
