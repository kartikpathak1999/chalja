import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from "axios"
import React, { useState } from 'react'
import './loading.css'
import {Link} from 'react-router-dom'
import have from '../../assets/have.png'
import { useEffect } from "react"

import AuthService from "../../services/auth.service"

export default function PaymentForm() {
    const currentUser = AuthService.getCurrentUser();
    
    var today = new Date();
    
    const [order,setOrder] = useState({
        orderDate:today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate(),
        address:"",
        totalCost:localStorage.getItem('1'),
        orderName:""
    });
    
    const [cart, setCart] = useState([]);

    const loadCart = async ()=>{
        if(currentUser.roles[0]=="ROLE_ADMIN"){
        var result = await axios.get("http://localhost:3001/cart1")}
        else{
        var result = await axios.get("http://localhost:3001/cart")}
        setCart(result.data);
    }

    useEffect(()=>{
        loadCart();
        console.log(cart)
    },[])

    const {orderDate, totalCost,address,orderName} = order;

    const onInputChange = e =>{
        setOrder({
            ...order,[e.target.name]:e.target.value
        });
    };

    const [success, setSuccess ] = useState(false)
    const stripe = useStripe()
    const elements = useElements()
    const [isLoading,setIsLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })
        if(!error) {
            try {
                setIsLoading(true)
                const {id} = paymentMethod
                const response = await axios.post("http://localhost:4000/payment", {
                    amount: localStorage.getItem('1'),
                    id
                })
                await axios.post("http://localhost:8089/api/v2/addOrders",order);
                if(response.data.success) {
                    console.log("Successful payment")
                    setIsLoading(false)
                    setSuccess(true)
                }
            }
            catch (error) {
                console.log("Error", error)
            }
        } 
        else{
        console.log(error.message)
        }
    }

    //conditional rendering
    if(isLoading){
        return (
            <div className="container">
                <div className="loader-container">
                    <div className="spinner"></div>
                </div>
            </div>
        )  
    }
    
    return (
        <div className="row">
            <div className="col-4 card shadow  mt-5 p-3 ml-5">
                <h3 className="mb-3"> Your Checkout List</h3>
                <h5>Items </h5>
                    {   
                        cart.map((item, index)=>{
                            return(
                                <>
                                    <span>{index}.  {item.productName} of Rs.{item.price}/-</span>
                                </>
                            )
                        })
                    }
                <h2>Total Price is : Rs. {localStorage.getItem('1')}/- only</h2>
                <img src={have} 
                    style={{height:"50%", width:"50%", alignItems:"center"}}
                    alt="img" />
            </div>
            <div className="container text-center col-6">
                <div className=" card shadow  mt-5 p-3   text-center">
                    {!success ? 
                        <form onSubmit={handleSubmit}>
                            <fieldset className="">
                                <div className="card-body text-left">
                                    <h3 className="text-left m-150">Order Details</h3>
                                    
                                    <div className="form-group required">
                                        <h6>Order Date:</h6>
                                        <input
                                            type="text"
                                            className="form-control form-control-sm mb-3"
                                            placeholder="orderDate"
                                            name = "orderDate"
                                            value={orderDate}
                                        // onChange={e=> onInputChange(e)}
                                        ></input>
                                    </div>
                                
                                    <div className="form-group">
                                        <h6>Address:</h6>
                                        <input
                                            type="text"
                                            className="form-control form-control-sm mb-3"
                                            placeholder="Enter the address of the receiver"
                                            name = "address"
                                            value={address}
                                            onChange={e=> onInputChange(e)}
                                            required>
                                        </input>   
                                    </div>
                                
                                    <div className="form-group">
                                        <h6>Amount to be paid:</h6>
                                        <input
                                            type="number"
                                            className="form-control form-control-sm mb-3"
                                            placeholder=''
                                            name = "totalCost"
                                            value={totalCost}
                                            // onChange={e=> onInputChange(e)}
                                        ></input>   
                                    </div>

                                    <div className="form-group">
                                        <h6>Receiver's Name:</h6>
                                        <input 
                                            type="text"
                                            className="form-control form-control-sm mb-3"
                                            placeholder="Enter the name of the receiver"
                                            name = "orderName"
                                            value={orderName}
                                            onChange={e=> onInputChange(e)}
                                            required >
                                        </input>   
                                    </div>

                                    <h3 className="text-left m-150">Enter Your Card Details</h3>
                                    <input type="text" placeholder="Name on Card" className="card-header card" 
                                        style={{width:"100%" }} 
                                        required>
                                    </input>
                            
                                    <CardElement className="card-header" />
                                </div>
                            </fieldset>
                            <button className=" text-center btn btn-success" 
                                style={{width:"50%" }} >Pay Rs.{localStorage.getItem("1")}
                            </button>
                        </form>
                    :
                        <div>
                            <img className="img" 
                                src="https://img.freepik.com/free-vector/delivery-staff-ride-motorcycles-shopping-concept_1150-34879.jpg?w=2000" 
                                style={{width:"500px", margin:"3rem"}}
                                alt="" 
                            />
                            <h1>Yayy! Your order is on the way</h1>
                            <Link to="/rdashboard" className="btn btn-dark"> Back to Browse</Link>
                        </div> 
                    }
                </div>
            </div>
        </div>
    )
}