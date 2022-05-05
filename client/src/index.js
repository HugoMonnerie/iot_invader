import "./styles.css";
//import { initializeApp } from "firebase";
import {child, get, getDatabase, ref} from "firebase/database";


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
function readUserData() {
  let databdd;
  console.log("read")
  const dbRef = ref(getDatabase());
  get(child(dbRef, `testvalue/direction`)).then((snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val());
      databdd = snapshot.val();
      return databdd
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
  return databdd
}

function cicloDeJuego(tiempo) {
/*  let databdd=readUserData()
  if (databdd < 0){
    juego.nave.izquierda()
  }
  if (databdd > 0){
    juego.nave.derecha()
  }*/

  let tiempoDelta = tiempo - tiempoPasado;
  tiempoPasado = tiempo;
  juego.actualizar(tiempoDelta);
  juego.dibujar();
  requestAnimationFrame(cicloDeJuego);
}
requestAnimationFrame(cicloDeJuego);
