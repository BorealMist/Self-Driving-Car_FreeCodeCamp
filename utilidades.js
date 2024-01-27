/*Función de interpolación lineal 
para dibujar los 3 carriles*/
function lerp(A,B,t){
    return A+(B-A)*t;
}

//Explicación en punto (5)
function getIntersection(A,B,C,D){ 
    const tTop=(D.x-C.x)*(A.y-C.y)-(D.y-C.y)*(A.x-C.x);
    const uTop=(C.y-A.y)*(A.x-B.x)-(C.x-A.x)*(A.y-B.y);
    const bottom=(D.y-C.y)*(B.x-A.x)-(D.x-C.x)*(B.y-A.y);
    
    if(bottom!=0){
        const t=tTop/bottom;
        const u=uTop/bottom;
        if(t>=0 && t<=1 && u>=0 && u<=1){
            return {
                x:lerp(A.x,B.x,t),
                y:lerp(A.y,B.y,t),
                offset:t
            }
        }
    }
    console.log(typeof x);
    return null;
}


 //Explicación (7) PENDIENTE!!!!
function poligonoIntersecta(poli1, poli2){
    for(let i=0;i<poli1.length;i++){
        for(let j=0; j<poli2.length;j++){
            const toque=getIntersection(
                poli1[i],
                poli1[(i+1)%poli1.length],
                poli2[j],
                poli2[(j+1)%poli1.length]
            );
            if(toque){
                return true;
            }
        }
    }
    return false;
} 