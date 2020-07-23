import React from 'react'

export const Display = ({ messages }) => {
  return (
    <div className="chat-display">
      {messages.map((msg, i) => <span key={i} className="chat-message">{msg}</span>)}
    </div>
  )
}

export default Display;
