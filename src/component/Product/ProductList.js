import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Navbar from '../layout/Navbar';
import {Link} from 'react-router-dom';
import {RiAddFill} from 'react-icons/ri'
import './product.css';
import AuthService from '../../services/auth.service';
import { specialCharMap } from '@testing-library/user-event/dist/keyboard';
import {AiFillStar} from 'react-icons/ai' 
import {AiOutlineStar} from 'react-icons/ai'
import {AiFillHeart} from 'react-icons/ai'
import { IconContext } from 'react-icons/lib';

const currentUser = AuthService.getCurrentUser();

const ProductList = () =>{
    
   
    const [products,setProducts] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));
    
    useEffect(()=>{
        loadProducts();
       //console.log("doctorapp/src/assets/"+`${products[5].imageUrl.slice(12)}`)
    },[]);

   
    const loadProducts = async () =>{
        const result = await axios.get("http://localhost:8083/api/v2/allproducts",{headers:{
          'authorization': `Bearer ${user.accessToken}`,
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
        }});
        
        setProducts(result.data);
    };

  function rating(x){
    if(x==1) return <IconContext.Provider 
                value={{color:'gold' ,size:'40px'}}>
                <h1><AiFillStar/><AiOutlineStar/><AiOutlineStar/><AiOutlineStar/><AiOutlineStar/></h1>
                </IconContext.Provider>
                
    
    if(x==2) return <IconContext.Provider 
                value={{color:'gold' ,size:'40px'}}>
                <h1><AiFillStar/><AiFillStar/><AiOutlineStar/><AiOutlineStar/><AiOutlineStar/></h1>
                </IconContext.Provider>
    if(x==3) return <IconContext.Provider 
                value={{color:'gold' ,size:'40px'}}>
                <h1><AiFillStar/><AiFillStar/><AiFillStar/><AiOutlineStar/><AiOutlineStar/></h1>
                </IconContext.Provider>
    if(x==4) return <IconContext.Provider 
                value={{color:'gold' ,size:'40px'}}>
                <h1><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/><AiOutlineStar/></h1>
                </IconContext.Provider>
    if(x==5) return <IconContext.Provider 
                value={{color:'gold' ,size:'40px'}}>
                <h1><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/></h1>
                </IconContext.Provider>
  }
  

    

    const addToCart = async id =>{
     
        const crole= currentUser.roles[0];
        let newProduct = products.filter(x=>x.cust_id==id);
        let newProduct2 = newProduct[0];
        console.log(id);
        if(crole=="ROLE_ADMIN")
        await axios.post(`http://localhost:3001/cart1`,newProduct2);
        else
        await axios.post(`http://localhost:3001/cart`,newProduct2);
        
        
    }
    const addToWishList = async id =>{
     
        const crole= currentUser.roles[0];
        let newProduct = products.filter(x=>x.cust_id==id);
        let newProduct2 = newProduct[0];
        console.log(id);
        if(crole=="ROLE_ADMIN")
        await axios.post(`http://localhost:3001/wish1`,newProduct2);
        else
        await axios.post(`http://localhost:3001/wish`,newProduct2);
        
        
    }

   

    return (
        
        <>
       
        <div className='container mt-3'>
            
            
<h1 className='heading text-center'>Available Produts</h1>
<section id='portfolio'>
      

      <div className='container portfolio__container text-center'>
        {
          products.map((product, index)=>{
            return (
              <article key={index} className="portfolio__item card ">
          <div className="portfolio__item-image">
            
            <img src={"/images/"+product.imageUrl.substring(12)} alt="img" />
            </div>
            <h3>{product.productName}</h3>
            <h5 className='text-center'>Rs.{product.price}</h5>

            <div className='portfolio__item-cta' style={{margin_left:"50%"}}>
              
              <Link className="btn m-2 faction1" to={`/doctor/${product.cust_id}`}><i class="fa-solid fa-eye"></i></Link>
              
            <span className='h3'>{rating(product.rating)}</span>
           
              <Link className='btn m-2 faction1' onClick={()=>addToWishList(product.cust_id)}>
                <IconContext.Provider 
                value={{color:'red'}}>
                <AiFillHeart/>
                </IconContext.Provider>
                </Link>
            </div>
             <Link className="btn btn-dark faction3 " onClick={()=>{addToCart(product.cust_id)}}>Add to Cart</Link>
            </article>
            )
           
            
          })
        }
            
          
        
      </div>
    </section>

        </div>
        <div><Navbar/></div>
        </>
    );
}

export default ProductList;