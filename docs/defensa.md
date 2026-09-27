# Preguntas para la defensa

## React

### ¿Por qué utilizaste componentes?
Para separar responsabilidades y facilitar la reutilización y mantenimiento del frontend.

### ¿Cómo obtiene React las tareas?
A través de peticiones HTTP realizadas con Axios hacia la API REST.

## API REST

### ¿Qué es una API REST?
Es una interfaz que permite que diferentes componentes se comuniquen mediante HTTP utilizando recursos y métodos como GET, POST, PUT y DELETE.

### ¿Qué hace GET?
Consulta información.

### ¿Qué hace POST?
Crea un nuevo recurso.

### ¿Qué hace PUT?
Actualiza un recurso existente.

### ¿Qué hace DELETE?
Elimina un recurso.

## Backend

### ¿Qué función tiene Express?
Gestiona las solicitudes HTTP, las rutas, las respuestas y la lógica de la API.

### ¿Por qué existe un controller?
Para separar la lógica de procesamiento de las rutas.

## MongoDB

### ¿Por qué utilizar MongoDB?
Permite almacenar persistentemente los documentos de las tareas y trabajar con ellos mediante Mongoose.

### ¿Qué hace Mongoose?
Proporciona una capa de modelado y validación para interactuar con MongoDB desde Node.js.

## Docker

### ¿Qué es una imagen?
Es una plantilla inmutable a partir de la cual se crean contenedores.

### ¿Qué es un contenedor?
Es una instancia ejecutable de una imagen.

### ¿Qué hace Docker Compose?
Define y coordina varios servicios que forman una aplicación.

### ¿Por qué existe un volumen?
Para conservar los datos de MongoDB fuera del ciclo de vida del contenedor.

### ¿Por qué el backend usa `mongodb://mongo:27017/...`?
Porque `mongo` es el nombre del servicio dentro de la red de Docker Compose.

### ¿Por qué el frontend utiliza `localhost:3000`?
Porque la petición a la API se realiza desde el navegador del usuario. El puerto 3000 del contenedor backend está publicado en el equipo host.

## Git

### ¿Por qué realizar varios commits?
Para mostrar la evolución del desarrollo y facilitar el seguimiento de cambios.
