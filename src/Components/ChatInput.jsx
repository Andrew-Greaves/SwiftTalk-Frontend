/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

function ChatInput({ onSendMessage }) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <div style={{ display: 'flex', padding: '10px', backgroundColor: 'white', boxShadow: '0 -1px 5px rgba(0, 0, 0, 0.2)' }}>
      <input
        type="text"
        placeholder="Type a message..."
        style={{ flex: 1, marginRight: '10px', padding: '10px' }}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}

ChatInput.propTypes = {
  onSendMessage: PropTypes.func.isRequired, // This means onSendMessage must be a function and is required
};

export default ChatInput;