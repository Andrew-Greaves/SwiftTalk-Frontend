/* eslint-disable no-unused-vars */
import React, { useState,useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios';
import chatbackground from '../assets/chatsbackground.jpg'
import image from '../assets/swifticon.png'
import BottomTab from '../Components/BottomTab';

function ProfilePage() {
    const userName=useSelector((state) => state.auth.username);
    const [userData,setUserData] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    useEffect(() => {
        if (userName) {  // only make the request if userName exists
            axios.get(`http://localhost:3001/getUser?userName=${userName}`)
                .then(response => {
                    setUserData(response.data);
                })
                .catch(error => {
                    console.log("Error retrieving user");
                });
        }
    }, [userName]);
  return (
    <div style={{backgroundImage: `url(${chatbackground})`,
        backgroundSize: 'cover', 
        backgroundRepeat: 'no-repeat', 
        backgroundPosition: 'center center', 
        height: '100vh', 
        width: '100vw'}}>
        
        <header style={{ textAlign: 'center',marginBottom:'30px' }}>
            <img src={image} style={{width:'100px', height:'100px',marginBottom:"30px"}} />
        </header>
        <div className="ms-3">
            <div className="ms-3">
                <h2 style={{ borderBottom: '2px solid #ddd', paddingBottom: '10px', marginBottom: '20px' }}>Profile</h2>
                <div style={{ marginBottom: '10px' }}>
                    <strong>Full Name:</strong> <span>{userData && userData.firstName} {userData && userData.lastName}</span>
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <strong>Email:</strong> <span>{userData && userData.email}</span>
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <strong>Username:</strong> <span>{userData && userData.userName}</span>
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <strong style={{marginRight:"10px"}}>Password:</strong>
                    <span onClick={() => setShowPassword(!showPassword)} >
                        {showPassword ? userData && userData.password : '••••••••'}
                    </span>
                    {/* Add a hint for users */}
                    <small onClick={() => setShowPassword(!showPassword)} style={{ marginLeft: '10px', color: 'gray' }}>(Click to {showPassword ? 'hide' : 'reveal'})</small>
                </div>
            </div>
        </div>
        <BottomTab/>
        
    </div>
  )
}

export default ProfilePage