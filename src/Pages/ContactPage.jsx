/* eslint-disable no-unused-vars */
import React, { useState,useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import BottomTab from '../Components/BottomTab';
import chatbackground from '../assets/chatsbackground.jpg'
import ContactDetailsModal from '../Components/ContactDetailsModal';
import { useNavigate } from 'react-router-dom';


function ContactPage() {
    const username=useSelector((state) => state.auth.username);
    const [contacts,setContacts]=useState(null);
    const [selectedContact, setSelectedContact] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const navigate=useNavigate();

    const handleContactClick = (contact) => {
        setSelectedContact(contact);
        setModalVisible(true);
    };
    useEffect(() => {
        if (username) {  // only make the request if userName exists
            axios.get(`http://localhost:3001/getContacts?userName=${username}`)
                .then(response => {
                    setContacts(response.data);
                })
                .catch(error => {
                    console.log("Error retrieving user");
                });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

   const handleMessageButtonClick = (contactId) => {
    // API request to get the user information (assuming you need the user's ID)
    axios.get(`http://localhost:3001/getUser?userName=${username}`)
    .then(response => {
        const userId = response.data._id;
        
        // API request to create a new conversation
        return axios.post('http://localhost:3001/api/conversations/newConversation', {
            participantIds: [userId, contactId]
        });
    })
    .then(response => {
        // On success, redirect to /home
        navigate('/home');
    })
    .catch(error => {
        alert("You are not a contact of this user");
        // Here you could set some error state and show an error message to the user
    });
};
  return (
    <div style={{backgroundImage: `url(${chatbackground})`,
        backgroundSize: 'cover', 
        backgroundRepeat: 'no-repeat', 
        backgroundPosition: 'center center', 
        height: '100vh', 
        width: '100vw'}}>
        <div className="list-group">
            <div className="list-group">
                {contacts && contacts.map((contact, index) => (
                    <div key={index} className="list-group-item d-flex justify-content-between align-items-center">
                        {/* Contact display */}
                        <div className="d-flex align-items-center">
                            <div className="rounded-circle bg-secondary text-white d-flex justify-content-center align-items-center me-3" style={{ width: "40px", height: "40px" }}>
                                {contact.firstName[0]}{contact.lastName[0]}
                            </div>
                            <span>{`${contact.firstName} ${contact.lastName}`}</span>
                        </div>

                        {/* Message button aligned to the right */}
                        <button onClick={() => handleMessageButtonClick(contact._id)} className="btn btn-primary">
                            Message
                        </button>
                    </div>
                ))}
            </div>
        </div>

           {isModalVisible && 
                <ContactDetailsModal 
                    contact={selectedContact} 
                    isVisible={isModalVisible} 
                    onClose={() => setModalVisible(false)}
                />
            }
            <BottomTab />
    </div>
  )
}

export default ContactPage