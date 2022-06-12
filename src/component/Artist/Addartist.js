import axios from "axios";
import { useHistory } from "react-router-dom";
import{React,useState} from "react";
import  {Link, NavLink, useRouter} from "react-router-dom";

const Addartist = () =>{
    let history = useHistory;
    const [artist,setArtist] = useState({
        name:"",
        dob:"",
        bio:"",
        songs:""
    });

    const {name,dob,bio,songs} = artist;

    const onInputChange = e =>{
        
        setArtist({
            ...artist,[e.target.name]:e.target.value
        });
    };

    const onSubmit = async e =>{
        e.preventDefault();
        await axios.post("http://localhost:3001/artists",artist);
        history.push("/");

    }

    return(
        <div className="container">
            <div className="w-75 mx-auto shadow p-5">
                <h2 className="text-center mb-4">Add a Artist</h2>
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
                        placeholder="Enter DOB"
                        name = "dob"
                        value={dob}
                        onChange={e=> onInputChange(e)}
                        ></input>
                        
                    </div>
                    <div className="form-group">
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Enter BIO"
                        name = "bio"
                        value={bio}
                        onChange={e=> onInputChange(e)}
                        ></input>   
                    </div>
                    
                    <button className="btn btn-primary btn-block">Add Artist</button>
                </form>

            </div>
            
        </div>
    );
}

export default Addartist;