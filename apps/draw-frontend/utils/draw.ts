export default function initDraw(canvas:HTMLCanvasElement){
         const ctx = canvas.getContext("2d");
        if(!ctx)return
            let clicked=false;
            let startX=0;
            let startY=0;

         
            canvas.addEventListener("mousedown",(e)=>{
                clicked=true;

                startX=e.clientX;
                startY=e.clientY;
            })
            canvas.addEventListener("mouseup",(e)=>{
                clicked=false;
                console.log(e.clientX);
                console.log(e.clientY)
            })

            canvas.addEventListener("mousemove",(e)=>{
                if(clicked){
                    ctx.clearRect(0,0,canvas.width,canvas.height)
                    ctx.strokeRect(startX,startY,e.clientX-startX,e.clientY-startY)
                  
                }
            })
}

