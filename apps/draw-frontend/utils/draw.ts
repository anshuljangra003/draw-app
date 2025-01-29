import { HTTP_URL } from "@/config";
import axios from "axios";

type Shape = {
    type: string;
    x: number;
    y: number;
    width: number;
    height: number;
};

export async function initDraw(canvas: HTMLCanvasElement, roomId:string, socket:WebSocket) {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let clicked = false;
    let startX = 0;
    let startY = 0;
    const ExistingShapes: Shape[] = await getExistingShapes(roomId) ;
    console.log(ExistingShapes)

    socket.onmessage=(event)=>{
        const parsedMessage=JSON.parse(event.data);
        if(parsedMessage.type==="chat"){
            
            ExistingShapes.push(JSON.parse(parsedMessage.message));
            clearCanvasandRender(ctx, canvas, ExistingShapes);

        }

    }



    canvas.addEventListener("mousedown", (e) => {
        const rect = canvas.getBoundingClientRect();
        startX = e.clientX - rect.left;
        startY = e.clientY - rect.top;
        clicked = true;
    });

    canvas.addEventListener("mouseup", (e) => {
      
            const rect = canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            const width = mouseX - startX;
            const height = mouseY - startY;
            const shape:Shape={
                type: "rect",
                x: startX,
                y: startY,
                width,
                height,
            }
            ExistingShapes.push(shape);

            socket.send(JSON.stringify({
                "type":"chat",
                "roomId":parseInt(roomId),
                "message":JSON.stringify(shape)
            }))

            clicked = false;
        
    });

    canvas.addEventListener("mousemove", (e) => {
        if (clicked) {
            const rect = canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            clearCanvasandRender(ctx, canvas, ExistingShapes);
            ctx.strokeStyle = "rgba(255, 255, 255)";
            ctx.strokeRect(startX, startY, mouseX - startX, mouseY - startY);
        }
    });
}

function clearCanvasandRender(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, ExistingShapes: Shape[]) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ExistingShapes.forEach((shape) => {
        if (shape.type === "rect") {
            ctx.strokeStyle = "rgba(255, 255, 255)";
            ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
        }
    });
}

async function getExistingShapes(roomId:string){
    const res=await axios.get(`${HTTP_URL}/chat/${roomId}`);
    // console.log(res)
    const chats= res.data.chats;
    

   const shapes=chats.map((x:{message:string})=>{
        const messageData=JSON.parse(x.message);
        return messageData;
    })
    

    return shapes;

}