export default class Nave {
  constructor(juego) {
    this.juego = juego;
    this.posicion = {
      x: 0,
      y: 0
    };
    this.limite = {
      i: this.juego.wi,
      d: this.juego.wd
    };
    this.tipo = 0;
    this.w = 0;
    this.h = 0;
    this.velocidad = {
      x: 0,
      y: 0,
      max: 10
    };
  }
  dibujar() {
    this.crearNave(
      this.juego.ctx,
      this.posicion.x,
      this.posicion.y,
      this.w,
      this.h,
      this.tipo
    );
  }
  actualizar() {
    this.cambiarDeTamaño();
    this.juego.invasores.forEach(invasor => {
      if (this.posicion.y <= invasor.posicion.y + invasor.h)
        this.juego.vidas = 0;
    });
    this.posicion.x += this.velocidad.x;
    if (this.posicion.x <= this.limite.i) this.posicion.x = this.limite.i;

    if (this.posicion.x + this.w >= this.limite.d)
      this.posicion.x = this.limite.d - this.w;
  }
  crearNave(ctx, x, y, w, h, tipo) {
    let navecita = {
      0: [
        [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0],
        [0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0],
        [0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0],
        [0, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 0],
        [0, 0, 0, 0, 0, 3, 2, 3, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 3, 2, 3, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 3, 2, 3, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 3, 2, 3, 0, 0, 0, 0, 0],
        [4, 4, 4, 0, 3, 3, 2, 3, 3, 0, 4, 4, 4],
        [4, 3, 4, 3, 3, 3, 2, 3, 3, 3, 4, 3, 4],
        [4, 3, 4, 3, 3, 3, 2, 3, 3, 3, 4, 3, 4],
        [4, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 4],
        [4, 3, 4, 3, 0, 3, 0, 3, 0, 3, 4, 3, 4],
        [4, 3, 4, 0, 0, 3, 0, 3, 0, 0, 4, 3, 4],
        [4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4],
        [0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ],
      1: [
        [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0],
        [0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0],
        [0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0],
        [0, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 0],
        [0, 0, 0, 0, 0, 3, 2, 3, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 3, 2, 3, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 3, 2, 3, 0, 0, 0, 1, 0],
        [0, 1, 0, 0, 0, 3, 2, 3, 0, 0, 0, 1, 0],
        [4, 4, 4, 0, 3, 3, 2, 3, 3, 0, 4, 4, 4],
        [4, 3, 4, 3, 3, 3, 2, 3, 3, 3, 4, 3, 4],
        [4, 3, 4, 3, 3, 3, 2, 3, 3, 3, 4, 3, 4],
        [4, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 4],
        [4, 3, 4, 3, 0, 3, 0, 3, 0, 3, 4, 3, 4],
        [4, 3, 4, 0, 0, 3, 0, 3, 0, 0, 4, 3, 4],
        [4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4],
        [0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ]
    };
    let color = {
      1: "yellow",
      2: "red",
      3: "aqua",
      4: "brown"
    };
    w = w / 13;
    h = h / 21;
    navecita[tipo].forEach((fila, fi) => {
      fila.forEach((columna, ci) => {
        if (columna > 0) {
          ctx.fillStyle = color[columna];
          ctx.fillRect(x + ci * w, y + fi * h, w, h);
        }
      });
    });
  }
  cambiarDeTamaño() {
    this.w = this.juego.wj / 11;
    this.h = this.juego.h / 15;
    this.limite.i = this.juego.wi;
    this.limite.d = this.juego.wd;
    this.posicion.y = this.juego.h - this.h - 20;
  }
  izquierda() {
    this.velocidad.x = -this.velocidad.max;
  }
  derecha() {
    this.velocidad.x = this.velocidad.max;
  }
  detener() {
    this.velocidad.x = 0;
  }
}
