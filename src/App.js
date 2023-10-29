import "../node_modules/bootstrap/dist/css/bootstrap.css";

import Contact from "./component/pages/Contact";
import Front from "./component/pages/Front";
import React, { useState, useEffect } from "react";
import AuthService from "./services/auth.service";
import EventBus from "./common/EventBus";
import Login from "./Login/Login";
import Register from "./Login/Register";
import BoardAdmin from "./component/BoardAdmin";
import BoardUser from "./component/BoardUser";
import PageNotFound from "./component/pages/PageNotFound";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import { Link , useHistory} from "react-router-dom";
import Profile from "./services/Profile";
import ProductDetails from "./component/Product/ProductDetails";
import AddProduct from "./component/Product/AddProduct";
import ProductList from "./component/Product/ProductList";
import CartList from "./Cart/CartList";
import AddCart from "./Cart/AddCart";
import CartDetails from "./Cart/CartDetails";
import ProfileList from "./Profile/ProfileList";
import AddProfile from "./Profile/AddProfile";
import ProfileDetails from "./Profile/ProfileDetails";
import OrderList from "./Order/OrderList";
import AddOrder from "./Order/AddOrder";
import OrderDetails from "./Order/OrderDetails";
import {MdOutlineArrowBackIos} from 'react-icons/md';
import StripeContainer from "./component/Payment/StripeContainer";
import AdminProducts from "./component/AdminWorks/AdminProducts";
import UpdateProduct from "./component/AdminWorks/UpdateProduct";

import WishList from "./Cart/WishList";


function App() {
  const history = useHistory();
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setShowModeratorBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };
  return (
    <>
    <nav className="navbar navbar-expand navbar-dark bg-dark ">
      <button className="btn btn-dark btn-outline-light mr-3 ml-3" onClick={()=>history.goBack()}> <MdOutlineArrowBackIos/></button>
        <a href={"/"} className="navbar-brand">
          Welcome to Online Shopping Cart
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <a href="/rdashboard" className="nav-link">
              Home
            </a>
          </li>

          {showModeratorBoard && (
            <li className="nav-item">
              <Link to={"/mod"} className="nav-link">
                Moderator Board
              </Link>
            </li>
          )}

          {showAdminBoard && (
            <li className="nav-item">
              <a href={"/admin"} className="nav-link">
                Admin Board
              </a>
            </li>
          )}

          {currentUser && (
            <li className="nav-item">
              {/* <Link to={"/user"} className="nav-link">
                User

              </Link> */}
             
              
            </li>
          )}
        </div>

        {currentUser ? (
          <>
          
          <div className="navbar-nav ml-auto">
          
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/" className="nav-link" onClick={logOut}>
                LogOut
              </a>
            </li>
            
          </div></>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              {/* <Link to={"/login"} className="nav-link">
                Login
              </Link> */}
            </li>

            <li className="nav-item">
              {/* <Link to={'/register'} className="nav-link">
                Sign Up
              </Link> */}
            </li>
          </div>
        )}
      </nav>
    <Router>

      <div className="App">
        
        <Switch>
          <Route exact path = "/" component={Front} />
          <Route path = "/contact" component={Contact} />
          <Route path = "/doctor/:id" component={ProductDetails} />
          <Route path = "/dsignup" component={AddProduct} />
          <Route path = "/rdashboard" component={ProductList} />
          <Route path = "/cartlist" component={CartList} />
          <Route path = "/addcart" component={AddCart} />
          <Route path = "/cart/:id" component={CartDetails} />
          <Route path = "/profilelist" component={ProfileList} />
          <Route path = "/addprofile" component={AddProfile} />
          <Route path = "/profile/:id" component={ProfileDetails} />
          <Route path = "/orderlist" component={OrderList} />
          <Route path = "/addorder" component={AddOrder} />
          <Route path = "/order/:id" component={OrderDetails} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/profile" component={Profile} />
          <Route path="/user" component={BoardUser} />
          <Route path="/admin" component={ BoardAdmin} />
          <Route path="/payment" component={ StripeContainer} />
          <Route path="/adminproducts" component={ AdminProducts} />
          <Route path="/wishlist" component={ WishList} />
          <Route path="/updateproducts/:id" component={ UpdateProduct} />
          <Route path = "*" component={PageNotFound} />
        </Switch>
        </div>
    </Router>
      
   </> 
  );
}

export default App;
