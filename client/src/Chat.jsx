import React, { useEffect, useState } from "react"
import io from "socket.io-client"


function Name({name,socket}) {


  const [namee,setName] = useState()
  const [mesajlar,setmesajlar] = useState([])
  const [mesaj,setmesaj] = useState()
  const[users,setUsers] = useState([])
  const[id,setid] = useState()

  useEffect(()=>{
    setName(name)
    socket.emit("who",name)
  },[])

  

  useEffect(()=>{
    
    socket.on("aaa",(data)=>{
          setUsers(data)
    })
    
    socket.on("privatee",(item)=>{
      console.log(item)
      setmesajlar((prevValue)=>{
        return [...prevValue,item]
      })
    })
  },[])

  

  const change = (e)=>{
    setmesaj(e.target.value)
  }

  function funcc(e){
      e.preventDefault()
      socket.emit("mesaj",{mesaj:mesaj,id:id})
      setmesaj("")
  }

  return (
    <div>
      <h1>-{namee}-</h1>
      {mesajlar.map((item)=>{
        return <p>{item}</p>
      })}
      <form onSubmit={funcc}>
      <label>{id}</label>
        <input type="text" placeholder="mesaj" onChange={change} value={mesaj}/>
        <button type="submit" >Send</button>
      </form>
      {
      users.map((item)=>{
            return(
                  <div>
                        <a href="#" onClick={()=>{setid(item.id)}}>{item.name}</a>
                  </div>
            )
      })
      }

    </div>
  );
}



export default Name