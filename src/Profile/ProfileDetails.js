import React,{useState, useEffect} from "react";
import {Link, useParams} from 'react-router-dom';
import axios  from "axios";
import userEvent from "@testing-library/user-event";

const DoctorDetails = () =>{

    const [product,setProduct] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        address:"",
        contactNumber:"",
        
    });

    const {id} = useParams();

    useEffect(()=>{
        loadDoctor();
    },[]);

    const loadDoctor = async () =>{
        const result = await axios.get(`http://localhost:8085/api/v2/profile/${id}`);
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
                <li className="list-group-item"> FirstName : {product.firstName}</li>
                <li className="list-group-item"> LastName : {product.lastName}</li>
                 <li className="list-group-item"> Email : {product.email}</li>
                <li className="list-group-item"> Password : {product.password}</li>
                 <li className="list-group-item"> Address : {product.address}</li>
                <li className="list-group-item"> Contact Number : {product.contactNumber}</li>
               
                
                
                

            </ul>
            {/* <h1>Rs.{product.prices}</h1> */}
            <Link className="btn btn-dark">Add to Cart</Link>
        </div>
    );

}

export default DoctorDetails;