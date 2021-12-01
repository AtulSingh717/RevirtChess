import React from 'react'
import { Redirect } from 'react-router-dom'
import { ColorContext } from '../context/colorcontext' 
const socket  = require('../connection/socket').socket

/**
 * Onboard is where we create the game room.
 */

const roomID = "revirtChessGame"
  

class CreateNewGame extends React.Component {
    state = {
        didGetUserName: false,
        inputText: "",
        players : 0
        // gameId: ""
        
    }      

    constructor(props) {
        super(props);
        this.textArea = React.createRef();

    }

    
    componentDidMount(){
        // console.log(window.location.href.split('/')[4])
        socket.on('room-full', (p) => {
            console.log(p.length)
            this.setState({players : p.length })
        })

        // if(this.state.players < 2){
           
            this.props.setUserName(window.location.href.split('/')[4]) 
            this.setState({
                didGetUserName: true
            })
            this.send(window.location.href.split('/')[4])
        // }else{
            // alert("room is full")
        // }
        // socket.on('initial-connection', players => {
        //     console.log(players)
        // })
    }

    shouldComponentUpdate(nextProp, nextState){
            // console.log(nextState, this.state)
        if(nextState.players !== this.state.players){
            if(nextState.players < 2){
                this.props.didRedirect() 
                return true
            }else{
                alert('romm full')
                return false
            }
        }else{
            return false
        }
        // return true
    }

    send = (name) => {
        /**
         * This method should create a new room in the '/' namespace
         * with a unique identifier. 
         */
    //   const roomID = "revirtChessGame"
        
        // set the state of this component with the gameId so that we can
        // redirect the user to that URL later. 
        
        //  const playerID = socket.id
        // emit an event to the server to create a new room 
        if(this.state.players < 2){
            socket.emit('addPlayer', {roomID: roomID, userName: name})
        }
        
    }
    

    sendSpectator = () => {
        socket.emit('addSpectator', roomID)
    }

    typingUserName = () => {
        // grab the input text from the field from the DOM 
        const typedText = this.textArea.current.value
        
        // set the state with that text
        this.setState({
            inputText: typedText
        })
    }
    

    
    render() {
        // !!! TODO: edit this later once you have bought your own domain. 

        return (<>
            {
                this.state.didGetUserName ? 

                <Redirect to = {"/game/" + roomID}></Redirect>

            :
               <div>
                    <h1 style={{textAlign: "center", marginTop: String((window.innerHeight / 3)) + "px"}}>Your Username:</h1>

                    <input style={{marginLeft: String((window.innerWidth / 2) - 120) + "px", width: "240px", marginTop: "62px"}} 
                           ref = {this.textArea}
                           onInput = {this.typingUserName}></input>
                           
                    <button className="btn btn-primary" 
                        style = {{marginLeft: String((window.innerWidth / 2) - 60) + "px", width: "120px", marginTop: "62px"}} 
                        disabled = {!(this.state.inputText.length > 0)} 
                        onClick = {() => {
                            // When the 'Submit' button gets pressed from the username screen,
                            // We should send a request to the server to create a new room with
                            // the uuid we generate here.
                            // if(this.state.players < 2){
                            //     this.props.didRedirect() 
                            //     this.props.setUserName(this.state.inputText) 
                            //     this.setState({
                            //         didGetUserName: true
                            //     })
                            //     this.send()
                            // }else{
                            //     alert("room is full")
                            // }
                        }}>Play</button>

                        <button className="btn btn-secondary" 
                            style = {{marginLeft: String((window.innerWidth / 2) - 60) + "px", width: "120px", marginTop: "62px"}} 
                            disabled = {!(this.state.inputText.length > 0)} 
                            onClick = {() => {
                                this.props.setSpectator(true)
                                this.setState({
                                    didGetUserName: true
                                })
                                this.sendSpectator()
                        }}>Spectate</button>
                </div>
            }
            </>)
    }
}

const OnboardRevirt = (props) => {
    const color = React.useContext(ColorContext)

    return <CreateNewGame didRedirect = {color.playerDidRedirect} setUserName = {props.setUserName} setSpectator = {props.setSpectator}/>
}


export default OnboardRevirt