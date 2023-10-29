import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Navbar from '../component/layout/Navbar';
import {Link} from 'react-router-dom';
const OrderList = () =>{
    
    
    const [carts,setDoctors] = useState([]);

   
    useEffect(()=>{
        loadDoctor();
    },[]);

  
    const loadDoctor = async () =>{
        const result = await axios.get("http://localhost:8089/api/v2/allOrders");
        setDoctors(result.data);
    };

   

    const deleteDoctor = async id =>{
        await axios.delete(`http://localhost:8089/api/v2/orders/${id}`);
        loadDoctor();
    }

    return (
        
        <>
       
        <div className='container mt-3 card'>
            
            
<h1>Order List</h1>
<table class="table">
  <thead>
    <tr className='bg-dark text-white '>
      <th scope="col">#</th>
      <th scope="col">Date</th>
      <th scope="col">Cost</th>
      <th scope="col">Name</th>
      <th scope="col">Action</th>
     
    </tr>
  </thead>
  <tbody>
        {carts.map((cart,index)=>(
            <tr>
                <th scope='row'>{index+1}</th>
                <td>{cart.orderDate}</td>
                <td>{cart.totalCost}</td>
                <td>{cart.orderName}</td>
                
                <td>
                    <Link className="btn m-2" to={`/order/${cart.bookingOrderId}`}><i class="fa-solid fa-eye"></i></Link>
                    
                    <Link className="btn m-2" onClick={()=>{deleteDoctor(cart.bookingOrderId)}}><i class="fa-solid fa-trash-can"></i></Link>

                </td>
               
            </tr>
        ))}
  </tbody>
</table>
        </div>
         <div><Navbar/></div>
        </>
    );
}

export default OrderList;