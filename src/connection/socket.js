import io from 'socket.io-client'

const URL = 'https://8549-14-99-81-78.ngrok.io'

const socket = io(URL)

var mySocketId
var spectatorSocketId
// register preliminary event listeners here:


socket.on("addPlayer", statusUpdate => {
    console.log("A new player has been added! Username: " + statusUpdate.userName + ", Game id: " + statusUpdate.gameId + " Socket id: " + statusUpdate.mySocketId)
    mySocketId = statusUpdate.mySocketId
})

socket.on("addSpectator", statusUpdate => {
    console.log("A new spectator has been added! Username: " + statusUpdate.userName + ", Game id: " + statusUpdate.gameId + " Socket id: " + statusUpdate.mySocketId)
    spectatorSocketId = statusUpdate.mySocketId
})

export {
    socket,
    mySocketId
}
