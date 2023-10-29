import React from "react";
import  {Link, NavLink, useRouter} from "react-router-dom";
import './styles.css'
import video from '../../assets/video.mp4';

const Front= ()=>{
    return(
    <>
        <div className="text-center main">
            {/* Video being loaded in the background */}
            <video src={video} autoPlay loop muted/>
            <div className="content">
                <h1 data-text="Welcome to Online Shopping Website" className="fh2">Welcome to Online Shopping Website</h1>
                <img className="image"
                    src="https://www.techprevue.com/wp-content/uploads/2016/09/fashion-online-shopping-sites.jpg" alt="" />
                <br></br>
                <Link className='btn btn-dark w-25 m-3 fbutton' to = "/login">Login</Link>
                <Link className='btn btn-dark w-25 m-3 fbutton' to = "/register">Sign Up</Link>
            </div>
        </div>
    </>
    )
}

export default Front;