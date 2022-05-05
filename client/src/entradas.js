export default class Entradas {
  constructor(juego) {
    document.addEventListener("keydown", (event) => {
      switch (event.keyCode) {
        case 27:
          juego.pausa();
          break;
        case 32:
          juego.iniciar();
          break;
        case 37:
          juego.nave.izquierda();
          break;
        case 38:
          juego.agregarLaser("n");
          break;
        case 39:
          juego.nave.derecha();
          break;
        case 77:
          juego.sonidoFondo.stop();
          break;
        case 83:
          juego.sonidoFondo.play();
          break;
        default:
          break;
      }
    });
    document.addEventListener("keyup", (event) => {
      switch (event.keyCode) {
        case 37:
          juego.nave.detener();
          break;
        case 39:
          juego.nave.detener();
          break;
        default:
          break;
      }
    });
  }
}
