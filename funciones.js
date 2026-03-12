/* =====================================
   SISTEMA DE CAMBIO DE VISTAS
===================================== */

// Cambia entre vistas sin recargar la página
function mostrarVista(nombre, guardarHistorial = true) {

  console.log("Cambiando a la vista:", nombre);

  const vistas = document.querySelectorAll(".vista");
  vistas.forEach(v => v.classList.remove("activa"));

  const objetivo = document.getElementById(`vista-${nombre}`);

  if (objetivo) {

    objetivo.classList.add("activa");
    console.log("Vista mostrada correctamente:", nombre);

    // Guardar en historial del navegador
    if (guardarHistorial) {
      history.pushState({ vista: nombre }, "", "#vista-" + nombre);
    }

  } else {
    console.log("Error: la vista no existe ->", nombre);
  }

}


/* =====================================
   BOTONES DEL MENÚ PRINCIPAL
===================================== */

document.querySelectorAll("button[data-vista]").forEach(btn => {

  btn.addEventListener("click", () => {

    const vista = btn.getAttribute("data-vista");

    console.log("Botón presionado:", vista);

    mostrarVista(vista);

  });

});


/* =====================================
   BOTONES VOLVER
===================================== */

const botonesVolver = [
  "volver-cultivo",
  "volver-galeria",
  "volver-historias",
  "volver-contacto"
];

botonesVolver.forEach(id => {

  const boton = document.getElementById(id);

  if (boton) {

    boton.addEventListener("click", () => {

      console.log("Volviendo al inicio desde", id);

      mostrarVista("inicio");

    });

  }

});


/* =====================================
   BOTÓN VER MÁS / VER MENOS
===================================== */

document.querySelectorAll(".ver-mas").forEach(boton => {

  boton.addEventListener("click", () => {

    const detalle = boton.nextElementSibling;

    detalle.classList.toggle("oculto");

    if (detalle.classList.contains("oculto")) {

      boton.textContent = "Ver más";
      console.log("Se ocultó la información");

    } else {

      boton.textContent = "Ver menos";
      console.log("Se mostró más información");

    }

  });

});


/* =====================================
   VALIDACIÓN DEL FORMULARIO
===================================== */

const formulario = document.getElementById("formulario");

if (formulario) {

  formulario.addEventListener("submit", function (e) {

    e.preventDefault();

    let nombre = document.getElementById("nombre").value;
    let celular = document.getElementById("celular").value;
    let mensaje = document.getElementById("mensaje").value;

    const respuesta = document.getElementById("respuesta");

    if (nombre === "") {
      respuesta.textContent = "Error: el nombre es obligatorio";
      console.log("Error: nombre vacío");
      return;
    }

    if (celular.length !== 10) {
      respuesta.textContent = "Error: el celular debe tener 10 dígitos";
      console.log("Error: celular incorrecto");
      return;
    }

    if (mensaje.length < 10) {
      respuesta.textContent = "Error: el mensaje debe tener mínimo 10 caracteres";
      console.log("Error: mensaje muy corto");
      return;
    }

    respuesta.textContent = "Formulario enviado correctamente";
    console.log("Formulario válido");

  });

}


/* =====================================
   HISTORIAL DEL NAVEGADOR
===================================== */

// Detecta uso de flechas del navegador (atrás / adelante)
window.addEventListener("popstate", function (e) {

  if (e.state && e.state.vista) {

    mostrarVista(e.state.vista, false);

  }

});