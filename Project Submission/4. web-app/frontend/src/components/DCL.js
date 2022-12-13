import React from "react";

function DCL() {
  return (
    <section>
      <div class="container-fluid">
        <h1 class="mt-5">DDL Queries</h1>

        <p>Grant Privilege</p>
        <form method="POST" action="/grant">
          <div class="input-group justify-content-center">
            <div class="input-group-prepend">
              <input
                type="text"
                name="privilege"
                placeholder="Privilege"
                class="form-control"
              />
              <input
                type="text"
                name="object"
                placeholder="Object"
                class="form-control"
              />
              <input
                type="text"
                name="user"
                placeholder="User Name | Public | Role Name"
                class="form-control"
              />
              <input type="submit" value="Send" class="btn btn-primary mb-2" />
            </div>
          </div>
        </form>

        <p>Revoke Privilege</p>
        <form method="POST" action="/revoke">
          <div class="input-group justify-content-center">
            <div class="input-group-prepend">
              <input
                type="text"
                name="privilege"
                placeholder="Privilege"
                class="form-control"
              />
              <input
                type="text"
                name="object"
                placeholder="Object"
                class="form-control"
              />
              <input
                type="text"
                name="user"
                placeholder="User Name | Public | Role Name"
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

export default DCL;
