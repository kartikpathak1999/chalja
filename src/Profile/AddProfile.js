import axios from "axios";
import { NavLink,useHistory } from "react-router-dom";
import{React,useState} from "react";

const AddCart = () =>{
    let history = useHistory();
    const [doctor,setDoctor] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        address:"",
        contactNumber:"",
    });

    const {firstName, lastName, email, password, address, contactNumber} = doctor;

    const onInputChange = e =>{
        setDoctor({
            ...doctor,[e.target.name]:e.target.value
        });
    };

    const onSubmit = async e =>{
        e.preventDefault();
        await axios.post("http://localhost:8085/api/v2/addProfile",doctor);
        history.push("/profilelist");

    }

    return(
        <div className="container">
            <div className="w-75 mx-auto shadow p-5">
                <h2 className="text-center mb-4">Add Profile</h2>
                <form onSubmit={e=> onSubmit(e)}>
                    <div className="form-group">
                        <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Enter First Name"
                        name = "firstName"
                        value={firstName}
                        onChange={e=> onInputChange(e)}
                        ></input>
                        </div>
                    <div className="form-group">
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="lastName"
                        name = "lastName"
                        value={lastName}
                        onChange={e=> onInputChange(e)}
                        ></input>   
                    </div>
                    <div className="form-group">
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="email"
                        name = "email"
                        value={email}
                        onChange={e=> onInputChange(e)}
                        ></input>   
                    </div>
                    <div className="form-group">
                    <input
                        type="password"
                        className="form-control form-control-lg"
                        placeholder="password"
                        name = "password"
                        value={password}
                        onChange={e=> onInputChange(e)}
                        ></input>   
                    </div>
                    <div className="form-group">
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="address"
                        name = "address"
                        value={address}
                        onChange={e=> onInputChange(e)}
                        ></input>   
                    </div>
                    <div className="form-group">
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="contactNumber"
                        name = "contactNumber"
                        value={contactNumber}
                        onChange={e=> onInputChange(e)}
                        ></input>   
                    </div>
                    
                    
                    
                   
                    
                    
                    
                    
                    <button className="btn btn-primary btn-block">Add Profile</button>
                    
                </form>

            </div>
            
        </div>
    );
}

export default AddCart;