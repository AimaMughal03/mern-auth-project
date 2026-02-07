import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {


    const [users, setUsers] = useState([]);

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    }

    useEffect(() => {

        const getUsers = async() => {
            try {

                const token = localStorage.getItem("token");

                const res = await axios.get("http://localhost:5000/api/v1/user/getUser", { headers:{Authorization:token}})
                
                setUsers(res.data.data);
            } 
            catch (error) {
                console.log(error)
            }
        }

        getUsers();
    }, []);

  return (
    <div className='container'>
      <h1>Dashboard</h1>
      

      {users.map((u) => (
        <div className='user' key={u._id}>

            <h3>{u.username}</h3>
            <h3>{u.email}</h3>

        </div>
      ))}

      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Dashboard
