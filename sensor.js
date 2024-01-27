//El sensor utiliza el coche para orientarlo
class Sensor{
    constructor(coche){
        this.coche=coche;
        this.rayCount=5;
        this.rayLength=150;
        this.raySpread=Math.PI/2; // Es igual a 45º
        
        this.rays=[];
        this.lecturas=[]; //Si hay borde de carretera se añade a este array
    }

//Explicación en punto (3) de notas.txt 
    update(roadBorders){
        this.#lanzarRays();
        this.lecturas=[];
        for(let i=0;i<this.rays.length;i++){
            this.lecturas.push(
                this.#getLectura(this.rays[i],roadBorders)
            );
        }
    }

    #getLectura(ray, roadBorders){
        let toques=[];

        for(let i=0;i<roadBorders.length;i++){
            const toque=getIntersection(
                ray[0],
                ray[1],
                roadBorders[i][0],
                roadBorders[i][1]
            );
            if(toque){
                toques.push(toque);
            }
        }

        if(toques.length==0){
            return null;
        }else{
            const offsets=toques.map(e=>e.offset);
            const minOffset=Math.min(...offsets);
            return toques.find(e=>e.offset==minOffset);
        }
    }


    /*Los rayos empiezan en el coche y acaban en la posición que resulte
            de multiplicar el seno/coseno (x/y) por la longitud del rayo, restadp
            a la posición del coche*/
    #lanzarRays(){
        this.rays=[];
        for(let i=0;i<this.rayCount;i++){
            const rayAngle=lerp(
                this.raySpread/2,
                -this.raySpread/2,
                this.rayCount==1?0.5:i/(this.rayCount-1) //Si solo hay un rayo lo coloca en el medio
            )+this.coche.angle;

            const start ={x:this.coche.x, y:this.coche.y};
            const end = {
                x:this.coche.x-
                    Math.sin(rayAngle)*this.rayLength,
                y:this.coche.y-
                    Math.cos(rayAngle)*this.rayLength
             };
             this.rays.push([start,end]);
        
            }
        }

        /*Asignamos unas variables a las posiciones de  fin
        del array, que representan las posiciones X e Y*/
        //Si hay una lectura, el final del rayo será el valor de esa lectura
    draw(ctx){ 
        for(let i=0;i<this.rayCount;i++){
        let end=this.rays[i][1];
        if(this.lecturas[i]){
            end=this.lecturas[i];
        }
            ctx.beginPath();
            ctx.lineWidth=2;
            ctx.strokeStyle="lightgreen";
            ctx.moveTo(
                this.rays[i][0].x,
                this.rays[i][0].y
            );
            ctx.lineTo(
                end.x,
                end.y
            );
            ctx.stroke();

            //Copia de lo anterior: el color del rayo cambia a negro a partir
            //de la lectura del contacto end
            ctx.beginPath();
            ctx.lineWidth=2;
            ctx.strokeStyle="red";
            ctx.moveTo(
                this.rays[i][1].x,
                this.rays[i][1].y
            );
            ctx.lineTo(
                end.x,
                end.y
            );
            ctx.stroke();
        } 
    }           
}

