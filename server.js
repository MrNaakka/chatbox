const express = require('express');
const http = require("http");
const socketIo = require("socket.io");


/*We create an Express application (app) and an HTTP server (server) using the createServer method from the http module.
The Express application will handle our HTTP requests, while the HTTP server will provide the infrastructure for communication.

We initialize Socket.IO by passing the server object to the socketIo function. This sets up Socket.IO to listen for WebSocket connections on the same server.

*/

const app = express();
const server = http.createServer(app)
const io = socketIo(server);

let messages = [];

/*
We set up a listener for the 'connection' event on the io object.
When a client connects to the server via WebSocket, this event is triggered, and a new socket object representing the connection is passed to the callback function.
Inside the connection handler:
We log a message indicating that a user has connected.
We set up event listeners for the 'message' and 'disconnect' events on the socket object.
When the client sends a 'message', we log the message received and broadcast it to all connected clients using io.emit('message', message).
When the client disconnects, we log a message indicating that a user has disconnected.
*/

io.on("connection", socket => {
    console.log("a user has connected");

    let userId = generateUsedID()



    socket.on("message", data => {

        messages.push({ userId: userId, message: data.message });

        console.log("message received from user " + userId + ":" + data.message);
        io.emit("message", { userId: userId, message: data.message });
        console.log(messages);
    });
    socket.on("disconnect", () => {
        console.log("user" + userId + " disconnected");
    });
});

function generateUsedID() {
    return Math.floor(Math.random() * 1000000);
}

app.use(express.static("public"));

const port = process.env.PORT ?? 3000;

server.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
