import axios from 'axios'
import React from 'react'
import { HTTP_URL } from '../config'
import ChatClient from './ChatClient';
async function getMessages(id:number){
    const res=await axios.get(`${HTTP_URL}/chat/${id}`);
    return res.data.chats
}
async function Chat({
  id 
}:{
  id:number
}) {

  const messages=await getMessages(id);
  // console.log(messages)
  return (
    <div>ChatRoom from 
      <ChatClient messages={messages} id={id}/>
    </div>
  )
}

export default Chat