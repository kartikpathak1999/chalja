import "../node_modules/bootstrap/dist/css/bootstrap.css";
import Home from "./component/pages/Home";
import About from "./component/pages/About";
import Contact from "./component/pages/Contact";
import Navbar from "./component/layout/Navbar";
import PageNotFound from "./component/pages/PageNotFound";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";


function App() {
  return (
    <Router>

      <div className="App">
        <Navbar/>
        <Switch>
          <Route exact path = "/" component={Home}></Route>
          <Route exact path = "/about" component={About}></Route>
          <Route exact path = "/contact" component={Contact}></Route>
          <Route exact path = "*" component={PageNotFound}></Route>
        </Switch>
        </div>
    </Router>
      
    
  );
}

export default App;
