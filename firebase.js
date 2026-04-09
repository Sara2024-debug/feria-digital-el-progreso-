// ===========================
// firebase.js - Versión Mejorada
// ===========================

// Importamos Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";

// ===========================
// CONFIGURACIÓN DE FIREBASE
// ===========================
const firebaseConfig = {
  apiKey: "AIzaSyBhiAIqXDwaVORatVC_dZngvw6_1va8vHQ",
  authDomain: "feria-digital-vereda-el-progre.firebaseapp.com",
  projectId: "feria-digital-vereda-el-progre",
  storageBucket: "feria-digital-vereda-el-progre.appspot.com", // ⚠️ corregido
  messagingSenderId: "916717659616",
  appId: "1:916717659616:web:4864594ac0003e191e3785"
};

// Inicializamos Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// ===========================
// REDIRECCIÓN AUTOMÁTICA SI YA ESTÁ LOGUEADO
// ===========================
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("Usuario logueado:", user.email);
    // Redirige solo si estamos en login.html
    if (window.location.pathname.includes("login.html")) {
      window.location.href = "index.html";
    }
  }
});

// ===========================
// MANEJO DEL LOGIN
// ===========================
const form = document.getElementById("loginForm");
const botonRegistro = document.getElementById("registrar");
const mensaje = document.getElementById("loginMensaje");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // Validación básica del email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      mensaje.textContent = "Error: Ingresa un correo válido";
      return;
    }

    if (password.length < 6) {
      mensaje.textContent = "La contraseña debe tener mínimo 6 caracteres";
      return;
    }

    // Intentamos iniciar sesión
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        mensaje.textContent = "Inicio de sesión exitoso. Redirigiendo...";
        window.location.href = "index.html";
      })
      .catch((error) => {
        // 🔹 Manejo de errores más claro
        switch (error.code) {
          case "auth/invalid-email":
            mensaje.textContent = "Correo inválido";
            break;
          case "auth/user-disabled":
            mensaje.textContent = "Usuario deshabilitado";
            break;
          case "auth/user-not-found":
            mensaje.textContent = "Usuario no encontrado";
            break;
          case "auth/wrong-password":
            mensaje.textContent = "Contraseña incorrecta";
            break;
          default:
            mensaje.textContent = "Error: " + error.message;
        }
      });
  });
}

// ===========================
// REGISTRO DE NUEVO USUARIO
// ===========================
if (botonRegistro) {
  botonRegistro.addEventListener("click", () => {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      mensaje.textContent = "Error: Ingresa un correo válido";
      return;
    }

    if (password.length < 6) {
      mensaje.textContent = "La contraseña debe tener mínimo 6 caracteres";
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        mensaje.textContent = "Usuario registrado correctamente. Redirigiendo...";
        window.location.href = "index.html";
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/email-already-in-use":
            mensaje.textContent = "El correo ya está registrado";
            break;
          case "auth/invalid-email":
            mensaje.textContent = "Correo inválido";
            break;
          case "auth/weak-password":
            mensaje.textContent = "Contraseña débil, mínimo 6 caracteres";
            break;
          default:
            mensaje.textContent = "Error: " + error.message;
        }
      });
  });
}

// ===========================
// CERRAR SESIÓN
// ===========================
const botonCerrar = document.getElementById("cerrarSesion");

if (botonCerrar) {
  botonCerrar.addEventListener("click", () => {
    signOut(auth)
      .then(() => {
        window.location.href = "login.html";
      })
      .catch((error) => {
        console.error("Error al cerrar sesión:", error);
      });
  });
}