class Carretera{
    constructor(x,width, carriles=3){
        this.x=x;
        this.width=width;
        this.carriles=carriles;

        this.left=x-width/2;
        this.right=x+width/2;
        
        //Carretera "infinita" (la y se lee en negativo, va hacia abajo)
        const infinity=1000000;
        this.top=-infinity;
        this.bottom=infinity;

        /*Utilizamos arrays para los bordes de la carretera
        lo segmentamos en otros arrays para poder modificar la carretera
        añadir curvas, rotondas, etc, que haremos más tarde*/

        //En JS, {curly braces } definen OBJETOS
        const topLeft={x:this.left,y:this.top};
        const topRight={x:this.right,y:this.top};
        const bottomLeft={x:this.left,y:this.bottom};
        const bottomRight={x:this.right,y:this.bottom};
        this.borders=[
            [topLeft,bottomLeft],
            [topRight,bottomRight]
        ];
    }

    /*Éste método calcula el carril en el que aparece el coche
    Si el n de carril > n de carriles totales (this.carriles) escoge el
    que esté más a la der*/
    getLaneCenter(carrilIndex){
        const laneWidth=this.width/this.carriles;
        return this.left+laneWidth/2+
        Math.min(carrilIndex,this.carriles-1)*laneWidth;
        
    }
    //Método para dibujar la carretera
    draw(ctx){
        ctx.lineWidth=5;
        ctx.strokeStyle="white";
        //Carriles. lerp = interpolacion lineal (2)
        
        for(let i=1; i<=this.carriles-1; i++){
            const x=lerp(
                this.left,
                this.right,
                i/this.carriles
            );
        
    //Llamas al método para empezar la carretera
            ctx.setLineDash([20,20]);
            ctx.beginPath();
            ctx.moveTo(x,this.top);
            ctx.lineTo(x,this.bottom);
            ctx.stroke();      
        }   
        //Pedimos que dibuje el borders desde los puntos 0 en x e y hasta 1:
        ctx.setLineDash([]);
        this.borders.forEach(border=>{
            ctx.beginPath();
            ctx.moveTo(border[0].x,border[0].y);
            ctx.lineTo(border[1].x,border[1].y);
            ctx.stroke();
        });
    }
} 
