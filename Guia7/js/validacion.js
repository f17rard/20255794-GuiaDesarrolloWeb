(() => {
    const contarElementosFormulario = button.onclick;
    const tituloModal = document.getElementById("modalLabel");
    const buttonContar = document.getElementById("idBtnContarElementos");

    buttonContar.onclick = () => {
        tituloModal.textContent = "Elementos del formulario";
        contarElementosFormulario();
    };

    const validarFormulario = function () {
        const elementos = formulario.elements;

        for (let index = 0; index < elementos.length; index++) {
            const elemento = elementos[index];
            if (
                elemento.type == "text" ||
                elemento.type == "date" ||
                elemento.type == "email" ||
                elemento.type == "password" ||
                elemento.type == "file"
            ) {
                if (elemento.value.trim() == "") {
                    const etiqueta = document.querySelector(`label[for="${elemento.id}"]`);
                    alert(`Complete el campo: ${etiqueta.textContent.trim()}`);
                    elemento.focus();
                    return false;
                }
            }
        }

        const fechaNacimiento = document.getElementById("idFechaNac");
        const fechaActual = new Date();
        const hoy = `${fechaActual.getFullYear()}-${String(fechaActual.getMonth() + 1).padStart(2, "0")}-${String(fechaActual.getDate()).padStart(2, "0")}`;

        if (fechaNacimiento.value > hoy) {
            alert("La fecha de nacimiento no puede superar la fecha actual");
            fechaNacimiento.focus();
            return false;
        }

        const correo = document.getElementById("idCorreo");
        const expresionCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!expresionCorreo.test(correo.value.trim())) {
            alert("Ingrese un correo electrónico válido");
            correo.focus();
            return false;
        }

        const password = document.getElementById("idPassword");
        const repetirPassword = document.getElementById("idPasswordRepetir");
        if (password.value != repetirPassword.value) {
            alert("Las contraseñas deben ser iguales");
            repetirPassword.focus();
            return false;
        }

        if (formulario.querySelectorAll('input[type="checkbox"]:checked').length == 0) {
            alert("Seleccione al menos un interés");
            document.getElementById("idCkProgramacion").focus();
            return false;
        }

        if (!formulario.querySelector('input[name="idRdCarrera"]:checked')) {
            alert("Seleccione una carrera");
            document.getElementById("idRdIng").focus();
            return false;
        }

        const pais = document.getElementById("idCmPais");
        if (pais.selectedIndex == 0) {
            alert("Seleccione un país de origen");
            pais.focus();
            return false;
        }

        return true;
    };

    const mostrarInformacion = function () {
        while (bodyModal.hasChildNodes()) {
            bodyModal.removeChild(bodyModal.firstChild);
        }

        const tabla = document.createElement("table");
        tabla.setAttribute("class", "table table-bordered");
        const encabezado = document.createElement("thead");
        const filaEncabezado = document.createElement("tr");

        for (const texto of ["Campo", "Información"]) {
            const celda = document.createElement("th");
            celda.setAttribute("scope", "col");
            celda.appendChild(document.createTextNode(texto));
            filaEncabezado.appendChild(celda);
        }

        encabezado.appendChild(filaEncabezado);
        tabla.appendChild(encabezado);
        const cuerpo = document.createElement("tbody");
        const elementos = formulario.elements;

        for (let index = 0; index < elementos.length; index++) {
            const elemento = elementos[index];
            if (elemento.type == "button" || elemento.type == "submit") {
                continue;
            }
            if ((elemento.type == "checkbox" || elemento.type == "radio") && !elemento.checked) {
                continue;
            }

            const etiqueta = document.querySelector(`label[for="${elemento.id}"]`);
            let campo = etiqueta.textContent.trim();
            let valor = elemento.value;

            if (elemento.type == "checkbox") {
                campo = "Interés";
                valor = etiqueta.textContent.trim();
            } else if (elemento.type == "radio") {
                campo = "Carrera";
                valor = etiqueta.textContent.trim();
            } else if (elemento.nodeName == "SELECT") {
                valor = elemento.options[elemento.selectedIndex].textContent;
            } else if (elemento.type == "file") {
                valor = elemento.files[0].name;
            }

            const fila = document.createElement("tr");
            const celdaCampo = document.createElement("th");
            celdaCampo.setAttribute("scope", "row");
            celdaCampo.appendChild(document.createTextNode(campo));
            const celdaValor = document.createElement("td");
            celdaValor.appendChild(document.createTextNode(valor));
            fila.appendChild(celdaCampo);
            fila.appendChild(celdaValor);
            cuerpo.appendChild(fila);
        }

        tabla.appendChild(cuerpo);
        bodyModal.appendChild(tabla);
        tituloModal.textContent = "Información del registro";
        modal.show();
    };

    button.onclick = () => {
        if (validarFormulario()) {
            mostrarInformacion();
        }
    };

    formulario.addEventListener("submit", (event) => {
        event.preventDefault();
        button.onclick();
    });
})();
