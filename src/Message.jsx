import React, {Component} from 'react';

function Message(props)  {
  const message = props.message
  console.log(message)
  return (
    <div className="message">
      <span className="message-username">{message.username}</span>
      <span className="message-content">{message.content}</span>
    </div>
  );
}


export default Message;