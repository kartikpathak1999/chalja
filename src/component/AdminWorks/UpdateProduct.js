import axios from "axios";
import { NavLink,useHistory, useParams } from "react-router-dom";
import{React,useState, useEffect} from "react";

const UpdateProduct = () =>{
    let history = useHistory();
       
    const {id} = useParams();
    useEffect(()=>{
        loadProduct();
    },[]);
    
    // useEffect(()=>{
        
    // })
    
    const loadProduct = async () =>{
        const result = await axios.get(`http://localhost:8086/api/v2/products/${id}`);
        setProduct(result.data);
    }
    const [product,setProduct] = useState({
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

    //destructurizing the product object
    const {productName,productType,category,rating,review,imageUrl,price,description,specification} = product;

    const onInputChange = e =>{
        setProduct({
            ...product,[e.target.name]:e.target.value
        });
    };

    const onSubmit = async e =>{
        e.preventDefault();
        await axios.put(`http://localhost:8086/api/v2/product/${id}`,product);
        history.push("/adminproducts");
    }

    return(
        <div className="container">
            <div className="w-75 mx-auto shadow p-5">
                <h2 className="text-center mb-4">Update</h2>
                <form onSubmit={e=> onSubmit(e)}>
                    <div className="form-group">
                        <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Enter Name"
                        name = "productName"
                        value={productName}
                        onChange={e=> onInputChange(e)}
                        ></input>
                        </div>
                    <div className="form-group">
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="product Type"
                        name = "productType"
                        value={productType}
                        onChange={e=> onInputChange(e)}
                        ></input>   
                    </div>
                    <div className="form-group">
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Enter Category"
                        name = "category"
                        value={category}
                        onChange={e=> onInputChange(e)}
                        ></input>   
                    </div>
                    <div className="form-group">
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Enter Rating"
                        name = "rating"
                        value={rating}
                        onChange={e=> onInputChange(e)}
                        ></input>   
                    </div>
                    <div className="form-group">
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Enter Review"
                        name = "review"
                        value={review}
                        onChange={e=> onInputChange(e)}
                        ></input>   
                    </div>
                    <div className="form-group">
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Enter ImageUrl"
                        name = "imageUrl"
                        value={imageUrl}
                        onChange={e=> onInputChange(e)}
                        ></input>   
                    </div>
                    <div className="form-group">
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Enter Price"
                        name = "price"
                        value={price}
                        onChange={e=> onInputChange(e)}
                        ></input>   
                    </div>
                    <div className="form-group">
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Enter Description"
                        name = "description"
                        value={description}
                        onChange={e=> onInputChange(e)}
                        ></input>   
                    </div>
                    <div className="form-group">
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Enter specification"
                        name = "specification"
                        value={specification}
                        onChange={e=> onInputChange(e)}
                        ></input>   
                    </div>
                    <button className="btn btn-primary btn-block">Update Product</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateProduct;