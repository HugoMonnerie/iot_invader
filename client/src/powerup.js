import { colision } from "./colision.js";
const TIPOS = {
  0: {
    autofire: 0,
    vida: 0,
    laser: 1,
    velocidad: 0,
    canones: 0,
    nombre: "L",
    color: "red",
    letra: "white"
  },
  1: {
    autofire: 0,
    vida: 10,
    laser: 0,
    velocidad: 0,
    canones: 0,
    nombre: "E",
    color: "blue",
    letra: "white"
  },
  2: {
    autofire: 0,
    vida: 0,
    laser: 0,
    velocidad: 1,
    canones: 0,
    nombre: "S",
    color: "yellow",
    letra: "black"
  },
  3: {
    autofire: 0,
    vida: 10,
    laser: 1,
    velocidad: 1,
    canones: 0,
    nombre: "L-E-S",
    color: "green",
    letra: "white"
  },
  4: {
    autofire: 0,
    vida: 0,
    laser: 0,
    velocidad: 0,
    canones: 0,
    nombre: "A",
    color: "green",
    letra: "white"
  },
  5: {
    autofire: 0,
    vida: 0,
    laser: 0,
    velocidad: 0,
    canones: 3,
    nombre: "L X 3",
    color: "brown",
    letra: "white"
  }
};
export default class Powerup {
  constructor(juego, x, y, tipo) {
    this.juego = juego;
    this.posicion = {
      x: x,
      y: y
    };
    this.limite = {
      i: this.juego.wi,
      d: this.juego.wd
    };
    this.w = 0;
    this.h = 0;
    this.velocidad = {
      x: -4,
      y: 0
    };
    this.tipo = tipo;
  }
  dibujar() {
    this.powerUP(
      this.juego.ctx,
      this.posicion.x,
      this.posicion.y,
      this.w,
      this.h
    );
  }
  actualizar() {
    this.cambiarDeTamaño();
    this.posicion.x += this.velocidad.x;
    if (this.juego.laserNave.length > 0) {
      this.juego.laserNave.forEach(laser => {
        if (colision(laser, this)) {
          this.juego.soundCapturado.play();
          this.posicion.x = -550;
          this.juego.vidas += TIPOS[this.tipo].vida;
          this.juego.limiteDeLaser += TIPOS[this.tipo].laser;
          this.juego.nave.velocidad.max += TIPOS[this.tipo].velocidad;
          this.juego.autofire += TIPOS[this.tipo].autofire;
          this.juego.canones += TIPOS[this.tipo].canones;
        }
      });
    }
  }
  powerUP(ctx, x, y, w, h) {
    ctx.fillStyle = TIPOS[this.tipo].color;
    ctx.fillRect(x, y, w, h);
    ctx.beginPath();
    ctx.arc(x, y + h / 2, h / 2, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x + w, y + h / 2, h / 2, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = TIPOS[this.tipo].letra;
    ctx.textAling = "center";
    ctx.font = (h / 4) * 3 + "px console";
    ctx.fillText(
      TIPOS[this.tipo].nombre,
      this.posicion.x + w / 2,
      this.posicion.y + this.h / 2 + 2
    );
  }
  cambiarDeTamaño() {
    this.w = this.juego.wj / 11;
    this.h = this.juego.h / 30;
    this.limite.i = this.juego.wi;
    this.limite.d = this.juego.wd;
  }
}
