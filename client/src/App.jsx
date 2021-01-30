import React, { useEffect, useState } from "react"
import io from "socket.io-client"
import 'bootstrap/dist/css/bootstrap.min.css';
import "./deneme.css"

let socket;

function App() {

  const ENDPOINT = "localhost:4000"

  const [mesajlar,setmesajlar] = useState([])
  const [mesaj,setmesaj] = useState()

  useEffect(()=>{

  socket = io(ENDPOINT)

  socket.on("sa",(item)=>{
    setmesajlar((prevValue)=>{
      return [...prevValue,item]
    })
  })

  },[])

  const funcc = (e)=>{
    e.preventDefault()
    socket.emit("sa",mesaj)
    setmesaj("")
  }

  const change = (e)=>{
    setmesaj(e.target.value)
  }

  return (
    <div>
      {mesajlar.map((item)=>{
        return <p>{item}</p>
      })}
      <form onSubmit={funcc}>
        <input type="text" placeholder="mesaj" onChange={change} value={mesaj}/>
        <button type="submit" >Send</button>
      </form>

    </div>
  );
}

export default App;
