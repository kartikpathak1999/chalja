import React,{useState, useEffect} from "react";
import {Link, useParams} from 'react-router-dom';
import axios  from "axios";
import userEvent from "@testing-library/user-event";

const DoctorDetails = () =>{

    const [product,setProduct] = useState({
        cartname:"",
        no_of_carts:"",
        prices:"",
        
    });

    const {id} = useParams();

    useEffect(()=>{
        loadDoctor();
    },[]);

    const loadDoctor = async () =>{
        const result = await axios.get(`http://localhost:8084/api/v2/products/${id}`);
        setProduct(result.data);
    }

    return (
        <div className="container py-4">
            <Link className="btn btn-primary " to="/cartlist">
                Back to Browse
            </Link>
            <h1 className="display-4"> Cart Id: {id}</h1>
            <hr/>
            <ul className=" list-group w-50">
                <li className="list-group-item"> Name : {product.cartname}</li>
                <li className="list-group-item"> Number : {product.no_of_carts}</li>
               
                
                
                

            </ul>
            <h1>Rs.{product.prices}</h1>
            <Link className="btn btn-dark">Add to Cart</Link>
        </div>
    );

}

export default DoctorDetails;