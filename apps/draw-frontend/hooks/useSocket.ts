import { WS_URL } from "@/config";
import { useState,useEffect } from "react";


export function useSocket(roomId:string){

    const [socket, setSocket] = useState<WebSocket|null>(null)

    useEffect(()=>{

        const ws=new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzMTk5YmUwOS04NGVkLTRiZjQtYmZkOS01ODZhZWUzNjEyMzkiLCJpYXQiOjE3MzgxMzI4MzR9.MBvbAh386JCBbuFxcGR1TfpeCYobt2MOTbim-zi2I3o`);

        ws.onopen=()=>{
            setSocket(ws);
            const message=JSON.stringify({
                type:"join-room",
                roomId:parseInt(roomId)
            });
            ws.send(message)
        }
       



    },[])


    return socket

}