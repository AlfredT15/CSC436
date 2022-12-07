import React from "react";

function DDL() {
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
                placeholder="name1 data_type, ..."
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
        <form method="POST" action="/alterTable">
          <div class="input-group justify-content-center">
            <div class="input-group-prepend">
              <input
                type="text"
                name="tableName"
                placeholder="Table Name"
                class="form-control"
              />
              <select name="opType">
                <option value="add">ADD</option>
                <option value="drop">DROP</option>
                <option value="modify">MODIFY</option>
              </select>
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

        <p>Truncate Table</p>
        <form method="POST" action="/truncateTable">
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

        <p>Rename Table</p>
        <form method="POST" action="/renameTable">
          <div class="input-group justify-content-center">
            <div class="input-group-prepend">
              <input
                type="text"
                name="tableName"
                placeholder="Old Table Name"
                class="form-control"
              />
              <input
                type="text"
                name="newTableName"
                placeholder="New Table Name"
                class="form-control"
              />
              <input type="submit" value="Send" class="btn btn-primary mb-2" />
            </div>
          </div>
        </form>

        <p>Create Index</p>
        <form method="POST" action="/createIndex">
          <div class="input-group justify-content-center">
            <div class="input-group-prepend">
              <input
                type="text"
                name="indexName"
                placeholder="Index Name"
                class="form-control"
              />
              <input
                type="text"
                name="tableInfo"
                placeholder="Table Name (Column Names,...)"
                class="form-control"
              />
              <input type="submit" value="Send" class="btn btn-primary mb-2" />
            </div>
          </div>
        </form>

        <p>Create View</p>
        <form method="POST" action="/createView">
          <div class="input-group justify-content-center">
            <div class="input-group-prepend select">
              <input
                type="text"
                name="viewName"
                placeholder="View Name"
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
              <p>GROUP BY:</p>
              <input type="checkbox" name="groupBy" />
              <input
                type="text"
                name="conditionGroupBy"
                placeholder="Condition"
                class="form-control"
              />
              <p>ORDER BY:</p>
              <input type="checkbox" name="orderBy" />
              <input
                type="text"
                name="conditionOrderBy"
                placeholder="Condition"
                class="form-control"
              />
              <input type="submit" value="Send" class="btn btn-primary mb-2" />
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default DDL;
