import { useEffect, useState } from "react";
import { WS_URL } from "../config";

export function useSocket(){
    const [loading, setloading] = useState(true)
    const [socket, setSocket] = useState<WebSocket>();
    useEffect(()=>{
        const ws=new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxYmJiNDBkYy0wYjhmLTQ2MWMtOGJhOS1mYTdmZTJmNGUzZjAiLCJpYXQiOjE3Mzc4ODE2ODR9.gM_-ANhwAZXsOw6lL0LpCG1ZkMY0TJhloQ-CDIsVsYA`);
        ws.onopen=()=>{
            setloading(false);
            setSocket(ws);
        }
    },[])

    return {loading,socket}

}