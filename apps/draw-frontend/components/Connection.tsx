"use client"
import { useSocket } from '@/hooks/useSocket'
import React from 'react'
import Canvas from './Canvas';


function Connection({roomId}:{roomId:string}) {

    const socket=useSocket(roomId);
    if(!socket)return(
        <div>Connecting to Server</div>
    )
  return (
    
    <Canvas roomId={roomId} socket={socket}/>
  )
}

export default Connection