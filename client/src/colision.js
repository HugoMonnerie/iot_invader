export function colision(objeto1, objeto2) {
    let p = {
        d: objeto1.posicion.y + objeto1.h,
        u: objeto1.posicion.y,
        l: objeto1.posicion.x,
        r: objeto1.posicion.x + objeto1.w,
    };
    let o = {
        d: objeto2.posicion.y + objeto2.h,
        u: objeto2.posicion.y,
        l: objeto2.posicion.x,
        r: objeto2.posicion.x + objeto2.w
    };

    if (p.r >= o.l && p.l <= o.r && p.u < o.d && p.d > o.u) {
        return true;
    }
    return false;
}
