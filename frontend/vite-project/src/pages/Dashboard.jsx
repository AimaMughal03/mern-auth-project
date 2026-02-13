
import { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Dashboard() {

    const [tasks, setTasks] = useState([]);
    const [title, setTitle]= useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchTasks();
    }, [])

    const fetchTasks = async() => {
        try {

            const res = await axios.get("https://mern-auth-project-backend-seven.vercel.app/api/v1/task/", {headers: {Authorization:token}})
            
            setTasks(res.data.data);
        } 
        catch (error) {
            console.log(error);
        }
    }

    const createTasks = async() => {
        try {

            await axios.post("https://mern-auth-project-backend-seven.vercel.app/api/v1/task/create", {title, description},
                {
                    headers: {Authorization:token}
                }
            );

            setTitle("");
            setDescription("");
            fetchTasks();
            
        } 
        catch (error) {
            console.log(error);
        }
    }

    const deleteTask = async(id) => {
        try {
            
            await axios.delete(`https://mern-auth-project-backend-seven.vercel.app/api/v1/task/${id}`, {headers:{Authorization:token}});

            fetchTasks();
        } 
        catch (error) {
            console.log(error);
        }
    }

    const completeTask = async(id) => {
        
        await axios.patch(`https://mern-auth-project-backend-seven.vercel.app/api/v1/task/completed/${id}`,
            {},
            {headers:{Authorization:token}})
            
        fetchTasks();
         
        
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    }


    return(
        <div >

            <div className="container">
            <h1>To-Do App</h1>

            <input type="text" placeholder="Task title" value={title} 
            onChange={(e) => setTitle(e.target.value)}
            />

            <input type="text" placeholder="Task description" value={description} 
            onChange={(e) => setDescription(e.target.value)}
            />

            <button onClick={createTasks}>Add Task</button>
            </div>

            <div className='container'>
                {
                    tasks.map((task) => (
                        <div key={task._id} className='user'>
                            
                            <h3 style={{textDecoration: task.completed?"line-through":"none"}}>{task.title}</h3>
                            <p>{task.description}</p>

                            <button onClick={() => completeTask(task._id)}>Mark Done</button>
                            <button onClick={() => deleteTask(task._id)}>Delete</button>

                            
                        </div>


                    ))
                }

                <button onClick={handleLogout}>Logout</button>

            </div>

        </div>
    )

}

export default Dashboard;

// function Dashboard() {


//     const [users, setUsers] = useState([]);

//     const navigate = useNavigate();

//     const handleLogout = () => {
//         localStorage.removeItem("token");
//         navigate("/login");
//     }

//     useEffect(() => {

//         const getUsers = async() => {
//             try {

//                 const token = localStorage.getItem("token");

//                 const res = await axios.get("https://mern-auth-project-backend-seven.vercel.app/api/v1/user/getUser", { headers:{Authorization:token}})
                
//                 setUsers(res.data.data);
//             } 
//             catch (error) {
//                 console.log(error)
//             }
//         }

//         getUsers();
//     }, []);

//   return (
//     <div className='container'>
//       <h1>Dashboard</h1>
      

//       {users.map((u) => (
//         <div className='user' key={u._id}>
//             <p>{u.username}</p>
//             <p>{u.email}</p>

//         </div>
//       ))}

//       <button onClick={handleLogout}>Logout</button>
//     </div>
//   )
// }

// export default Dashboard
