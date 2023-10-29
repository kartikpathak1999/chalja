import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Navbar from '../component/layout/Navbar';
import {Link} from 'react-router-dom';
import './cart.css';
import AuthService from '../services/auth.service';

const currentUser = AuthService.getCurrentUser();

const WishList = () =>{
  
  const[carts,setCarts] = useState([{"price":"0"}]);
  const[isLoading, setIsLoading] = useState(true)
    
  useEffect(() => {
    const loadAsyncStuff = async () => {
      setIsLoading(true)
      try {
        if(currentUser.roles[0]=="ROLE_ADMIN"){
          const result = await axios.get("http://localhost:3001/wish1/")
          setCarts(result.data)
        }
        else{
          const result = await axios.get("http://localhost:3001/wish/")
          setCarts(result.data)
        }
      } 
      catch (error) {
        console.log(error)
      } 
      setIsLoading(false)
    };
    loadAsyncStuff();
  },[]); 

  const loadCart = async () =>{
      if(currentUser.roles[0]=="ROLE_ADMIN")
        var result = await axios.get("http://localhost:3001/wish1/")
      else
        var result = await axios.get("http://localhost:3001/wish/")
      setCarts(result.data)
  };

  const deleteCart = async id =>{
    if(currentUser.roles[0]=="ROLE_ADMIN")
      await axios.delete(`http://localhost:3001/wish1/${id}`);
    else
      await axios.delete(`http://localhost:3001/wish/${id}`);
    loadCart();
  }
   
  if(isLoading)return <><h1>Loading...</h1></>
  return (
    <>
      <div className='container mt-3 text-center card'>
        <h1 className='text-center heading'>Wish List</h1>
        <table class="table">
          <thead>
            <tr className='bg-dark text-white '>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Prices</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {carts.map((cart,index)=>(
              <tr>
                <th scope='row'>{index+1}</th>
                <td>{cart.cust_id}</td>
                <td>{cart.productName}</td>
                <td>{cart.price}</td>
                <td>
                  <Link className="btn btn-dark m-2 paybutton" onClick={()=>{deleteCart(cart.id)}}>Remove from wishlist</Link>
                </td>
              </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <div><Navbar/></div>
    </>
  );
}

export default WishList;