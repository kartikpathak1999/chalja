import axios from "axios";
import { NavLink,useHistory } from "react-router-dom";
import{React,useState} from "react";

const DSignUp = () =>{
    let history = useHistory();
    const [doctor,setDoctor] = useState({
        productName:"",
        productType:"",
        category:"",
        rating:"",
        review:"",
        imageUrl:"",
        price:"",
        description:"",
        specification:"",
        

        
    });

    const {productName,productType,category,rating,review,imageUrl,price,description,specification} = doctor;

    const onInputChange = e =>{
        setDoctor({
            ...doctor,[e.target.name]:e.target.value
        });
    };

    const onSubmit = async e =>{
        e.preventDefault();
        await axios.post("http://localhost:8086/api/v2/addProducts",doctor);
        history.push("/adminproducts");

    }

    return(
        <>
            <h2 className="text-center ">Add Products</h2>
            
           
            <div className="row w-50 mx-auto p-3 shadow card mt-3 ">
                
                <form className="col-12" onSubmit={e=> onSubmit(e)}>
                    <div className="form-group">
                        <input
                        type="text"
                        className="form-control form-control-sm m-3 "
                        placeholder="Enter Name"
                        name = "productName"
                        value={productName}
                        required
                        onChange={e=> onInputChange(e)}
                        ></input>
                        </div>
                    <div className="form-group">
                    <input
                        type="text"
                        className="form-control form-control-sm m-3"
                        placeholder="product Type"
                        name = "productType"
                        value={productType}
                        required
                        onChange={e=> onInputChange(e)}
                        ></input>   
                    </div>
                    <div className="form-group">
                    <input
                        type="text"
                        className="form-control form-control-sm m-3"
                        placeholder="Enter Category"
                        name = "category"
                        value={category}
                        onChange={e=> onInputChange(e)}
                        required
                        ></input>   
                    </div>
                    <div className="form-group">
                    <input
                        type="number"
                        className="form-control form-control-sm m-3"
                        placeholder="Enter Rating"
                        name = "rating"
                        value={rating}
                        min="0"
                        max="5"
                        required
                        onChange={e=> onInputChange(e)}
                        ></input>   
                    </div>
                    <div className="form-group">
                    <input
                        type="text"
                        className="form-control form-control-sm m-3"
                        placeholder="Enter Review"
                        name = "review"
                        value={review}
                        required
                        onChange={e=> onInputChange(e)}
                        ></input>   
                    </div>
                    <div className="form-group">
                    <input
                        type="file"
                        className="form-control form-control-sm m-3"
                        placeholder="Enter ImageUrl"
                        name = "imageUrl"
                        value={imageUrl}
                        required
                        onChange={e=> onInputChange(e)}
                        ></input>   
                    </div>
                    <div className="form-group">
                    <input
                        type="number"
                        className="form-control form-control-sm m-3"
                        placeholder="Enter Price"
                        name = "price"
                        value={price}
                        min="0"
                        required
                        onChange={e=> onInputChange(e)}
                        ></input>   
                    </div>
                    <div className="form-group">
                    <input
                        type="text"
                        className="form-control form-control-sm m-3"
                        placeholder="Enter Description"
                        name = "description"
                        value={description}
                        required
                        onChange={e=> onInputChange(e)}
                        ></input>   
                    </div>
                    <div className="form-group">
                    <input
                        type="text"
                        className="form-control form-control-sm m-3"
                        placeholder="Enter specification"
                        name = "specification"
                        value={specification}
                        required
                        onChange={e=> onInputChange(e)}
                        ></input>   
                    </div>
                    
                    <button className="btn btn-primary btn-block m-3">Add Product</button>
                   
                </form>
                
                
                

            </div>
            
        </>
    );
}

export default DSignUp;