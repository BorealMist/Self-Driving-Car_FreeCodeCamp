class Controles{
    constructor(){
        this.fwd=false;
        this.left=false;
        this.right=false;
        this.back=false;

        this.#addKeyboardListeners();
    }


    #addKeyboardListeners(){
        document.onkeydown=(event)=>{
         switch(event.key){
                case "ArrowLeft":
                    this.left=true;
                    break;
                case "ArrowRight":
                    this.right=true;
                    break;
                case "ArrowUp":
                    this.fwd=true;
                    break;
                case "ArrowDown":
                    this.back=true;
                    break;
        }
    }
    document.onkeyup=(event)=>{
        switch(event.key){
              case "ArrowLeft":
                  this.left=false;
                  break;
              case "ArrowRight":
                  this.right=false;
                  break;
              case "ArrowUp":
                  this.fwd=false;
                  break;
              case "ArrowDown":
                  this.back=false;
                  break;
      }
  }
    //Evaluar cuando dejas de pulsar la tecla
       
}
}