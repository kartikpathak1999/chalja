import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './product.css';

const AdminProducts = () =>{
    
  const [products,setProducts] = useState([]);
    
  useEffect(()=>{
    loadProducts();
  },[]);

  //loads the products from the database
  const loadProducts = async () =>{
    const user = JSON.parse(localStorage.getItem('user'));
    const result = await axios.get("http://localhost:8083/api/v2/allproducts",{headers:{
      'authorization': `Bearer ${user.accessToken}`,
      'Accept' : 'application/json',
      'Content-Type': 'application/json'
    }});
    setProducts(result.data);
  };

  //delete the products
  const deleteProduct = async id =>{
    await axios.delete(`http://localhost:8086/api/v2/products/${id}`);
    loadProducts();
  }

  return (
    <>
      <h1 className='heading text-center mt-3'>Available Produts</h1>
      <div className='container mt-5 text-center card'>
        <table class="table mt-3">
          <thead>
            <tr className='bg-dark text-white '>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Category</th>
              <th scope="col">Price</th>
              <th scope="col">Action</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody >
            {products.map((product,index)=>(
              <tr>
                <th scope='row'>{index+1}</th>
                <td>{product.productName}</td>
                <td>{product.category}</td>
                <td>{product.price}</td>
                <td>
                  <Link className="btn m-2 faction1" to={`/doctor/${product.cust_id}`}><i class="fa-solid fa-eye"></i></Link>
                  <Link className="btn m-2 faction1" onClick={()=>{deleteProduct(product.cust_id)}}><i class="fa-solid fa-trash-can"></i></Link>
                  <Link className="btn btn-dark m-2 faction" to={`/updateproducts/${product.cust_id}`} >Edit</Link>
                </td>
              </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <div className='text-center container'>
       <Link className='btn btn-dark faction m-5 w-50' to='/dsignup'> Add Products</Link>
      </div>
    </>
  );
}

export default AdminProducts;