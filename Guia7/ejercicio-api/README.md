# Juegos gratuitos

Ejercicio 2 de la parte IV de la Guía 7. Aplicación con HTML, CSS y JavaScript que consulta FreeToGame mediante RapidAPI.

## Uso

1. Abre `index.html` en el navegador o mediante Live Server.
2. El listado de juegos se carga automáticamente.
3. Pulsa «Ver detalles» para consultar el juego seleccionado sin recargar la página.
4. Usa «Actualizar juegos» para volver a consultar el listado o reintentar si ocurre un error.

La clave de RapidAPI está configurada en `app.js`.

## Endpoints

- Listado: `https://free-to-play-games-database.p.rapidapi.com/api/games?platform=browser&category=mmorpg&sort-by=release-date`
- Detalle: `https://free-to-play-games-database.p.rapidapi.com/api/game?id=ID_DEL_JUEGO`

Las consultas utilizan Fetch API con `async/await`. La página informa cuándo está cargando, cuando no hay resultados y cuando ocurre un error.

Datos: [FreeToGame](https://www.freetogame.com/).
API: [Free-to-Play Games Database en RapidAPI](https://rapidapi.com/digiwalls/api/free-to-play-games-database).
