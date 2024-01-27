
//Especificamos el alto del canvas (tanto como la ventana) y ancho (200u)
const canvas = document.getElementById("miCanvas");

canvas.width=200;

//Contexto definido en entrada 1 de notas.txt
const ctx = canvas.getContext("2d");
const carretera = new Carretera(canvas.width/2, canvas.width*0.9);
const coche =new Coche(carretera.getLaneCenter(1),100,30,50);

//la función animate llama a redibujar y actualizar al coche cada vez que se ejecuta
animate();

function animate(){

    coche.update(carretera.borders);

    canvas.height=window.innerHeight;

    //Estas funciones hacen que la carretera se "mueva" al avanzar

    ctx.save();
    //Posicionamos coche. en el tercio inferior de la pantalla
    ctx.translate(0,-coche.y+canvas.height*0.7);

    carretera.draw(ctx);
    coche.draw(ctx);

    ctx.restore();
    requestAnimationFrame(animate);
}
