import React from "react";

function DQL() {
  return (
    <section>
      <div class="container-fluid">
        <h1 class="mt-5">DQL Queries</h1>
      </div>

      <p>Select from Table</p>
      <form method="POST" action="/select">
        <div class="input-group justify-content-center">
          <div class="input-group-prepend select">
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

      <p>Select from Table with Join</p>
      <form method="POST" action="/selectJoin">
        <div class="input-group justify-content-center">
          <div class="input-group-prepend select">
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
            <select name="joinType">
              <option value="none">none</option>
              <option value="natural">NATURAL</option>
            </select>
            <select name="joinOpType">
              <option value="left">LEFT JOIN</option>
              <option value="right">RIGHT JOIN</option>
              <option value="regular">JOIN</option>
            </select>
            <input
              type="text"
              name="joinTable"
              placeholder="Table"
              class="form-control"
            />
            <input
              type="text"
              name="joinOn"
              placeholder="Join on"
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

      <p>Select from Table with free form SQL</p>
      <form method="POST" action="/selectCustom">
        <div class="input-group justify-content-center">
          <div class="input-group-prepend select">
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
            <input
              type="text"
              name="freeForm"
              placeholder="Rest of Query in SQL"
              class="form-control"
            />

            <input type="submit" value="Send" class="btn btn-primary mb-2" />
          </div>
        </div>
      </form>
    </section>
  );
}

export default DQL;
