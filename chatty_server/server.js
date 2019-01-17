const express = require('express');
const WebSocket = require('ws')
const SocketServer = WebSocket.Server;
const uuid = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if(client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  })
}

function updateUsers(users) {
  const outputUsers = {
    type: "incomingUserUpdate",
    content: users
  }
  wss.broadcast(JSON.stringify(outputUsers))
}

function setColour(user) {
  const colourOptions = ['#0099ff', '#00cc00', '#ff00ff', '#663300'];
  const userColour = {
    type: "userColour",
    colour: colourOptions[Math.floor(Math.random() * 4)]
  };
  user.send(JSON.stringify(userColour))
}

wss.on('connection', (ws) => {
  console.log('Client connected');
  updateUsers(wss.clients.size);
  setColour(ws);

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    updateUsers(wss.clients.size)
  });

  ws.on('message', data => {
    const objData = JSON.parse(data);
    const id = uuid()
    switch(objData.type) {
      case "postMessage":
        const outputMessage = {
          type: "incomingMessage",
          id,
          username: objData.username,
          colour: objData.colour,
          content: objData.content
        }
        wss.broadcast(JSON.stringify(outputMessage))
        break;
      case "postNotification":
        const outputNotification = {
          type: "incomingNotification",
          id,
          username: objData.username,
          content: objData.content
        }
        wss.broadcast(JSON.stringify(outputNotification))
        break;
      case "postImage":
        const outputImage = {
          type: "incomingImage",
          id,
          colour: objData.colour,
          username: objData.username,
          content: objData.content
        }
        wss.broadcast(JSON.stringify(outputImage))
        break;
      default:
        throw new Error("Unknown event type " + data.type)
    }
  })
});