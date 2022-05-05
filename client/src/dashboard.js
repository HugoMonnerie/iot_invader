export default class Dashboard {
  constructor(juego) {
    this.juego = juego;
    this.w = this.juego.w;
    this.h = this.juego.h;
    this.wd1 = (this.w / 10) * 2;
    this.wd2 = (this.w / 10) * 2;
    this.wj = (this.w / 10) * 6;
    this.posicion = {
      x: 0,
      y: 0,
      x1: (this.w / 10) * 8,
      y1: 0
    };
  }
  dibujar() {
    //Dibuja el centro
    let grd = this.juego.ctx.createLinearGradient(0, 0, 0, this.h);
    grd.addColorStop(0, "#5b6577");
    grd.addColorStop(1, "#2c313a");
    this.juego.ctx.fillStyle = "black";
    this.juego.ctx.fillRect(this.wd1, 0, this.wj, this.h);

    //Datos a mostrar
    let grd1 = this.juego.ctx.createLinearGradient(0, 0, 0, this.h);
    grd1.addColorStop(0, "#4f5764");
    grd1.addColorStop(1, "#2e333a");

    //Margen Izquierdo
    this.juego.ctx.fillStyle = "#999900";
    this.juego.ctx.fillRect(this.posicion.x, this.posicion.y, this.wd1, this.h);
    this.juego.ctx.fillStyle = grd1;
    this.juego.ctx.fillRect(
      this.posicion.x + 2,
      this.posicion.y + 2,
      this.wd1 - 4,
      this.h - 4
    );
    //Margen Derecho
    this.juego.ctx.fillStyle = "#999900";
    this.juego.ctx.fillRect(
      this.posicion.x1,
      this.posicion.y1,
      this.wd2,
      this.h
    );
    this.juego.ctx.fillStyle = grd1;
    this.juego.ctx.fillRect(
      this.posicion.x1 + 2,
      this.posicion.y1 + 2,
      this.wd2 - 4,
      this.h - 4
    );

    //Panel Izquierdo
    this.juego.ctx.fillStyle = "#f59b2f";
    this.juego.ctx.textAling = "center";
    this.juego.ctx.font = this.wd1 / 10 + "px ARKANOID";
    this.juego.ctx.fillText(
      "SPACE",
      this.posicion.x + this.wd1 / 6,
      this.posicion.y + this.h / 12
    );
    this.juego.ctx.fillText(
      "INVADER",
      this.posicion.x + this.wd1 / 6,
      this.posicion.y + (this.h / 12) * 2
    );
    this.juego.ctx.fillText(
      "SCORE:",
      this.posicion.x + this.wd1 / 6,
      this.posicion.y + (this.h / 12) * 4
    );
    this.juego.ctx.fillText(
      "LEVEL:",
      this.posicion.x + this.wd1 / 6,
      this.posicion.y + (this.h / 12) * 8
    );
    this.juego.ctx.fillText(
      "ADRIANEVIL",
      this.posicion.x + this.wd1 / 6,
      this.posicion.y + (this.h / 12) * 10
    );
    this.juego.ctx.fillText(
      "C I D",
      this.posicion.x + this.wd1 / 6,
      this.posicion.y + (this.h / 12) * 11
    );

    this.juego.ctx.fillStyle = "yellow";
    this.juego.ctx.textAling = "center";
    this.juego.ctx.font = this.wd1 / 9 + "px Consolas";
    this.juego.ctx.fillText(
      this.juego.puntos,
      this.posicion.x + this.wd1 / 6,
      this.posicion.y + (this.h / 12) * 5
    );
    this.juego.ctx.fillText(
      this.juego.nivel,
      this.posicion.x + this.wd1 / 6,
      this.posicion.y + (this.h / 12) * 9
    );

    //Panel Derecho
    this.juego.ctx.fillStyle = "#f59b2f";
    this.juego.ctx.textAling = "center";
    this.juego.ctx.font = this.wd1 / 10 + "px ARKANOID";
    this.juego.ctx.fillText(
      "SPEED",
      this.wd1 + this.wj + this.wd1 / 6,
      this.posicion.y + (this.h / 12) * 2
    );
    this.juego.ctx.fillText(
      "LASER",
      this.wd1 + this.wj + this.wd1 / 6,
      this.posicion.y + (this.h / 12) * 4
    );
    this.juego.ctx.fillText(
      "ENERGY:",
      this.wd1 + this.wj + this.wd1 / 6,
      this.posicion.y + (this.h / 12) * 6
    );

    this.juego.ctx.fillStyle = "yellow";
    this.juego.ctx.textAling = "center";
    this.juego.ctx.font = this.wd1 / 9 + "px Consolas";
    this.juego.ctx.fillText(
      this.juego.nave.velocidad.max,
      this.wd1 + this.wj + this.wd1 / 6,
      this.posicion.y + (this.h / 12) * 3
    );
    this.juego.ctx.fillText(
      this.juego.limiteDeLaser,
      this.wd1 + this.wj + this.wd1 / 6,
      this.posicion.y + (this.h / 12) * 5
    );
    this.juego.ctx.fillText(
      this.juego.vidas + "%",
      this.wd1 + this.wj + this.wd1 / 6,
      this.posicion.y + (this.h / 12) * 7
    );
    if (this.juego.autofire === 0)
      this.juego.ctx.fillText(
        "",
        this.wd1 + this.wj + this.wd1 / 6,
        this.posicion.y + (this.h / 12) * 8
      );
  }
  actualizar(tiempoDelta) {
    this.cambiarDeTamaño();
  }

  cambiarDeTamaño() {
    this.w = this.juego.w;
    this.h = this.juego.h;
    this.wd1 = (this.w / 10) * 2;
    this.wd2 = (this.w / 10) * 2;
    this.wj = (this.w / 10) * 6;
    this.posicion.x = 0;
    this.posicion.y = 0;
    this.posicion.x1 = (this.w / 10) * 8;
    this.posicion.y1 = 0;

    //console.log("margenDerecho: " + this.posicion.x1);
  }
}
