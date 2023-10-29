import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Navbar from '../component/layout/Navbar';
import {Link} from 'react-router-dom';
import './cart.css';
import AuthService from '../services/auth.service';



const currentUser = AuthService.getCurrentUser();

const CartList = () =>{
    
  const [carts,setCarts] = useState([{"price":"0"}]);
  const [dp, setDp] = useState(0);
  const[isLoading, setIsLoading] = useState(true)
  
  const calc=()=>{
    let p=2;
    return 0
  }
  
  //for loading the cart items 
  useEffect(() => {
    const loadAsyncStuff = async () => {
        setIsLoading(true)
        try {
          if(currentUser.roles[0]=="ROLE_ADMIN"){
            const result = await axios.get("http://localhost:3001/cart1/")
            setCarts(result.data)
            console.log(carts[0]);
         }
          else{
            const result = await axios.get("http://localhost:3001/cart/")
            setCarts(result.data)
            console.log(carts[0]);
          }
        } 
        catch (error){
          console.log(error)
        } 
        setIsLoading(false)
    };
    loadAsyncStuff();
  },[]); 

  //second use effect for calculating the real time price
  useEffect(()=>{
    var i = 0;
    var sum = 0;
    while(i<carts.length){
      sum = sum + parseInt(carts[i].price)
      i++
    }
    setDp(sum)}
  )
  
  //for loading the cart items from the database
  const loadCart = async () =>{
        if(currentUser.roles[0]=="ROLE_ADMIN")
          var result = await axios.get("http://localhost:3001/cart1/")
        else
          var result = await axios.get("http://localhost:3001/cart/")
        setCarts(result.data)
        setDp(calc())
        
    };
  
  //for removing the cart item from the cart list
  const deleteCart = async id =>{
    if(currentUser.roles[0]=="ROLE_ADMIN")
      await axios.delete(`http://localhost:3001/cart1/${id}`);
    else
       await axios.delete(`http://localhost:3001/cart/${id}`);
    loadCart();
    }
   
  
  //conditional rendering starting here
  if(isLoading)return <><h1>Loading...</h1></>
  return (
  <>
    <div className='container mt-3 text-center card'>
      <h1 className='text-center heading'>Cart List</h1>
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
                  <Link className="btn btn-dark m-2 paybutton" onClick={()=>{deleteCart(cart.id)}}>Remove from cart</Link>
                </td>
            </tr>
            ))
          }
        </tbody>
      </table>
      <div className=' text-left payhead'> 
        <h2>Your Order Total is :</h2><h1> Rs {dp} only</h1>
        {/* Storing the total order value for carrying in next page */}
        {
        localStorage.setItem("1",dp)
        }
        <Link className="btn btn-dark m-2 paybutton " to="/payment">Purchase the Order</Link>
      </div>
    </div>
    <div><Navbar/></div>
  </>
  );
}

export default CartList;