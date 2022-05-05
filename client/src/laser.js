import { colision } from "./colision.js";
import { getDatabase, ref, set } from "firebase/database";
//import firebase from "firebase/database";

export default class Laser {

  constructor(juego, x, y, tipo) {
    this.juego = juego;
    this.w = this.juego.w / 150;
    this.h = this.juego.h / 25;
    this.posicion = {
      x: x,
      y: y - this.h
    };
    this.velocidad = {
      n: -10,
      i: 8
    };
    this.tipo = tipo;
    this.color = {
      n: "#f59b2f",
      i: "white"
    };
    this.borde = 1;
  }
  dibujar() {
    this.disparo(
      this.juego.ctx,
      this.posicion.x,
      this.posicion.y,
      this.w,
      this.h,
      this.color[this.tipo],
      this.color[this.tipo],
      this.borde
    );
  }
  actualizar() {
    this.cambiarDeTamaño();
    var valuedatapuntos ;
    this.posicion.y += this.velocidad[this.tipo];
    if (this.tipo === "n") {
      this.juego.invasores.forEach(invasor => {
        if (colision(invasor, this)) {
          this.juego.puntos += 1;
          var valuedatapuntos = this.juego.puntos;

          function writeUserData() {
            const db = getDatabase();
            set(ref(db, 'testvalue/'), {
              value : valuedatapuntos
            });
          }
          writeUserData()

          /*const dbRefObjectArticleCONTENU1 = firebase.database().ref().child('testvalue');
          dbRefObjectArticleCONTENU1.on('value', snap => {this.juego.puntos = snap.val()});
*/
          invasor.energia--;
          this.juego.sonidoImpacto.play();
          this.posicion.y = -20;
        }
      });
    } else {
      if (colision(this.juego.nave, this)) {
        this.juego.vidas--;
        this.juego.canones = 0;
        this.juego.limiteDeLaser--;
        this.juego.nave.velocidad.max--;
        this.juego.autofire = 0;
        this.juego.sonidoImpactoNave.play();
      }
    }
  }
  disparo(ctx, x, y, w, h, exterior, interior, borde) {
    //Circulo Exterior
    ctx.fillStyle = exterior;
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = interior;
    ctx.fillRect(x + borde, y + borde, w - borde * 2, h - borde * 2);
  }


  cambiarDeTamaño() {
    this.w = this.juego.w / 150;
    this.h = this.juego.h / 20;
  }
}
