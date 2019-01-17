# Chatty

A dynamic instant messaging app built using ReactJS and WebSockets.  

## Final Product

!["Screenshot of application"](https://github.com/uabdul/chatty/blob/master/docs/chatty-app.png?raw=true)

Users can send messages and change usernames. Image URLs sent as messages are automatically displayed. The navigation bar shows the number of users that are currently connected (based on the total number of WebSocket connections).

## Using Chatty

In order to use Chatty, please follow these steps:

- Clone the repository onto your local machine by typing the following command in Terminal:

```
git clone git@github.com:uabdul/chatty.git chatty
```

- Install the dependencies for the application, and then start the application:

```
cd chatty
npm install
npm start
```

- In a separate Terminal window, install the dependencies for the WebSockets server and start the server:

```
cd chatty/chatty_server
npm install
npm start
```

- Navigate to `http://0.0.0.0:3000` in your browser.

### Dependencies

Chatty requires the following dependencies:
- React
- Webpack
- [babel-loader](https://github.com/babel/babel-loader)
- [webpack-dev-server](https://github.com/webpack/webpack-dev-server)

The Chatty WebSockets server requires the following dependencies:
- Express
- ws
- uuid
