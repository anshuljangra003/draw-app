"use client"
import { initDraw } from '@/utils/draw';
import {useRef,useEffect} from 'react'

function Canvas({roomId, socket}:{roomId:string, socket:WebSocket}) {
    const canvasRef=useRef<HTMLCanvasElement>(null);
    
    useEffect(()=>{
        if(canvasRef.current){
            
            initDraw(canvasRef.current,roomId,socket,"rect")

         
        }
    },[canvasRef,roomId,socket])

    function clearCanvas(){
        const canvas=canvasRef.current;
        if(!canvas)return; 
        const ctx=canvas.getContext("2d");
        if(!ctx)return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

  return (
    <div className='overflow-hidden'>
        <canvas ref={canvasRef} className='bg-blue-950' width={window.innerWidth} height={window.innerHeight}>page</canvas>
    <button onClick={clearCanvas} className='bg-white px-3 py-2 text-black'>Clear Canvas</button>
    </div>
  )
}

export default Canvas