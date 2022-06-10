import "../node_modules/bootstrap/dist/css/bootstrap.css";
import Home from "./component/pages/Home";
import About from "./component/pages/About";
import Contact from "./component/pages/Contact";
import Navbar from "./component/layout/Navbar";
import PageNotFound from "./component/pages/PageNotFound";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Adduser from "./component/users/Adduser";
import EditUser from "./component/users/EditUser";
import User from "./component/users/User";


function App() {
  return (
    <Router>

      <div className="App">
        <Navbar/>
        <Switch>
          <Route exact path = "/" component={Home}></Route>
          <Route exact path = "/about" component={About}></Route>
          <Route exact path = "/contact" component={Contact}></Route>
          <Route exact path = "/user/add" component={Adduser}></Route>
          <Route exact path = "/user/edit/:id" component={EditUser}></Route>
          <Route exact path = "/user/:id" component={User}></Route>
          <Route exact path = "*" component={PageNotFound}></Route>
        </Switch>
        </div>
    </Router>
      
    
  );
}

export default App;
