
import { useEffect, useState } from 'react'
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';



function Dashboard() {

    const [tasks, setTasks] = useState([]);
    const [title, setTitle]= useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        fetchTasks();
    }, [])

    const fetchTasks = async() => {
        try {

            const res = await api.get("/task/")
            setTasks(res.data.data);
        } 
        catch (error) {
            console.log(error);
        }
    }

    const createTasks = async() => {
        try {

            await api.post("/task/create", {title, description});

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
            
            await api.delete(`/task/${id}`);
            fetchTasks();
        } 
        catch (error) {
            console.log(error);
        }
    }

    const completeTask = async(id) => {
        
        await api.patch(`/task/completed/${id}`, {})
            
        fetchTasks();
         
        
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    }


    return(

        <div className="dashboard">

        <div className="navbar">
            <div className="profile">
                <img src={user.profilePicture} alt="profile"/>
                <span>{user.username}</span>
            </div>

            <button className="logoutBtn" onClick={handleLogout}>
                Logout
            </button>
        </div>

        <div className="container">
            <h1>To-Do App</h1>

            <input 
                type="text" placeholder="Task title" value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <input 
                type="text" placeholder="Task description" value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <button onClick={createTasks}>Add Task</button>
        </div>

        <div className="tasks">
            {
                tasks.map((task) => (
                    <div key={task._id} className="taskCard">

                        <h3 style={{textDecoration: task.completed ? "line-through" : "none"}}>{task.title}</h3>
                        <p>{task.description}</p>

                        <div className="taskBtns">
                            <button onClick={() => completeTask(task._id)}>Mark Done</button>
                            <button onClick={() => deleteTask(task._id)}>Delete</button>
                        </div>

                    </div>
                ))
            }
        </div>

    </div>
    )

}

export default Dashboard;


