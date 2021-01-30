import React, { useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import "./deneme.css"
import {Form,Button} from "react-bootstrap"
import io from "socket.io-client"

import Chat from "./Chat"

const ENDPOINT = "localhost:4000"
const socket = io(ENDPOINT)

function App() {

  

  const [nameee,setNameee] = useState("")
  const [CheckMain,setCheckMain] = useState(true)

  const handleName = (e)=>{
        setNameee(e.target.value)    
  }

  const senddata = (e)=>{
        e.preventDefault()
        socket.emit("join",nameee)
  }

  socket.on("join",(data)=>{
    if(data){
      setCheckMain(false)
      setNameee("")
    }
    else{
      alert("İsim daha önce alindi")
    }
  })

  const main = ()=>(
    <div className="bg-name">
      <div className="name">
        <Form onSubmit={senddata} className="p-5">
          <Form.Group controlId="formBasicEmail">
          <Form.Control onChange={handleName} type="text" placeholder="Enter your name" autoComplete="off" value={nameee} />
          </Form.Group>
          <Button style={{margin:"0 auto",display:"block"}} variant="primary" type="submit">
          Submit
          </Button>
        </Form>
      </div>
    </div>
  )

  return (
    <div>
      {CheckMain ? main():<Chat name={nameee} socket={socket}/>}
    </div>
  );
}

export default App;
