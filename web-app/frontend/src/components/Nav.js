import React from "react"; // ES6 js
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark top">
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navMainMenu"
        aria-controls="navMainMenu"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div id="navMainMenu" class="navbar-collapse collapse">
        <div class="navbar-nav ml-auto">
          <Link to="/" className="nav-item nav-link active">
            Home
          </Link>
          <Link to="/ddl" className="nav-item nav-link">
            DDL Queries
          </Link>
          <Link to="/dml" className="nav-item nav-link">
            DML Queries
          </Link>
          <Link to="/dql" className="nav-item nav-link">
            DQL Queries
          </Link>
          <Link to="/cq" className="nav-item nav-link">
            Cool Queries
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
