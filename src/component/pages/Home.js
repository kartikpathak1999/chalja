import React, {useState, useEffect} from 'react';
import axios from 'axios';
const Home = () =>{
    const [users,setUsers] = useState([]);

    useEffect(()=>{
        loadUser();
    },[]);

    const loadUser = async () =>{
        const result = await axios.get("http://localhost:3001/users");
        setUsers(result.data);
    }

    return (
        <div className='container'>
            <h1>
                Home Page
            </h1>

            <table class="table">
  <thead>
    <tr className='bg-dark text-white '>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">UserName</th>
      <th scope="col">Emails</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
        {users.map((user,index)=>(
            <tr>
                <th scope='row'>{index+1}</th>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                    
                </td>
            </tr>
        ))}
  </tbody>
</table>
        </div>
    );
}

export default Home;