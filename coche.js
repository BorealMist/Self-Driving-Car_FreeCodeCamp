class Coche{
    constructor(x,y,width,height){
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;

        this.speed=0;
        this.acceleration=0.2;
        this.maxSpeed=3;
        this.friction=0.05;
        this.angle=0;
        this.damaged=false;

        this.sensor=new Sensor(this); //"this" pasa objeto coche como argumento
        this.controles=new Controles();
    }
    //Control del coche

    update(roadBorders){
        if(!this.damaged){
            this.#movimiento();
            this.poligono=this.#crearPoligono();
            this.damaged=this.#comprobarDamaged(roadBorders);
        }
        this.sensor.update(roadBorders);
    }

     /*EL PROBLEMA!!!!!!!!!!!!!!!!!!!!!!!!!!!
            en carreteraBorder el tío pone una sola dimensión de array pero no funciona
            con dos si funciona: carreteraBorder[i][i]
            27/01
            No tiene sentido eso. Las funciones encargadas de detectar choques siguen sin
            funcionar */

    #comprobarDamaged(roadBorders){
        for(let i=0;i<roadBorders.length;i++){
            if(poligonoIntersecta(this.poligono,roadBorders[i][0])){
                return true;
            }
        }
        return false;
    }
        
    
    //Explicación (6)
    #crearPoligono(){
        const puntos=[];
        const radio=Math.hypot(this.width,this.height)/2;
        const anguloAlfa=Math.atan2(this.width,this.height);

        //Trigonometría para calcular los puntos X e Y con angulo y radio
        //Punto superior izquierda, inf izq, sup der e inf izq - respectivamente
        puntos.push({
            x:this.x-Math.sin(this.angle-anguloAlfa)*radio,
            y:this.y-Math.cos(this.angle-anguloAlfa)*radio
        });
        puntos.push({
            x:this.x-Math.sin(this.angle+anguloAlfa)*radio,
            y:this.y-Math.cos(this.angle+anguloAlfa)*radio
        });
        puntos.push({
            x:this.x-Math.sin(Math.PI+this.angle-anguloAlfa)*radio,
            y:this.y-Math.cos(Math.PI+this.angle-anguloAlfa)*radio
        });
        puntos.push({
            x:this.x-Math.sin(Math.PI+this.angle+anguloAlfa)*radio,
            y:this.y-Math.cos(Math.PI+this.angle+anguloAlfa)*radio
        });

        return puntos;
    }

    //Método que describe cómo se mueve el vehículo
    #movimiento(){
        if(this.controles.fwd){
            this.speed+=this.acceleration;
        }
        if(this.controles.back){
            this.speed-=this.acceleration;
        }
        if(this.speed>this.maxSpeed){
            this.speed=this.maxSpeed;
        }

        //velocidad máxima marcha atrás es mitad
        //Velocidad "negativa" sólo indica que es marcha atrás
        if(this.speed<-this.maxSpeed/2){
            this.speed=-this.maxSpeed/2;
        }

        //Fricción relacionada con la velocidad
        if(this.speed>0){
            this.speed-=this.friction;
        }
        if(this.speed<0){
            this.speed+=this.friction;
        }
        //Para evitar que se mueva sin tocar nada, si el valor absoluto de velocidad
        //es menor a la fricción, igualamos velocidad a 0.
        if(Math.abs(this.speed)<this.friction){
            this.speed=0;
        }

        /*Controles para evitar que el coche gire en el sitio e invertir controles para hacerlo realista
        Si la vel es distinta de cero, dependiendo de si + o -, el ángulo de giro varía  
         */
        if(this.speed!=0){
            const flip = this.speed>0?1:-1;
        
             if(this.controles.left){
            this.angle+=0.03*flip;
            }
             if(this.controles.right){
            this.angle-=0.03*flip;
             }
        }

        this.x-=Math.sin(this.angle)*this.speed;
        this.y-=Math.cos(this.angle)*this.speed;
    }


        /*Vamos a dibujar el coche dando unas posiciones (puntos) en el polígono
        El bucle for itera por todos los puntos restantes del polígno
        Empieza en i=1 pq el punto 0 se declara en el ctx.moveTo*/
   


    draw(ctx){
       if(this.damaged){
            ctx.fillStyle="gray";
       }else{
            ctx.fillStyle="black";
       }
       ctx.beginPath();
       ctx.moveTo(this.poligono[0].x,this.poligono[0].y);
       for(let i=1;i<this.poligono.length;i++){
            ctx.lineTo(this.poligono[i].x,this.poligono[i].y);
       }
        ctx.fill();
        //Damos al coche la responsabilidad de dibujar sus sensores
        this.sensor.draw(ctx);
    }
}