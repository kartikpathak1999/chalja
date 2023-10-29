import React from 'react';
import  {Link} from "react-router-dom";
import {RiFileList2Line} from 'react-icons/ri';
import {BsFillCartCheckFill} from 'react-icons/bs'
import {BsBagCheckFill} from 'react-icons/bs'
import {FaHandHoldingHeart} from 'react-icons/fa'
import './nav.css'
const Navbar = () =>{
  return (
    <>
      <div className='snav'>
        <Link className='snav-a' to = "/cartlist"><BsFillCartCheckFill className='icon'/></Link>
        <Link className='snav-a' to = "/rdashboard"><RiFileList2Line className='icon'/></Link>
        <Link className='snav-a' to = "/orderlist"><BsBagCheckFill className='icon'/></Link>
        <Link className='snav-a' to = "/wishlist"><FaHandHoldingHeart className='icon'/></Link>
      </div>
    </>
  );
}

export default Navbar;