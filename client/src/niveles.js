import Invasor from "./invasor.js";

export function crearNivel(juego, nivel) {
  let regreso = [];
  nivel.forEach((fila, filaIndex) => {
    fila.forEach((columna, columnaIndex) => {
      if (columna > 0)
        regreso.push(new Invasor(juego, filaIndex, columnaIndex, columna));
    });
  });
  return regreso;
}

export function nivelRandom(level) {
  let dificultad = parseInt(level / 5 + 1, 10);
  let dificultades = {
    1: {
      tiposDeInvasor: 2,
      lineas: 2
    },
    2: {
      tiposDeInvasor: 3,
      lineas: 3
    },
    3: {
      tiposDeInvasor: 4,
      lineas: 4
    },
    4: {
      tiposDeInvasor: 5,
      lineas: 5
    },
    5: {
      tiposDeInvasor: 6,
      lineas: 6
    },
    6: {
      tiposDeInvasor: 7,
      lineas: 7
    },
    7: {
      tiposDeInvasor: 8,
      lineas: 8
    },
    8: {
      tiposDeInvasor: 9,
      lineas: 9
    }
  };
  let nivel = [];
  let filas = dificultades[dificultad].lineas;

  for (let i = 1; i <= filas; i++) {
    let fila = [0, 0, 0, 0, 0, 0, 0, 0];
    fila.forEach((nave, index) => {
      fila[index] = Math.floor(
        Math.random() * dificultades[dificultad].tiposDeInvasor
      );
    });
    nivel.push(fila);
  }
  return nivel;
}
