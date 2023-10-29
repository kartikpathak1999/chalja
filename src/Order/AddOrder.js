import axios, { Axios } from "axios";
import { NavLink,useHistory } from "react-router-dom";
import{React,useState} from "react";

const AddOrder = () =>{
    var today = new Date();
    let history = useHistory();
    const [doctor,setDoctor] = useState({
        orderDate:today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate(),
        address:"",
        totalCost:localStorage.getItem('1'),
        orderName:"",
    });

    const {orderDate, totalCost,address,orderName} = doctor;

    const onInputChange = e =>{
        setDoctor({
            ...doctor,[e.target.name]:e.target.value
        });
    };

    const onSubmit = async e =>{
        e.preventDefault();
        await axios.post("http://localhost:8089/api/v2/addOrders",doctor);
        history.push("/orderlist");
    }

    return(
        <div>
            <div className="w-75 mx-auto shadow p-5">
                <form onSubmit={e=> onSubmit(e)}>
                    
                    <div className="form-group">
                        <h6>Order Date:</h6>
                        <input
                        type="text"
                        className="form-control form-control-sm mb-3"
                        placeholder="orderDate"
                        name = "orderDate"
                        value={orderDate}
                        // onChange={e=> onInputChange(e)}
                        ></input>
                        </div>
                    
                    <div className="form-group">
                        <h6>Address:</h6>
                    <input
                        type="text"
                        className="form-control form-control-sm mb-3"
                        placeholder="Enter the address of the receiver"
                        name = "address"
                        value={address}
                        onChange={e=> onInputChange(e)}
                        ></input>   
                    </div>
                    
                    <div className="form-group">
                        <h6>Amount to be paid:</h6>
                    <input
                        type="number"
                        className="form-control form-control-sm mb-3"
                        placeholder=''
                        name = "totalCost"
                        value={totalCost}
                        // onChange={e=> onInputChange(e)}
                        ></input>   
                    </div>
                    
                    <div className="form-group">
                        <h6>Receiver's Name:</h6>
                    <input 
                        type="text"
                        className="form-control form-control-sm mb-3"
                        placeholder="Enter the name of the receiver"
                        name = "orderName"
                        value={orderName}
                        onChange={e=> onInputChange(e)}
                        ></input>   
                    </div>
                    
                    <button className="btn btn-primary btn-block">Add Order</button>
                    
                </form>
            </div>
        </div>
    );
}

export default AddOrder;