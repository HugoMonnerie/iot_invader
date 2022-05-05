import "./styles.css";
import { initializeApp } from "firebase/app";





import Juego from "./juego.js";
let juego = new Juego(document.getElementById("pantalla"));
let tiempoPasado = 0;


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAiY3bwulQUtLDgwXkolunJFDjG8gmRMoQ",
  authDomain: "spaceinvaders-4e5a9.firebaseapp.com",
  databaseURL: "https://spaceinvaders-4e5a9-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "spaceinvaders-4e5a9",
  storageBucket: "spaceinvaders-4e5a9.appspot.com",
  messagingSenderId: "861620168064",
  appId: "1:861620168064:web:0f43262878120e69948d65"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
import { getDatabase, ref, child, get } from "firebase/database";


const database = getDatabase();


const dbRef = ref(getDatabase());
let datadir;

function readdirection(){
  get(child(dbRef, `testvalue/direction`)).then((snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val());
      datadir = snapshot.val();
      return datadir
    } else {
      console.log("No data available");
    }
    return datadir
  }).catch((error) => {
    console.error(error);
  });
}


function cicloDeJuego(tiempo) {
  readdirection()
  if (datadir > 0){
    juego.nave.izquierda()
  }
  if (datadir < 0){
    juego.nave.derecha()
  }
  let tiempoDelta = tiempo - tiempoPasado;
  tiempoPasado = tiempo;
  juego.actualizar(tiempoDelta);
  juego.dibujar();
  requestAnimationFrame(cicloDeJuego);
}
requestAnimationFrame(cicloDeJuego);
