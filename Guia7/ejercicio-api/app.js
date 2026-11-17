const urlApi = "https://free-to-play-games-database.p.rapidapi.com/api";
const claveApi = "d40fafab12mshc7ee385471e1391p1b6b4ajsn6f1e8e8ad99f";
const btnCargar = document.getElementById("btnCargar");
const listaJuegos = document.getElementById("listaJuegos");
const detalleJuego = document.getElementById("detalleJuego");
const estadoListado = document.getElementById("estadoListado");
const estadoDetalle = document.getElementById("estadoDetalle");
const panelDetalle = document.getElementById("panelDetalle");

const limpiarElemento = function (elemento) {
    while (elemento.hasChildNodes()) {
        elemento.removeChild(elemento.firstChild);
    }
};

const mostrarEstado = function (elemento, mensaje, error = false) {
    elemento.textContent = mensaje;
    elemento.className = error ? "error" : "";
};

const consultarApi = async function (ruta) {
    const options = {
        method: "GET",
        headers: {
            "x-rapidapi-key": claveApi,
            "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com"
        }
    };

    const response = await fetch(`${urlApi}${ruta}`, options);

    if (!response.ok) {
        if (response.status == 401 || response.status == 403) {
            throw new Error("Verifica tu clave y el acceso a esta API en RapidAPI.");
        }
        if (response.status == 429) {
            throw new Error("Se alcanzó el límite de consultas. Inténtalo más tarde.");
        }
        if (response.status == 404) {
            throw new Error("No se encontró el recurso solicitado.");
        }
        throw new Error(`La API no pudo completar la consulta (código ${response.status}).`);
    }

    return await response.json();
};

const crearTarjeta = function (juego) {
    const tarjeta = document.createElement("article");
    tarjeta.setAttribute("class", "tarjeta");

    const imagen = document.createElement("img");
    imagen.src = juego.thumbnail;
    imagen.alt = juego.title;
    imagen.loading = "lazy";

    const contenido = document.createElement("div");
    contenido.setAttribute("class", "tarjeta-contenido");
    const titulo = document.createElement("h3");
    titulo.textContent = juego.title;
    const genero = document.createElement("p");
    genero.textContent = `${juego.genre} · ${juego.platform}`;
    const descripcion = document.createElement("p");
    descripcion.textContent = juego.short_description;
    const boton = document.createElement("button");
    boton.type = "button";
    boton.textContent = "Ver detalles";
    boton.setAttribute("aria-label", `Ver detalles de ${juego.title}`);
    boton.onclick = () => cargarDetalle(juego.id);

    contenido.appendChild(titulo);
    contenido.appendChild(genero);
    contenido.appendChild(descripcion);
    contenido.appendChild(boton);
    tarjeta.appendChild(imagen);
    tarjeta.appendChild(contenido);
    listaJuegos.appendChild(tarjeta);
};

const mostrarDetalle = function (juego) {
    const imagen = document.createElement("img");
    imagen.setAttribute("class", "imagen-detalle");
    imagen.src = juego.thumbnail;
    imagen.alt = juego.title;
    const titulo = document.createElement("h3");
    titulo.textContent = juego.title;
    const descripcion = document.createElement("p");
    descripcion.setAttribute("class", "descripcion");
    descripcion.textContent = juego.description;
    const datos = document.createElement("dl");

    const informacion = [
        ["Género", juego.genre],
        ["Plataforma", juego.platform],
        ["Desarrollador", juego.developer],
        ["Distribuidor", juego.publisher],
        ["Fecha de lanzamiento", juego.release_date],
        ["Estado", juego.status]
    ];

    for (const [nombre, valor] of informacion) {
        const etiqueta = document.createElement("dt");
        etiqueta.textContent = nombre;
        const contenido = document.createElement("dd");
        contenido.textContent = valor || "No disponible";
        datos.appendChild(etiqueta);
        datos.appendChild(contenido);
    }

    detalleJuego.appendChild(imagen);
    detalleJuego.appendChild(titulo);
    detalleJuego.appendChild(datos);
    detalleJuego.appendChild(descripcion);

    if (juego.game_url && juego.game_url.startsWith("https://")) {
        const enlace = document.createElement("a");
        enlace.textContent = "Visitar el juego";
        enlace.href = juego.game_url;
        enlace.target = "_blank";
        enlace.rel = "noopener noreferrer";
        enlace.setAttribute("class", "enlace-juego");
        detalleJuego.appendChild(enlace);
    }
};

const cambiarCarga = function (cargando) {
    btnCargar.disabled = cargando;
    const botones = listaJuegos.querySelectorAll("button");
    for (const boton of botones) {
        boton.disabled = cargando;
    }
};

const cargarJuegos = async function () {
    limpiarElemento(listaJuegos);
    limpiarElemento(detalleJuego);
    mostrarEstado(estadoListado, "Cargando juegos…");
    mostrarEstado(estadoDetalle, "");
    cambiarCarga(true);

    try {
        const juegos = await consultarApi("/games?platform=browser&category=mmorpg&sort-by=release-date");
        if (!Array.isArray(juegos)) {
            throw new Error("La API no devolvió una lista de juegos válida.");
        }
        for (const juego of juegos) {
            crearTarjeta(juego);
        }
        mostrarEstado(estadoListado, juegos.length > 0
            ? `${juegos.length} juegos encontrados.`
            : "No se encontraron juegos con estos filtros.");
    } catch (error) {
        mostrarEstado(estadoListado, `No se pudo cargar el listado. ${error.message} Comprueba tu conexión e inténtalo nuevamente.`, true);
    } finally {
        cambiarCarga(false);
    }
};

const cargarDetalle = async function (id) {
    limpiarElemento(detalleJuego);
    mostrarEstado(estadoDetalle, "Cargando detalles…");
    cambiarCarga(true);

    panelDetalle.showModal();

    try {
        const juego = await consultarApi(`/game?id=${encodeURIComponent(id)}`);
        if (!juego || !juego.id || !juego.title) {
            throw new Error("La API no devolvió los detalles del juego.");
        }
        mostrarDetalle(juego);
        mostrarEstado(estadoDetalle, "Detalles cargados.");
    } catch (error) {
        mostrarEstado(estadoDetalle, `No se pudieron cargar los detalles. ${error.message} Puedes seleccionar el juego nuevamente.`, true);
    } finally {
        cambiarCarga(false);
    }
};

btnCargar.addEventListener("click", cargarJuegos);

cargarJuegos();
