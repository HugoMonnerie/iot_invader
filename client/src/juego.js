import Nave from "./nave.js";
import Laser from "./laser.js";
import Entradas from "./entradas.js";
import Dashboard from "./dashboard.js";
import Menu from "./menu.js";
import { crearNivel, nivelRandom } from "./niveles.js";
import { sound } from "./funciones.js";
import Powerup from "./powerup.js";
import Estrella from "./estrella.js";
const ESTADO = {
  PAUSA: 0,
  NUEVO: 1,
  CORRIENDO: 2,
  NUEVONIVEL: 3,
  GAMEOVER: 4
};
export default class Juego {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.w = document.documentElement.clientWidth - 40;
    this.h = document.documentElement.clientHeight - 40;
    this.wi = (this.w / 10) * 2;
    this.wd = (this.w / 10) * 8;
    this.wj = (this.w / 10) * 6;
    this.nave = new Nave(this);
    this.numeroEstrellas = Math.round(Math.random() * 50) + 25;
    this.invasorVelocidad = {
      x: 2,
      y: 1
    };
    this.laserInvasor = [];
    this.laserNave = [];
    this.entradas = new Entradas(this);
    this.invasores = [];
    this.powerUPS = [];
    this.dashboard = new Dashboard(this);
    this.estrellas = [];
    this.estado = ESTADO.NUEVO;
    this.nivel = 1;
    this.vidas = 100;
    this.puntos = 0;
    this.limiteDeLaser = 1;
    this.autofire = 0;
    this.canones = 0;
    this.menu = new Menu(this);
    this.sonidoIniciar = new sound("/sonido/iniciar.mp3", false);
    this.sonidoFondo = new sound("/sonido/fondo.mp3", true);
    this.sonidoNivel = new sound("/sonido/nuevoNivel.mp3", false);
    this.sonidoOver = new sound("/sonido/gameOver.mp3", false);
    this.sonidoDisparoNave = new sound("/sonido/disparoLaserNave.mp3", false);
    this.soundCapturado = new sound("/sonido/powerUp.mp3");
    this.sonidoDisparo = new sound("/sonido/disparoLaserInvasor.mp3", false);
    this.sonidoImpacto = new sound("/sonido/laserImpacta2.mp3");
    this.sonidoImpactoNave = new sound("/sonido/naveExplota.mp3");
  }

  dibujar() {
    if (this.estado === ESTADO.CORRIENDO || this.estado === ESTADO.PAUSA) {
      [this.dashboard, ...this.estrellas, this.nave].forEach(Objecto =>
        Objecto.dibujar()
      );
      [
        ...this.invasores,
        ...this.laserNave,
        ...this.laserInvasor,
        ...this.powerUPS
      ].forEach(Objecto => Objecto.dibujar());
    }
    this.menu.dibujar();
  }
  actualizar(tiempoDelta) {
    if (this.autofire === 0) this.agregarLaser("n");
    if (this.vidas > 100) this.vidas = 100;
    if (this.limiteDeLaser > 10) this.limiteDeLaser = 1;
    if (this.limiteDeLaser < 1) this.limiteDeLaser = 1;
    if (this.nave.velocidad.max > 40) this.nave.velocidad.max = 40;
    if (this.nave.velocidad.max < 10) this.nave.velocidad.max = 10;
    this.cambiarDeTamaño();

    if (this.estado === ESTADO.CORRIENDO) {
      if (this.estrellas.length < this.numeroEstrellas)
        this.agregarEstrella(true);
      this.invasores = this.invasores.filter(invasor => invasor.energia > 0);

      if (this.invasores.length > 0) {
        if (Math.floor(Math.random() * 100) === 0) {
          this.agregarPowerUP();
        }
        this.powerUPS = this.powerUPS.filter(
          power => power.posicion.x > this.wi
        );
        this.laserNave = this.laserNave.filter(laser => laser.posicion.y >= 0);
        this.laserInvasor = this.laserInvasor.filter(
          laser => laser.posicion.y <= this.h
        );
        this.estrellas = this.estrellas.filter(estrella => estrella.y < this.h);
        [
          ...this.powerUPS,
          ...this.invasores,
          ...this.laserNave,
          ...this.laserInvasor,
          this.dashboard,
          ...this.estrellas,
          this.nave
        ].forEach(power => power.actualizar());
      } else {
        this.estado = ESTADO.NUEVONIVEL;
        this.iniciar();
      }
    }
    this.menu.actualizar(tiempoDelta);
    if (this.vidas <= 0) {
      this.estado = ESTADO.GAMEOVER;
      this.sonidoFondo.stop();
      this.sonidoOver.play();
    }
  }
  iniciar() {
    if (this.estado === ESTADO.NUEVO || this.estado === ESTADO.GAMEOVER) {
      this.restablecer();
      this.sonidoOver.stop();
      this.sonidoFondo.play();
      this.nivel = 1;
      this.vidas = 100;
      this.puntos = 0;
      this.restablecer();
      this.invasores = crearNivel(this, nivelRandom(this.nivel));
      for (let i = 0; i <= this.numeroEstrellas; i++) {
        this.agregarEstrella();
      }

      this.estado = ESTADO.CORRIENDO;
    }
    if (this.estado === ESTADO.NUEVONIVEL) {
      this.restablecer();
      this.sonidoNivel.play();
      this.nivel++;
      this.invasores = crearNivel(this, nivelRandom(this.nivel));
      this.restablecer();
      this.estado = ESTADO.CORRIENDO;
    }
  }
  pausa() {
    if (this.estado === ESTADO.PAUSA) {
      this.estado = ESTADO.CORRIENDO;
    } else {
      this.estado = ESTADO.PAUSA;
    }
  }
  restablecer() {
    this.invasorVelocidad.x++;
    this.invasorVelocidad.y = 0;
  }
  ancho() {
    return this.w;
  }
  alto() {
    return this.h;
  }
  cambiarDeTamaño() {
    this.w = document.documentElement.clientWidth - 40;
    this.h = document.documentElement.clientHeight - 40;
    this.wi = (this.w / 10) * 2;
    this.wd = (this.w / 10) * 8;
    this.wj = (this.w / 10) * 6;
    this.canvas.width = this.w;
    this.canvas.height = this.h;
  }
  agregarEstrella(reposicion) {
    let y = Math.round(Math.random() * (this.h + 100)) + -100;
    if (reposicion) y = Math.round(Math.random() * this.h) - this.h;
    let interior = Math.round(Math.random() * 5) + 1;
    this.estrellas.push(
      new Estrella(
        this,
        Math.round(Math.random() * (this.wj - 10) + this.wi + 10),
        y,
        Math.round(Math.random() * 5) + 5,
        Math.round(Math.random() * 5) + 1,
        interior,
        interior + ((interior / 10) * Math.round(Math.random() * 9) + 1),
        Math.round(Math.random() * 180) + 1
      )
    );
  }
  agregarLaser(tipo, invasor) {
    if (invasor) {
      this.laserInvasor.push(
        new Laser(
          this,
          invasor.posicion.x + invasor.w / 2,
          invasor.posicion.y + invasor.h,
          tipo
        )
      );
      this.sonidoDisparo.play();
    } else {
      if (this.canones <= 0) {
        this.nave.tipo=0;
        if (this.laserNave.length <= this.limiteDeLaser) {
          this.laserNave.push(
            new Laser(
              this,
              this.nave.posicion.x + this.nave.w / 2,
              this.nave.posicion.y,
              tipo
            )
          );
          this.sonidoDisparoNave.play();
        }
      } else {
        this.nave.tipo=1;
        if (this.laserNave.length <= this.limiteDeLaser ) {
          this.laserNave.push(
            new Laser(
              this,
              this.nave.posicion.x + this.nave.w / 2 -5,
              this.nave.posicion.y,
              tipo
            )
          );
          this.laserNave.push(
            new Laser(
              this,
              this.nave.posicion.x - 5,
              this.nave.posicion.y + this.nave.h / 2,
              tipo
            )
          );
          this.laserNave.push(
            new Laser(
              this,
              this.nave.posicion.x + this.nave.w - 5,
              this.nave.posicion.y + this.nave.h / 2,
              tipo
            )
          );
          this.sonidoDisparoNave.play();
        }
      }
    }
  }
  agregarPowerUP() {
    //console.log("Se agrega Power Up");
    let tipo = Math.floor(Math.random() * 6);
    let px = this.wd;
    let py = Math.floor(((Math.random() * this.h) / 10) * 8) + this.h / 10;
    this.powerUPS.push(new Powerup(this, px, py, tipo));
  }
  cambiaAlturaInvasor(altura) {
    this.invasores.forEach(invasor => {
      invasor.posicion.y += altura;
    });
  }
}
