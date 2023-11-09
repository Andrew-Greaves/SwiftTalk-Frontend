/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import avatar from '../assets/avatar.jpg'
import { formatDistanceToNow } from 'date-fns';
import { useSelector } from 'react-redux';
import axios from 'axios';

function ConversationList({ conversations, onSelectConversation }) {
    const username=useSelector((state)=>state.auth.username);
    const [userId,setUserId]=useState(null);
    useEffect(()=>{
        axios.get(`http://localhost:3001/getUser?userName=${username}`)
        .then(response => {
            setUserId(response.data._id);
        })
    })

    const formatTimeAgo = (date) => {
        return formatDistanceToNow(new Date(date), { addSuffix: true });
    };
    
    const formatParticipantNames = (participants, currentUserId) => {
        // Filter out the current user's name
        const otherParticipants = participants.filter(p => p._id !== currentUserId);

        if (!otherParticipants.length) {
            return 'No other participants';
        }

        // Get the first item from the other participants as there's only one other participant
        const otherParticipant = otherParticipants[0];
        return `${otherParticipant.firstName} ${otherParticipant.lastName}`;
    };

  return (
    <div className="list-group">
      {conversations.map((conversation) => {
        const participantNames = formatParticipantNames(conversation.participants, userId);
        const lastMessageText = conversation.lastMessage ? conversation.lastMessage.text : 'No messages yet';
        const lastMessageTime = conversation.lastMessage ? conversation.lastMessage.sentAt : '';
        
        return (
          <a 
            key={conversation._id} 
            href="#!" 
            className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
            onClick={(e) => {
                e.preventDefault();
                onSelectConversation(conversation);
            }}
          >
            {/* Assuming you'll handle the avatar logic elsewhere */}
            <img src={avatar} alt="User avatar" className="avatar rounded-circle me-3" style={{width:'40px'}}/>
            <div className="flex-grow-1">
              <h6 className="mb-0">{participantNames}</h6>
              <small className="text-muted">{lastMessageText}</small>
            </div>
            {lastMessageTime && (
              <small className="text-muted">{formatTimeAgo(lastMessageTime)}</small> // You'll need to define formatTimeAgo
            )}
          </a>
        );
      })}
    </div>
  );
}

ConversationList.propTypes = {
    conversations: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            avatar: PropTypes.string,
            name: PropTypes.string.isRequired,
            lastMessage: PropTypes.string.isRequired
        })
    ).isRequired,
    onSelectConversation: PropTypes.func.isRequired
};

export default ConversationList