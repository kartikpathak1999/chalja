import React,{useState, useEffect} from "react";
import {Link, useParams} from 'react-router-dom';
import axios  from "axios";
import userEvent from "@testing-library/user-event";

const DoctorDetails = () =>{

    const [product,setProduct] = useState({
        name:"",
        type:"",
        email:"",
        imageUrl:"",
        
    });
    const [img, setImg] = useState("");

    const {id} = useParams();

    useEffect(()=>{
        loadDoctor();
        
    },[]);
    useEffect(()=>{
        setImg("/images/"+product.imageUrl.substring(12))
    },)

    const loadDoctor = async () =>{
        const result = await axios.get(`http://localhost:8086/api/v2/products/${id}`);
        setProduct(result.data);
    }

    return (
        <div className="container  py-4">
            <Link className="btn btn-primary " to="/rdashboard">
                Back to Browse
            </Link>
            <h1 className="display-4"> Product Id: {id}</h1>
            <hr/>
            <div className="">
            <ul className=" list-group w-50">
                <li className="list-group-item"> Name : {product.productName}</li>
                <li className="list-group-item"> Type : {product.productType}</li>
                <li className="list-group-item"> Category : {product.category}</li>
                <li className="list-group-item"> Review : {product.review}</li>
                <li className="list-group-item"> Rating : {product.rating}</li>
                <li className="list-group-item"> Image :<br/> <img src={img} alt="img" /></li>
                <li className="list-group-item"> Desc : {product.description}</li>
                <li className="list-group-item"> Specs : {product.specification}</li>
            </ul>
            </div>
           <h1 className="h1 ">Rs.{product.price}/-</h1> 
        </div>
    );

}

export default DoctorDetails;