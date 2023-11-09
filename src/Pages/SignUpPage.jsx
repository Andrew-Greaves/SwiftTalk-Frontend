/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignUpPage() {
    const navigate=useNavigate();
    const [firstName,setFirstName]=useState("");
    const [lastName,setLastName]=useState("");
    const [email,setEmail]=useState("");
    const [userName,setUserName]=useState("");
    const [password,setPassword]=useState("");
    const [confirmPassword,setConfirmPassword]=useState("");
    const handleSignIn = () =>{
        if(!firstName.trim() || !lastName.trim() || !email.trim() || !userName.trim() || !password.trim() || !confirmPassword.trim()){
            alert("Please fill out all fields.");
            return;
        }
        else if(password.trim().length<6 || password.trim().length>10){
            alert("Password must be between 6 and 10 characters.");
            return;
        }
        else if(password.trim() != confirmPassword.trim()){
            alert("Passwords do not match.");
            return;
        }
        // Prepare user object
        const user = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            userName: userName,
            password: password
        };

        // Send POST request to register endpoint
        axios.post('http://localhost:3001/register', user)
            .then(response => {
                console.log(response.data);
                navigate('/');  
            })
            .catch(error => {
                console.log("User could not be registered", error);
                alert("User could not be registered. Please try again.");
            });
            
    }
  return (
    <div>
         <header>
            <div className="container-fluid">
                <div className="row align-items-center">  {/* align-items-center vertically centers content */}
                    <div className="col">
                        <h1 style={{color:'black'}}>SwiftTalk</h1>
                    </div>
                    <div className="col text-end">
                        <h2 style={{color:"black"}}>Unleash Speed</h2>
                    </div>
                </div>
            </div>
        </header>
        <div className="m-3">
            <h2 className="mb-3">Sign Up</h2>
            <hr/>
            <div>
                <input placeholder='First Name' type="text" className="form-control-lg mb-3 mt-3" onChange={(event) => setFirstName(event.target.value)}></input>
            </div>
            <hr/>
            <div>
                <input placeholder='Last Name' type="text" className="form-control-lg mb-3 mt-3" onChange={(event) => setLastName(event.target.value)}></input>
            </div>
            <hr/>
            <div>
                <input placeholder='Email' type="email" className="form-control-lg mb-3 mt-3" onChange={(event) => setEmail(event.target.value)}></input>
            </div>
            <hr/>
            <div>
                <input placeholder='Username' className="form-control-lg mb-3 mt-3" onChange={(event) => setUserName(event.target.value)}></input>
            </div>
            <hr/>
            <div>
                <input placeholder='Password' type="password" className="form-control-lg mb-3 mt-3" onChange={(event) => setPassword(event.target.value)}></input>
                <span id="passwordHelpInline" className="form-text ms-2">
                    Must be 6-10 characters long.
                </span>
            </div>
            <hr/>
            <div>
                <input placeholder='Confirm Password' type="password" className="form-control-lg mb-3 mt-3" onChange={(event) => setConfirmPassword(event.target.value)}></input>
                <span id="passwordHelpInline" className="form-text ms-2">
                    Must match original password.
                </span>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center">
                <button type="button" className="btn btn-dark mt-4" style={{width:'400px'}} onClick={handleSignIn}>Login</button>
            </div>
            
        </div>
    </div>
  )
}

export default SignUpPage