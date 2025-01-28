import { WebSocket, WebSocketServer } from 'ws';
import jwt, { JwtPayload } from "jsonwebtoken"
import { JWT_SECRET } from '@repo/backend-common/config';
import { prismaClient } from '@repo/db/client';

const wss = new WebSocketServer({ port: 8080 });
interface User{
   userId:string,
   rooms:string[],
   ws:WebSocket
}

const users:User[]=[];

function isAuth(token:string):string|null {

   try {
      const decodedData=jwt.verify(token,JWT_SECRET);

      if(typeof decodedData==="string"){
         return null
      }
      if(!decodedData || !(decodedData as JwtPayload).userId){
     
         return null;
      }
   
   
      return decodedData.userId
   } catch (error) {
      return null
   }


}

wss.on('connection', function connection(ws,request) {

 const url=request.url;
 if(!url)return ;
 const queryParams=new URLSearchParams(url.split('?')[1]);
 const token=queryParams.get('token')??"";

 const userId=isAuth(token);
 if(!userId){
   ws.close();
   return;
 }


 users.push({
   userId,
   rooms:[],
   ws
 })




  ws.on('message', async function message(data) {
      const parsedData=JSON.parse(data.toString());

      if(parsedData.type==="join-room"){
         const user=users.find(x=>x.ws===ws);
         user?.rooms.push(parsedData.roomId)
      }

      if(parsedData.type==="leave-room"){
         // users.filterTODO
         const user=users.find(x=>x.ws===ws);
         if(!user)return;
         user.rooms=user.rooms.filter(x=>x===parsedData.room);
      }

      if(parsedData.type==="chat"){
         const roomId=parsedData.roomId;
         const message=parsedData.message;

         await prismaClient.chat.create({
            data:{
               userId,
               message,
               roomId
            }
         })
         users.forEach(user => {
            if (user.rooms.includes(roomId) && user.ws !== ws) {
                user.ws.send(JSON.stringify({
                    type: "chat",
                    message,
                    roomId
                }), err => {
                    if (err) {
                        console.error("Error sending message:", err);
                    }
                });
            }
        });
      }
  });


});