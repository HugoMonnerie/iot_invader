export function sound(src, loop) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    if(loop)
    this.sound.setAttribute("loop", true);
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
    }
  }

  
export function tomarDatosArduinio(juego) {
    const p1 = requestPromesa("GET", "http://192.168.0.91");
    Promise.all([p1]).then(function (respuestas) {
        var myObj = JSON.parse(respuestas[0]);
        juego.online = myObj.valor;
        //console.log("valor de juego.online:" + juego.online);
    }).catch(function (statusError) { console.error(statusError) });

}

export function requestPromesa(method, url, body) {
    return new Promise(function (resolve, reject) {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(xhr.response);
            } else {
                reject({
                    status: xhr.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: xhr.status,
                statusText: xhr.statusText
            });
        };
        xhr.send(body);
    });
}