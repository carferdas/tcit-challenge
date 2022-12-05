# TCIT Challenge

Instrucciones para desplegar la aplicación con Docker (requerido):

1. Clonar este repositorio.
2. Copiar los archivos ```.env.example``` de las carpetas frontend y backend a ```.env``` dentro de sus carpetas.
3. Ejecutar el siguiente comando para levantar el backend, frontend y la base de datos:
```
docker compose --env-file ./backend/.env up --build -d
```
4. Acceder al navegador mediante la url: [http://localhost:3000](http://localhost:3000)