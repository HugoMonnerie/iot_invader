const ESTADO = {
  PAUSA: 0,
  NUEVO: 1,
  CORRIENDO: 2,
  NUEVONIVEL: 3,
  GAMEOVER: 4
};
export default class Menu {
  constructor(juego) {
    this.juego = juego;
    this.w = this.juego.w;
    this.h = this.juego.h;
    this.x = 0;
    this.y = 0;
  }
  dibujar(ctx) {
    switch (this.juego.estado) {
      case ESTADO.NUEVO:
        //Datos a mostrar
        this.juego.ctx.fillStyle = "rgba(255,255,255,0.5)";
        this.juego.ctx.fillRect(0, 0, this.w, this.h);
        this.juego.ctx.fillStyle = "black";
        this.juego.ctx.textAling = "start";
        this.juego.ctx.font = "30px ARKANOID";
        this.juego.ctx.fillText("ESPACIO PARA INICIAR", this.w / 3, this.h / 2);
        break;
      case ESTADO.PAUSA:
        //Datos a mostrar
        this.juego.ctx.fillStyle = "rgba(255,255,255,0.5)";
        this.juego.ctx.fillRect(0, 0, this.w, this.h);
        this.juego.ctx.fillStyle = "black";
        this.juego.ctx.textAling = "start";
        this.juego.ctx.font = "30px ARKANOID";
        this.juego.ctx.fillText("PAUSA", this.w / 3, this.h / 2);
        break;
      case ESTADO.GAMEOVER:
        //Datos a mostrar
        this.juego.ctx.fillStyle = "rgb(255,255,255)";
        this.juego.ctx.fillRect(0, 0, this.w, this.h);
        this.juego.ctx.fillStyle = "black";
        this.juego.ctx.textAling = "center";
        this.juego.ctx.font = "30px ARKANOID";
        this.juego.ctx.fillText("GAME OVER", this.w / 3, this.h / 2);
        break;
      default:
        break;
    }
  }
  actualizar(tiempoDelta) {
    this.cambiarDeTamaño();
  }

  cambiarDeTamaño() {
    this.w = this.juego.w;
    this.h = this.juego.h;
  }
}
