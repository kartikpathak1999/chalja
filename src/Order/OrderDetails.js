import React,{useState, useEffect} from "react";
import {Link, useParams} from 'react-router-dom';
import axios  from "axios";
import userEvent from "@testing-library/user-event";

const OrderDetails = () =>{

    const [product,setProduct] = useState({
        orderDate:"",
        
        address:"",
       
        totalCost:0,
       
        orderName:"",

        
        
    });

    const {id} = useParams();

    useEffect(()=>{
        loadDoctor();
    },[]);

    const loadDoctor = async () =>{
        const result = await axios.get(`http://localhost:8089/api/v2/orders/${id}`);
        setProduct(result.data);
    }

    return (
        <div className="container py-4">
            <Link className="btn btn-primary " to="/rdashboard">
                Back to Browse
            </Link>
            <h1 className="display-4"> Cart Id: {id}</h1>
            <hr/>
            <ul className=" list-group w-50">
                <li className="list-group-item"> Order Date : {product.orderDate}</li>
               
                 <li className="list-group-item"> Address : {product.address}</li>
               
                 <li className="list-group-item"> Total Cost : {product.totalCost}</li>
               
                <li className="list-group-item"> Name : {product.orderName}</li>

                
               
                
                
                

            </ul>
            {/* <h1>Rs.{product.prices}</h1> */}
            
        </div>
    );

}

export default OrderDetails;