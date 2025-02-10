import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginAccess } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState(""); // Store error message
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateCredentials = (username, password) => {
    // Simulate a user database (You can expand this later)
    const users = {
      admin: "admin123",
      user: "user123",
    };

    // Check if user exists and password matches
    return users[username] === password;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { username, password } = formData;

    // Reset previous error message
    setError("");

    // Simple validation
    if (!username || !password) {
      setError("Both fields are required.");
      return;
    }

    // Validate credentials using a helper function
    if (validateCredentials(username, password)) {
      dispatch(loginAccess({ username }));
      navigate("/trucks");
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            placeholder="Enter Username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>

        <div className="form-group mt-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        {error && <div className="text-danger mt-2">{error}</div>} {/* Display error messages */}

        <button type="submit" className="btn btn-primary mt-3">Login</button>
      </form>
    </div>
  );
};

export default Login;



// import React, { useState } from 'react'
// import { useDispatch } from 'react-redux'
// import { loginAccess } from '../redux/authSlice';
// import { useNavigate } from 'react-router-dom';

// function Login() {
//     const [username, setUserName] = useState("")
//     const [password, setPassword] = useState("second")

//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const handleLogin = () => {
//         if(
//             (username==="admin" && password === "admin123") || 
//             (username==="user" && password === "user123") ){
//             dispatch(loginAccess( {username}))
//             navigate("/dashboard")
//         } else{
//             alert("Invalid credentials")
//         }
//     }

//   return (
//     <>
//         <div className='container' >
//         <div class="form-group">
//                 <label for="exampleInputEmail1">Username</label>
//                 <input 
//                     type="text" 
//                     class="form-control" 
//                     id="exampleInputEmail1" 
//                     aria-describedby="emailHelp" 
//                     placeholder="Enter Username" 
//                     value={username}
//                     onChange={ (e) => setUserName(e.target.value)}/>
//             </div>
//             <div class="form-group">
//                 <label for="exampleInputPassword1">Password</label>
//                 <input 
//                     type="password" 
//                     class="form-control" 
//                     id="exampleInputPassword1" 
//                     placeholder="Password" 
//                     value={password}
//                     onChange={ (e) => setPassword(e.target.value)}
//                     />
//             </div>
//             <button type="submit" onClick={handleLogin} class="btn btn-primary">Login</button>
//         </div>
//     </>
//   )
// }

// export default Login