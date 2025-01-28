"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";


export default function Home() {
  const [slug, setSlug] = useState("")
  const router=useRouter();
  return (
    <div style={{
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      height:"100vh",
      width:"100vw"
    }}>
          <input style={{
            padding:10
          }} value={slug} onChange={(e)=>{
            setSlug(e.target.value)
          }} type="text" placeholder="Room name"></input>
          <button style={{
            padding:10
          }} onClick={()=>{
            router.push(`/room/${slug}`)
          }
          }>Send</button>
    </div>
  );
}
