/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react'
import image from '../assets/swifticon.png'
import chatbackground from '../assets/chatsbackground.jpg'
import ConversationList from '../Components/ConversationList';
import avatar from '../assets/avatar.jpg'
import BottomTab from '../Components/BottomTab';
import AddUserModal from '../Components/AddUserModal';
import axios from 'axios';
import { useSelector } from 'react-redux';
import ChatInput from '../Components/ChatInput';
import io from 'socket.io-client';

function HomePage() {
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [userId,setUserId] = useState(null);
    const [messages, setMessages] = useState([]);
    const username=useSelector((state) => state.auth.username);
    const [conversations,setConversations]=useState([]);
    // Use ref to store the current userId
    const userIdRef = useRef(userId);

    // Establish connection to the Socket.IO server
    const socket = io('http://localhost:3001');

    useEffect(() => {
        // When the user selects a conversation
        if (selectedConversation) {
            socket.emit('joinRoom', selectedConversation._id);

            // Listen for new messages in this conversation
            socket.on('messageReceived', (newMessage) => {
                setMessages((prevMessages) => [...prevMessages, newMessage]);
            });
        }

        // Cleanup on unmount or when selectedConversation changes
        return () => {
            socket.emit('leaveRoom', selectedConversation?._id);
            socket.off('messageReceived');
        };
    }, [selectedConversation]);

    const handleSelectConversation = (conversation) => {
        setSelectedConversation(conversation);
        // Reset messages when conversation changes
        setMessages([]);
    };

    useEffect(() => {
    if (selectedConversation) {
      // Fetch messages for the selected conversation
      axios.get(`http://localhost:3001/api/conversations/${selectedConversation._id}/getMessages`)
        .then(response => {
          setMessages(response.data);
        })
        .catch(error => {
          console.error("Error fetching messages:", error);
        });
    }
    }, [selectedConversation]);

    const handleSendMessage = (message) => {
        if (selectedConversation && userId) {
            // Implement sending message to the server
            axios.post(`http://localhost:3001/api/conversations/${selectedConversation._id}/messages`, {
                body: message,
                author: userId
            })
            .then(() => {
                // Message sent successfully, now fetch the messages again
                fetchMessages();
            })
            .catch(error => {
                console.error("Error sending message:", error);
            });
        }
    };

    const fetchMessages = () => {
        if (selectedConversation) {
            axios.get(`http://localhost:3001/api/conversations/${selectedConversation._id}/getMessages`)
                .then(response => {
                    setMessages(response.data);
                })
                .catch(error => {
                    console.error("Error fetching messages:", error);
                });
        }
    };

    useEffect(() => {
    if (username) {
        axios.get(`http://localhost:3001/getUser?userName=${username}`)
        .then(response => {
            setUserId(response.data._id);
        })
        .catch(error => {
            console.error("Error fetching user id:", error);
        });
    }
    }, [username]);  // Depend on username to refetch when it changes

    useEffect(() => {
        if (userId) {
            // API request to fetch conversations for the user
            axios.get(`http://localhost:3001/api/conversations/byUser/${userId}`)
            .then(response => {
                // Store the conversations in state
                setConversations(response.data);
            })
            .catch(error => {
                console.error("Error fetching conversations:", error);
            });
        }
    }, [userId]);
    
    useEffect(() => {
  const intervalId = setInterval(() => {
    axios.get(`http://localhost:3001/api/conversations/byUser/${userId}`)
      .then(response => {
        // Store the conversations in state
        setConversations(response.data);
      })
      .catch(error => {
        console.error("Error fetching conversations:", error);
      });
  }, 3000); // Runs every 3000 milliseconds (3 seconds)

  // Clear the interval when the component unmounts or userId changes
  return () => clearInterval(intervalId);
}, [userId]);

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(() => {
        scrollToBottom();
    }, [messages]); 

    
    
    // Update ref whenever the userId changes
    useEffect(() => {
        userIdRef.current = userId;
    }, [userId]);
    
  return (
    <div style={{backgroundImage: `url(${chatbackground})`,
        backgroundSize: 'cover', 
        backgroundRepeat: 'no-repeat', 
        backgroundPosition: 'center center', 
        height: '100vh', 
        width: '100vw'}}>
        <header style={{ textAlign: 'center',marginBottom:'30px' }}>
            <img src={image} style={{width:'100px', height:'100px',marginBottom:"30px"}} />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
                <input type="text" placeholder="Search..." style={{ width: '60%', padding: '10px' }} />
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" >
                        Chat
                    </button>
                    <ul className="dropdown-menu" data-bs-theme="dark">
                        <li><a className="dropdown-item" href="#">Start New Chat</a></li>
                        <li><hr className="dropdown-divider"/></li>
                        <li><a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#addUserModal">Add User</a></li>
                    </ul>
                </div>
            </div>
        </header>
        <div className="container-fluid">
            <div className="row">
                {/* Left side - List of Conversations */}
                <div className="col-4">
                    <h3>Chats</h3>
                    <div style={{ overflowY: 'scroll', height: '90%' }}>
                        <ConversationList
                            conversations={conversations}
                            onSelectConversation={handleSelectConversation}
                        />
                    </div>
                </div>
                
                {/* Right side - Selected Conversation Display */}
                <div className="col-8">
                    {/* Chat messages display area */}
                    <div style={{ background: 'rgba(255,255,255,0.7)', height: 'calc(100vh - 200px - 50px - 60px)', overflowY: 'scroll',paddingBottom: '60px' }}>
                        {selectedConversation && messages.map((message) => (
                            <div key={message?._id} className={`d-flex my-2 ${message.author?._id === userIdRef.current ? 'justify-content-end' : 'justify-content-start'}`}>
                                <div className={`rounded px-3 py-2 ${message.author?._id === userId ? 'bg-success text-white me-4' : 'bg-secondary ms-4'}`}>
                                    <p className="mb-0">{message?.body}</p>
                                    <small className="text-muted">{new Date(message?.createdAt).toLocaleTimeString()}</small>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    {/* ChatInput area */}
                    {selectedConversation && (
                        <div className="chat-input-area" style={{
                            position: 'fixed',
                            bottom: '60px', // Height of BottomTab
                            backgroundColor: '#fff',
                            padding: '10px',
                            borderTop: '1px solid #ccc',
                            width:'60%'
                        }}>
                            <ChatInput onSendMessage={handleSendMessage} />
                        </div>
                    )}
                </div>
            </div>
        </div>
        <AddUserModal />
        <BottomTab/>
    </div>
  )
}

export default HomePage