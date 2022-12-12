//import logo from './logo.svg';
import "./App.css";
import Nav from "./components/Nav";
import Home from "./components/Home";
import DDL from "./components/DDL";
import DML from "./components/DML";
import DQL from "./components/DQL";
import CQ from "./components/CoolQueries";
import DCL from "./components/DCL";
import Corporation from "./components/Corporations";
import Portfolio from "./components/Portfolio";
import Shareholder from "./components/Shareholder";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/corporations" exact component={Corporation} />
          <Route path="/portfolio" exact component={Portfolio} />
          <Route path="/shareholder" exact component={Shareholder} />
          <Route path="/ddl" exact component={DDL} />
          <Route path="/dml" exact component={DML} />
          <Route path="/dql" exact component={DQL} />
          <Route path="/dcl" exact component={DCL} />
          <Route path="/cq" exact component={CQ} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
