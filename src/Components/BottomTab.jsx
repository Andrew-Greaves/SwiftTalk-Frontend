/* eslint-disable no-unused-vars */
import React from 'react'
import { Link,useLocation } from 'react-router-dom'

function BottomTab() {
    const location=useLocation();

     const isActive = (path) => {
        return location.pathname === path;
    }

    const linkStyle = (path) => {
        return isActive(path) ? { backgroundColor: 'orange',color:"white" } : { color: 'white' };
    }
  return (
    <div className="fixed-bottom" style={{height:'50px',paddingLeft:'20px',paddingRight:'20px'}}> 
            <ul className="nav nav-pills nav-fill bg-dark" style={{borderRadius:"10px 10px 10px 10px"}}> 
                <li className="nav-item" >
                    <Link to="/home" className="nav-link" style={linkStyle("/home")}>Chats</Link>
                </li>
                <li className="nav-item" >
                    <Link to="/contacts" className="nav-link" style={linkStyle("/contacts")}>Contacts</Link>
                </li>
                <li className="nav-item" >
                    <Link to="/profile" className="nav-link" style={linkStyle("/profile")}>Profile</Link>
                </li>
                <li className="nav-item" >
                    <Link to="/settings" className="nav-link" style={linkStyle("/settings")}>Settings</Link>
                </li>
            </ul>
        </div>
  )
}

export default BottomTab