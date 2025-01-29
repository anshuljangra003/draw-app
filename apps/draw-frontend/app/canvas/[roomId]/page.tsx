// import Canvas from "@/components/Canvas";
import Connection from "@/components/Connection";
async function CanvasPage({params}:{
    params:{
        roomId:string
    }
}) {

    const roomId=(await params).roomId;
    
    return (
        <Connection roomId={roomId}/>
    )

}

export default CanvasPage