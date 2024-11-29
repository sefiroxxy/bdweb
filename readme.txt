1- https://www.mongodb.com/try/download/community
   + Mongo compass si no lo tienen
2- Crear un directorio para todas las bases de datos mongodb
3- Copiar esa direccion
4- Ir donde esta instalado el mongodb => C:\Program Files\MongoDB\Server\8.0\bin>mongod
5- C:\Program Files\MongoDB\Server\8.0\bin>mongod --dbpath <Direccion copiada>
6- Abrir mongo compass
7- Ir a server en cmd y ejecutar node seed.js

Para iniciar por 1er vez;
1- Descargar e instalar mongoDB 
2- Crear un directorio vacio, copiar su ruta.
3- Navegar al bin de mongoDB y ejecutar; mongod --dbpath <Ruta copiada>
Con archivos de git;
4- npm run dev // Dentro de client
5- npm start en // Dentro de server
6- node seed.js // Dentro de server
7- http://localhost:5173/ // Dentro de browser