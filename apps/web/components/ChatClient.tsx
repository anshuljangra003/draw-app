"use client"
import React, { useEffect, useState } from 'react'
import { useSocket } from '../hooks/useSocket'


function ChatClient({messages, id}:{
    messages:{message:string}[],
    id:number
}) {
    const [text,setText]=useState("")
    const [chats, setChats]=useState(messages);
    const {loading,socket}=useSocket();
    useEffect(()=>{
        if(socket && !loading){

            socket.send(JSON.stringify({
                type:"join-room",
                roomId:id,
            }))

            socket.onmessage=(ev)=>{
                const parsedData=JSON.parse(ev.data);
                console.log(parsedData)
                if(parsedData.type==="chat"){
                    setChats(c=>[...c,parsedData.message])
                    socket.send(parsedData.message)
                }
            }
        }
        
    },[loading,socket,id])
   
  return (
    <div>
        {chats.map(m=><div >{m.message}</div>)}
        <input style={{
            padding:10
        }} type='text' placeholder='Enter Message Here' value={text} onChange={(e)=>{
            setText(e.target.value)
        }}></input>
        <button onClick={()=>{
            socket?.send(JSON.stringify({
                type:"chat",
                message:text,
                roomId:id
            }))
            setText("")
        }} style={{
            padding:10
        }}>Send Message</button>
    </div>
  )
}

export default ChatClient