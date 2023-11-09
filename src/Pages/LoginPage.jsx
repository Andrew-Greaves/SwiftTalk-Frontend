/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/background.jpg';
import axios from 'axios';
import { useDispatch } from "react-redux";
import { setUsername } from '../Redux/authSlice';

function LoginPage() {
    const navigate=useNavigate();
    const [userName,setUserName]=useState('');
    const [password,setPassword]=useState('');
    const dispatch=useDispatch();

    const handleLogin = () => {
        if (!userName.trim() || !password.trim()) {
            alert("Missing username or password");
            return;
        }
        dispatch(setUsername(userName));
        axios.get(`http://localhost:3001/getUser?userName=${userName}`)
        .then(response => {
            const data = response.data;
            if (data && data.password === password) {
                {console.log(userName)} 
                
                navigate("/home");
            } else {
                alert("Incorrect username or password.");
            }
        })
        .catch(error => {
            console.error('There was an error fetching the user', error);
            alert("Error logging in. Please try again.");
        });
    }
  return (
    <div style={{backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover', 
        backgroundRepeat: 'no-repeat', 
        backgroundPosition: 'center center', 
        height: '100vh', 
        width: '100vw'}}>
        <header>
            <div className="container-fluid">
                <div className="row align-items-center">  {/* align-items-center vertically centers content */}
                    <div className="col">
                        <h1 style={{color:'white'}}>SwiftTalk</h1>
                    </div>
                    <div className="col text-end">
                        <h2 style={{color:"white"}}>Unleash Speed</h2>
                    </div>
                </div>
            </div>
        </header>
       <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '60vh' }}>
            <h2 className="mb-4" style={{color:"white"}}>Login</h2>
            <div className="mb-4">
                <input placeholder='Username' onChange={(event) => setUserName(event.target.value)} className="form-control" style={{width:'300px'}}/>
            </div>
            <div className="mb-1">
                <input type="password" placeholder='Password' onChange={(event) => setPassword(event.target.value)} className="form-control" style={{width:'300px'}}/>
            </div>
            <div className="d-flex flex-column align-items-start" style={{width:'300px'}}>
                <Link to='/register' className="mb-4 mt-2">Sign Up</Link>
            </div>
            <button type="button" className="btn btn-light" style={{width:'200px'}} onClick={handleLogin}>Login</button>
        </div>
        
    </div>
  )
}

export default LoginPage