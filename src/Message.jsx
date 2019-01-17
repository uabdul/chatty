import React, {Component} from 'react';

//returns DOM element depending on whether message is a text message, image URL or notificataion
function Message(props)  {
  const message = props.message
  console.log('front end message', message)

  if (message.type === "incomingMessage") {

    const userColour = {
      color: message.colour,
    }

    return (
      <div className="message">
        <span className="message-username" style={userColour}>{message.username}</span>
        <span className="message-content">{message.content}</span>
      </div>
    );
  }

  if (message.type === "incomingImage") {

    const userColour = {
      color: message.colour,
    }

    return (
      <div className="message">
        <span className="message-username" style={userColour}>{message.username}</span>
        <span className="message-content"><img className="message-content message-image" src={message.content} /></span>
      </div>
    );
  }

  if (message.type === "incomingNotification") {
    return (
      <div className="notification">
        <span className="notification-content">{message.content}</span>
      </div>
    );
  }
}


export default Message;