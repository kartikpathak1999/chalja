import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
const Home = () =>{
    const [users,setUsers] = useState([]);
    const [songs,setSongs] = useState([]);

    useEffect(()=>{
        loadUser();
    },[]);
    useEffect(()=>{
        loadSong();
    },[]);

    const loadUser = async () =>{
        const result = await axios.get("http://localhost:3001/users");
        setUsers(result.data);
    };
    const loadSong = async () =>{
        const result = await axios.get("http://localhost:3001/songs");
        setSongs(result.data);
    };

    const deleteUser = async id =>{
        await axios.delete(`http://localhost:3001/users/${id}`);
        loadUser();
    }

    return (
        <div className='container'>
            <h1>
               This is Home Page
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
                    <Link className="btn m-2" to={`/user/${user.id}`}><i class="fa-solid fa-eye"></i></Link>
                    <Link className="btn m-2" to={`/user/edit/${user.id}`}><i class="fa-solid fa-pen"></i></Link>
                    <Link className="btn m-2" onClick={()=>{deleteUser(user.id)}}><i class="fa-solid fa-trash-can"></i></Link>

                </td>
            </tr>
        ))}
  </tbody>
</table>
<h1>Top 5 Songs</h1>
<table class="table">
  <thead>
    <tr className='bg-dark text-white '>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Artist</th>
      <th scope="col">Date Of Release</th>
      <th scope="col">Rating</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
        {songs.map((song,index)=>(
            <tr>
                <th scope='row'>{index+1}</th>
                <td>{song.name}</td>
                <td><img src={song.img} alt = "no image"/></td>
                <td>{song.dateOfRelease}</td>
                <td>{song.rating}</td>
                <td>
                    <Link className="btn m-2" to={`/user/${song.id}`}><i class="fa-solid fa-eye"></i></Link>
                    <Link className="btn m-2" to={`/user/edit/${song.id}`}><i class="fa-solid fa-pen"></i></Link>
                    <Link className="btn m-2" onClick={()=>{deleteUser(song.id)}}><i class="fa-solid fa-trash-can"></i></Link>

                </td>
            </tr>
        ))}
  </tbody>
</table>
        </div>
    );
}

export default Home;