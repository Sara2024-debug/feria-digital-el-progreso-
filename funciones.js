/*
Archivo encargado de manejar la interacción
de la interfaz del usuario.
*/

document.addEventListener("DOMContentLoaded", () => {

  /* ============================= */
  /* BOTONES VER MÁS / VER MENOS */
  /* ============================= */

  const botones = document.querySelectorAll(".ver-mas");

  botones.forEach(boton => {

    boton.addEventListener("click", () => {

      const detalle = boton.nextElementSibling;

      // Alterna la clase oculto para mostrar/ocultar el detalle
      detalle.classList.toggle("oculto");

      // Cambia el texto del botón según el estado
      if (detalle.classList.contains("oculto")) {
        boton.textContent = "Ver más";
      } else {
        boton.textContent = "Ver menos";
      }

    });

  });


  /* ============================= */
  /* VALIDACIÓN DEL FORMULARIO */
  /* ============================= */

  const formulario = document.getElementById("formulario");

  if (formulario) {

    formulario.addEventListener("submit", (e) => {

      // Evitamos que la página se recargue al enviar
      e.preventDefault();

      // Obtenemos los valores de los campos y eliminamos espacios al inicio y al final
      const nombre = document.getElementById("nombre").value.trim();
      const celular = document.getElementById("celular").value.trim();
      const mensaje = document.getElementById("mensaje").value.trim();

      const respuesta = document.getElementById("respuesta");

      // Validación del nombre
      if (nombre === "") {
        respuesta.textContent = "El nombre es obligatorio";
        return;
      }

      // =========================================
      // VALIDACIÓN DEL CELULAR (Mejora 5)
      // Acepta solo 10 dígitos numéricos
      // =========================================
      if (!/^[0-9]{10}$/.test(celular)) {
        respuesta.textContent = "El celular debe tener 10 números";
        return;
      }

      // Validación del mensaje
      if (mensaje.length < 10) {
        respuesta.textContent = "El mensaje debe tener mínimo 10 caracteres";
        return;
      }

      // Mensaje de éxito
      respuesta.textContent = "Formulario enviado correctamente";

      // Limpiamos el formulario
      formulario.reset();

    });

  }

});