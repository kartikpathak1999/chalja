import axios from "axios";
import { NavLink,useHistory } from "react-router-dom";
import{React,useState} from "react";

const AddCart = () =>{
    let history = useHistory();
    const [doctor,setDoctor] = useState({
        cartname:"",
        no_of_carts:"",
        prices:"",
    });

    const {cartname, no_of_carts, prices} = doctor;

    const onInputChange = e =>{
        setDoctor({
            ...doctor,[e.target.name]:e.target.value
        });
    };

    const onSubmit = async e =>{
        e.preventDefault();
        await axios.post("http://localhost:8084/api/v2/addProducts",doctor);
        history.push("/cartlist");
    }

    return(
        <div className="container">
            <div className="w-75 mx-auto shadow p-5">
                <h2 className="text-center mb-4">Add Cart</h2>
                <form onSubmit={e=> onSubmit(e)}>
                    <div className="form-group">
                        <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Enter Cart Name"
                        name = "cartname"
                        value={cartname}
                       onChange={e=> onInputChange(e)}
                        ></input>
                        </div>
                    <div className="form-group">
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="no_of_carts"
                        name = "no_of_carts"
                        value={no_of_carts}
                        onChange={e=> onInputChange(e)}
                        ></input>   
                    </div>
                    <div className="form-group">
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Prices"
                        name = "prices"
                        value={prices}
                        onChange={e=> onInputChange(e)}
                        ></input>   
                    </div>
                    <button className="btn btn-primary btn-block">Add Cart</button>
                </form>
            </div>
        </div>
    );
}

export default AddCart;