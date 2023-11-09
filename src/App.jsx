/* eslint-disable no-unused-vars */
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import SignUpPage from './Pages/SignUpPage';
import NotFound from './Pages/NotFound';
import ProfilePage from './Pages/ProfilePage';
import ContactPage from './Pages/ContactPage';
import SettingsPage from './Pages/SettingsPage';
import { Provider } from "react-redux";
import { store } from './Redux/store';

function App() {
  return (
    <div>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route exact path="/" element={<LoginPage/>} />
            <Route path="/register" element={<SignUpPage/>} />
            <Route path="/home" element={<HomePage/>} />
            <Route path="/contacts" element={<ContactPage/>} />
            <Route path="/profile" element={<ProfilePage/>} />
            <Route path="/settings" element={<SettingsPage/>} />
            <Route path="*" element={<NotFound/>} /> {/* This is a catch-all for 404s */}
          </Routes>
        </Router>
      </Provider>
    </div>
    
  )
}

export default App
