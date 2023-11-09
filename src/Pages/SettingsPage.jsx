/* eslint-disable no-unused-vars */
import React from 'react'
import { useNavigate } from 'react-router-dom';
import chatbackground from '../assets/chatsbackground.jpg'

function SettingsPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/'); // Redirect to the home page
  }

  return (
    <div style={{
      backgroundImage: `url(${chatbackground})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between', // This will push the logout button to the bottom
    }}>
      <h1 style={{ textAlign: 'center', paddingTop: '20px' }}>Settings</h1>
      <div className="d-flex justify-content-center align-items-center" style={{ flex: 1 }}>
        <button className="btn btn-primary" onClick={handleLogout} style={{width:'200px'}}>Log Out</button>
      </div>
      <div style={{ height: '50px' }}> {/* This div is used to offset the space taken by the header */}</div>
    </div>
  );
}

export default SettingsPage