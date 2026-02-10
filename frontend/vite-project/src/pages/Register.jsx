import { useState } from "react"
import axios from 'axios';
import { useNavigate } from "react-router-dom";
function Register() {


    const [form, setForm] = useState({username:"", email:"", password:""});
    const navigate = useNavigate(); 

    const handleChange = (e) =>{
        setForm({
        ...form,
        [e.target.name] : e.target.value
        })
        }

        const handleSubmit = async () => {

        try {
        const res = await axios.post("https://mern-auth-project-85x2.vercel.app/api/v1/user/register",form);
        alert(res.data.message);
        navigate('/login')
        }
        catch (error){
        alert(`Error: ${error.response.data.message}`);
        }
    }

    

  return (
    <div className="container">
        <h1 >Register</h1>
      <input type="text" name='username' placeholder='username' onChange={handleChange} />
      <input type="email" name='email' placeholder='email' onChange={handleChange} />
      <input type="password" name='password' placeholder='password' onChange={handleChange} />
      <button onClick={handleSubmit}>Register</button>
      <button onClick={() => navigate('/login')}>Login Here</button>
    </div>
  )
}

export default Register
