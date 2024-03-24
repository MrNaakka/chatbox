let socket = io(); // connection between the client an the server. creates a socket.io client instance that can send and reciave mesage to and from the server.

let userId;
let interactiveBox = document.getElementById("interactiveBox");
let inputField;



interactiveBox.addEventListener('click', handleClick);

function getText() { // sama voidaan saada aikaa(mutta en osannut tätä): return inputField ? inputField.value : '';
    if (inputField) {
        return inputField.value;
    } else {
        return '';
    }
}

function handleClick() {
    interactiveBox.innerHTML = '<input type="text">';
    inputField = interactiveBox.querySelector("input");
    inputField.focus();

    inputField.addEventListener("keypress", handleKeyPress); // can detect when the user presser a key while typing in the input field.
}
function handleKeyPress(event) {
    if (event.key === "Enter") {
        handleSubmit();
        inputField.value = ""
    }
}
function handleSubmit() {
    let userInput = getText()
    console.log("hahah " + userInput)
    sendMessage(userInput);
}


function sendMessage(userInput) { //tämä funktio on responsible for sending messages from the client to the server.
    socket.emit("message", { userId: userId, message: userInput });
}
/*
emit() method provided by Socket.IO to send a message with a specific event name ('message') to the server.The message itself is passed as a parameter to the function.
*/


/*
This code listens for incoming "message" events from the server using Socket.IO's on method.
When a message is received from the server, it logs the message to the console.
This step is optional and depends on whether you expect the server to send messages back to the client.
*/



socket.on("message", message => {
    console.log("Message received from server: ", message.message);
    let dynamicMessageFromServer = document.getElementById("messageFromServer")
    dynamicMessageFromServer.innerHTML = "User " + userId + "says: " + message.message;
});

socket.on("userId", id => {
    userId = id;
});

