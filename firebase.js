import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";

// Configuración Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBhiAIqXDwaVORatVC_dZngvw6_1va8vHQ",
  authDomain: "feria-digital-vereda-el-progre.firebaseapp.com",
  projectId: "feria-digital-vereda-el-progre",
  storageBucket: "feria-digital-vereda-el-progre.firebasestorage.app",
  messagingSenderId: "916717659616",
  appId: "1:916717659616:web:4864594ac0003e191e3785"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// =====================================
// REDIRECCIÓN AUTOMÁTICA SI YA ESTÁ LOGUEADO
// =====================================
onAuthStateChanged(auth, (user) => {
  if (user && window.location.pathname.includes("login.html")) {
    window.location.href = "index.html";
  }
});

// =====================================
// MANEJO DEL FORMULARIO DE LOGIN
// =====================================
const form = document.getElementById("loginForm");
const botonRegistro = document.getElementById("registrar");
const mensaje = document.getElementById("loginMensaje");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      mensaje.textContent = "Error: Ingresa un correo válido";
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        mensaje.textContent = "Inicio de sesión exitoso";
        // Redirige aunque Firebase tarde en actualizar
        window.location.href = "index.html";
      })
      .catch((error) => {
        mensaje.textContent = "Error: " + error.message;
      });
  });
}

if (botonRegistro) {
  botonRegistro.addEventListener("click", () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      mensaje.textContent = "Error: Ingresa un correo válido";
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        mensaje.textContent = "Usuario registrado correctamente. Redirigiendo...";
        window.location.href = "index.html";
      })
      .catch((error) => {
        mensaje.textContent = "Error: " + error.message;
      });
  });
}