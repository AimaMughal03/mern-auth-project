import { useState } from "react"
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
function Register() {


    const [form, setForm] = useState({username:"", email:"", password:""});
    const [image, setImage] = useState(null)
    const navigate = useNavigate(); 


    const handleChange = (e) =>{
        setForm({
        ...form,
        [e.target.name] : e.target.value
        })
        }

        const handleSubmit = async () => {

        try {

          const formData = new FormData();
          formData.append("username", form.username);
          formData.append("email", form.email);
          formData.append("password", form.password);
          formData.append("image", image);


        const res = await api.post("/user/register",formData, {headers:{"Content-Type":"multipart/form-data"}});
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
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <button onClick={handleSubmit}>Register</button>
      <button onClick={() => navigate('/login')}>Login Here</button>
    </div>
  )
}

export default Register
