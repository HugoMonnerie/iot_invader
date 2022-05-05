export default class Estrella {
  constructor(juego, x, y, picos, rI, rE, opacity, angulo) {
    this.juego = juego;
    this.x = x;
    this.y = y;
    this.picos = picos;
    this.radioI = rI;
    this.radioE = rE;
    this.opacity = opacity;
    this.angulo = angulo;
    this.factor = 1;
    this.increment = Math.random() * 0.03;
  }
  dibujar(ctx) {
    this.estrella(
      this.juego.ctx,
      this.x,
      this.y,
      this.picos,
      this.radioI,
      this.radioE,
      this.opacity,
      this.angulo
    );
  }
  actualizar(tiempoDelta) {
    this.y += (this.juego.nave.velocidad.max * 6) / 60;
    if (this.opacity > 1) {
      this.factor = -1;
    } else if (this.opacity <= 0) {
      this.factor = 1;
    }

    this.opacity += this.increment * this.factor;
  }

  estrella(
    ctx,
    centerX,
    centerY,
    arms,
    innerRadius,
    outerRadius,
    opacidad,
    startAngle
  ) {
    startAngle = (startAngle * Math.PI) / 180 || 0;
    let step = Math.PI / arms,
      angle = startAngle,
      hyp,
      x,
      y;
    ctx.fillStyle = "rgba(255, 255, 200, " + opacidad + ")";
    ctx.beginPath();
    for (let i = 0, len = 2 * arms; i < len; i++) {
      hyp = i & 1 ? innerRadius : outerRadius;
      x = centerX + Math.cos(angle) * hyp;
      y = centerY + Math.sin(angle) * hyp;
      angle += step;
      ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
}
