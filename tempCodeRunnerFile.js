// ==========================================================================
// LÓGICA E INTERACTIVIDAD EN JAVASCRIPT: NEXUS
// ==========================================================================

document.addEventListener("DOMContentLoaded", function () {

  // 1. Mensaje de bienvenida emergente (alert)
  alert("¡Bienvenido al sitio oficial de Nexus!");

  // 2. Reloj dinámico en tiempo real (Formato de 12 horas)
  function actualizarReloj() {
    const ahora = new Date();
    let horas = ahora.getHours();
    const minutos = String(ahora.getMinutes()).padStart(2, '0');
    const segundos = String(ahora.getSeconds()).padStart(2, '0');
    const ampm = horas >= 12 ? 'PM' : 'AM';

    horas = horas % 12;
    horas = horas ? horas : 12; // Transforma hora '0' en '12'
    const horasFormateadas = String(horas).padStart(2, '0');

    const elementoReloj = document.getElementById("reloj");
    if (elementoReloj) {
      elementoReloj.textContent = `${horasFormateadas}:${minutos}:${segundos} ${ampm}`;
    }
  }

  // Actualización continua cada 1000ms (1 segundo)
  setInterval(actualizarReloj, 1000);
  actualizarReloj(); // Ejecución inicial inmediata

  // 3. Detección de selección en menú desplegable (<select>)
  const selectServicio = document.getElementById("servicio");
  if (selectServicio) {
    selectServicio.addEventListener("change", function (e) {
      const opcionSeleccionada = e.target.options[e.target.selectedIndex].text;
      if (e.target.value !== "") {
        console.log(`[Evento Select] El usuario eligió: ${opcionSeleccionada}`);
      }
    });
  }

  // 4. Detección de eventos del mouse (mouseover / mouseleave) en botones
  const botones = document.querySelectorAll(".boton, button");
  botones.forEach(boton => {
    boton.addEventListener("mouseover", function () {
      console.log(`[Mouseover] Puntero sobre el botón: ${this.textContent.trim()}`);
    });

    boton.addEventListener("mouseleave", function () {
      console.log(`[Mouseleave] Puntero fuera del botón: ${this.textContent.trim()}`);
    });
  });

  // 5, 6 y 7. Validación del formulario, alerta de confirmación y LocalStorage
  const formulario = document.getElementById("formularioContacto");
  if (formulario) {
    formulario.addEventListener("submit", function (e) {
      e.preventDefault(); // Detiene el envío por defecto del navegador

      const nombre = document.getElementById("nombre").value.trim();
      const email = document.getElementById("email").value.trim();
      const telefono = document.getElementById("telefono").value.trim();
      const servicio = document.getElementById("servicio").value;
      const mensaje = document.getElementById("mensaje").value.trim();

      // Validación de campos vacíos
      if (!nombre || !email || !servicio || !mensaje) {
        alert("Por favor, completa todos los campos requeridos.");
        return;
      }

      // Estructura JSON para registro
      const datosRegistro = {
        nombre: nombre,
        email: email,
        telefono: telefono,
        servicio: servicio,
        mensaje: mensaje,
        fecha: new Date().toLocaleString()
      };

      // Guardar información en localStorage mediante JSON.stringify()
      localStorage.setItem("registroContactoNexus", JSON.stringify(datosRegistro));

      // Mensaje interactivo de confirmación
      alert(`¡Gracias por contactarnos, ${nombre}! Tus datos han sido guardados exitosamente.`);

      // Limpiar los campos del formulario
      formulario.reset();
    });
  }
});
