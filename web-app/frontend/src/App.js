//import logo from './logo.svg';
import "./App.css";
import Nav from "./components/Nav";
import Home from "./components/Home";
import DDL from "./components/DDL";
import DML from "./components/DML";
import DQL from "./components/DQL";
import CQ from "./components/CoolQueries";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/ddl" exact component={DDL} />
          <Route path="/dml" exact component={DML} />
          <Route path="/dql" exact component={DQL} />
          <Route path="/cq" exact component={CQ} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
