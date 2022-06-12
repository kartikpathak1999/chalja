import axios from "axios";
import { useHistory } from "react-router-dom";
import{React,useState} from "react";
import  {Link, NavLink, useRouter} from "react-router-dom";

const Addsong = () =>{
    let history = useHistory;
    const [song,setSong] = useState({
        name:"",
        artist:"",
        dateOfRelease:"",
        img:"",
        rating:"",
    });

    const {name,artist,dateOfRelease,img,rating} = song;

    const onInputChange = e =>{
        
        setSong({
            ...song,[e.target.name]:e.target.value
        });
    };

    const onSubmit = async e =>{
        e.preventDefault();
        await axios.post("http://localhost:3001/songs",song);
        history.push("/");

    }

    return(
        <div className="container">
            <div className="w-75 mx-auto shadow p-5">
                <h2 className="text-center mb-4">Add a Song</h2>
                <form onSubmit={e=> onSubmit(e)}>
                    <div className="form-group">
                        <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Enter Name"
                        name = "name"
                        value={name}
                        onChange={e=> onInputChange(e)}
                        ></input>
                        </div>
                    <div className="form-group">
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Enter Artist"
                        name = "artist"
                        value={artist}
                        onChange={e=> onInputChange(e)}
                        ></input>
                        <Link className="nav-link"  aria-current="page" to="/artist/add">Add Artist </Link>   
                    </div>
                    <div className="form-group">
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Enter date Of Release"
                        name = "dateOfRelease"
                        value={dateOfRelease}
                        onChange={e=> onInputChange(e)}
                        ></input>   
                    </div>
                    <div className="form-group">
                    <label>Select Artwork</label>
                    <input
                        type="file"
                        className="form-control form-control-lg" name="img" 
                        value={img}
                        onChange={(e)=>onInputChange(e)} 
                        >
                       </input>
                          
                    </div>
                    <div className="form-group">
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Enter Rating Number"
                        name = "rating"
                        value={rating}
                        onChange={e=> onInputChange(e)}
                        ></input>   
                    </div>
                    <button className="btn btn-primary btn-block">Add Song</button>
                </form>

            </div>
            
        </div>
    );
}

export default Addsong;