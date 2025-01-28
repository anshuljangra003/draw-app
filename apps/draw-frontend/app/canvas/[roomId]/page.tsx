"use client"
import initDraw from '@/utils/draw';
import React, { useEffect, useRef} from 'react'


function Canvas() {
    const canvasRef=useRef<HTMLCanvasElement>(null);
    
    useEffect(()=>{
        if(canvasRef.current){
            const canvas=canvasRef.current;
            initDraw(canvas)

         
        }
    },[])

  return (
    <canvas ref={canvasRef} className='bg-white' width={1000} height={1000}>page</canvas>
  )
}

export default Canvas