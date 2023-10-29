import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import { Link } from "react-router-dom";
import './admin.css'

const BoardAdmin = () => {
  
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getAdminBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
          error.response.data &&
          error.response.data.message) ||
          error.message ||
          error.toString();
          setContent(_content);
          if (error.response && error.response.status === 401) {
            EventBus.dispatch("logout");
          }
      }
    );
  }, []);
  
  //conditional rendering checking logged in as admin or not
  if(content!="Admin Board.") return<h1>Not Authorized Please Login as Admin</h1>
  return (
    <div className="container card p-5">
      <h3 className="text-center">{content}</h3>
        <div className="cont">
          <Link className = "btn btn-dark specific" to="/adminproducts">
            Products
          </Link>
          <br></br>
          <Link className="btn btn-dark specific2" to="/profilelist">
            Profiles
          </Link>
        </div>
      </div>
  );
};

export default BoardAdmin;
