import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function Login(){

    const [form, setForm] = useState({email:"", password:""});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = async() => {
 
        try {
            const res = await api.post("/user/login", form);
            localStorage.setItem("token", res.data.token);

            localStorage.setItem("user", JSON.stringify(res.data.user));

            navigate('/dashboard');

            alert("Login Successful");

        } 
        catch (error) {
            alert("Invalid email or password");
            console.log(error);
        }
    }

    return(
        <div className="container">
            <h1 >Login</h1>
            <input type="email" name='email' placeholder='email' onChange={handleChange} />
            <input type="password" name='password' placeholder='password' onChange={handleChange} />
            <button onClick={handleSubmit}>Login</button>
            <button onClick={() => navigate('/')}>Register Here</button>

        </div>
    )

}


export default Login;