# CUH Task Manager

Aplicación web Full Stack para organizar tareas académicas. Permite registrar entregas, consultar el avance por estado, buscar por texto y editar o eliminar tareas. Los datos se guardan en MongoDB y la aplicación puede ejecutarse con Docker Compose.

## Problema y objetivo

Los estudiantes pueden perder de vista actividades, materias y fechas de entrega cuando la información se reparte entre apuntes y plataformas. CUH Task Manager concentra esos datos en una lista consultable y persistente.

El objetivo es ayudar a estudiantes a mantener sus actividades académicas organizadas desde una interfaz web sencilla.

## Usuarios y alcance

El usuario principal es el estudiante que necesita registrar y dar seguimiento a sus tareas. La aplicación administra título, descripción, materia, fecha de entrega y estado.

Incluye creación, consulta, edición y eliminación de tareas, validación de datos, búsqueda, filtros por estado, contadores, manejo de errores, persistencia y ejecución contenerizada. No incluye inicio de sesión, notificaciones ni sincronización con calendarios externos.

## Tecnologías y arquitectura

- React y Vite para el frontend.
- Node.js y Express para la API REST.
- MongoDB y Mongoose para persistencia y validación.
- Axios para las peticiones HTTP.
- Docker y Docker Compose para ejecutar los servicios.

```text
Estudiante → React en el navegador → API REST de Express → MongoDB
```

Compose define tres servicios: `client`, `server` y `mongo`. El navegador usa la URL pública del backend; el backend se conecta a MongoDB mediante el nombre del servicio `mongo` en la red de Compose.

## Entidad principal

| Campo | Tipo | Regla |
|---|---|---|
| `_id` | ObjectId | Identificador generado por MongoDB |
| `title` | String | Obligatorio, de 3 a 100 caracteres |
| `description` | String | Opcional, hasta 500 caracteres |
| `subject` | String | Obligatorio, de 2 a 80 caracteres |
| `dueDate` | Date | Obligatorio, fecha válida |
| `status` | String | `Pendiente`, `En progreso` o `Completada` |
| `createdAt`, `updatedAt` | Date | Marcas de tiempo automáticas |

## Estructura

```text
client/
  src/components/     Formulario, filtros, resumen y lista de tareas
  src/services/       Cliente HTTP de la API
  src/App.jsx         Página principal y estado de la aplicación
  Dockerfile
server/
  src/config/         Conexión a MongoDB
  src/controllers/    Lógica de las operaciones CRUD
  src/models/         Esquema de la tarea
  src/routes/         Rutas REST
  src/validators/     Validación del cuerpo de las solicitudes
  Dockerfile
docs/
  defensa.md          Preguntas para preparar la defensa
  guion-video.md      Guion para la demostración
docker-compose.yml
.env.example
```

## API REST

Base URL local: `http://localhost:3000/api`

| Método | Ruta | Resultado |
|---|---|---|
| GET | `/tasks` | Lista las tareas, de la más reciente a la más antigua |
| GET | `/tasks/:id` | Consulta una tarea por identificador |
| POST | `/tasks` | Crea una tarea |
| PUT | `/tasks/:id` | Actualiza una tarea |
| DELETE | `/tasks/:id` | Elimina una tarea |
| GET | `/health` | Comprueba que la API responde y MongoDB se conectó |

Ejemplo del cuerpo para crear o actualizar una tarea:

```json
{
  "title": "Proyecto de bases de datos",
  "description": "Preparar el modelo y la documentación",
  "subject": "Programación Web",
  "dueDate": "2026-10-15",
  "status": "Pendiente"
}
```

Las solicitudes inválidas reciben un mensaje JSON comprensible. La API devuelve `400` para datos o identificadores inválidos, `404` para recursos inexistentes y `500` cuando ocurre un error interno.

## Ejecución con Docker Compose

Requisitos: Docker Desktop con Docker Compose habilitado.

Desde la raíz:

```bash
docker compose up --build
```

Abre `http://localhost:8080`. La API está disponible en `http://localhost:3000/api/health`. Para comprobar el estado de los servicios:

```bash
docker compose ps
```

Para detenerlos y volver a iniciarlos:

```bash
docker compose down
docker compose up
```

MongoDB guarda sus archivos en el volumen nombrado `mongo_data`. Para comprobar la persistencia, crea una tarea, ejecuta `docker compose down` y después `docker compose up`; la tarea debe seguir disponible. No uses `docker compose down -v` en esta comprobación porque esa opción elimina el volumen.

Los servicios tienen healthchecks. Compose espera a que MongoDB esté disponible antes de iniciar el backend y a que el backend responda antes de iniciar el frontend.

## Variables de entorno

Compose funciona con los valores predeterminados. Si quieres cambiar los puertos o la URL de la API, copia `.env.example` a `.env` en la raíz y edita esos valores:

| Variable | Predeterminado | Uso |
|---|---|---|
| `CLIENT_PORT` | `8080` | Puerto del frontend en el equipo |
| `SERVER_PORT` | `3000` | Puerto de la API en el equipo |
| `DATABASE_URL` | `mongodb://mongo:27017/cuh_tasks` | Conexión del backend a MongoDB dentro de Compose |
| `VITE_API_URL` | `http://localhost:3000/api` | URL que usa el navegador para llamar a la API |

Si cambias `SERVER_PORT`, actualiza también `VITE_API_URL`. No agregues secretos ni archivos `.env` al repositorio. Los archivos `.env.example` contienen solo valores de ejemplo.

## Desarrollo local sin Docker

Se necesita Node.js y una instancia de MongoDB accesible. En una terminal, configura `server/.env` con `PORT=3000` y `DATABASE_URL=mongodb://localhost:27017/cuh_tasks`, instala dependencias e inicia el backend:

```bash
cd server
npm install
npm run dev
```

En otra terminal, inicia el frontend:

```bash
cd client
npm install
npm run dev
```

Vite muestra en la terminal la dirección local del frontend. Para apuntar a otra API, configura `VITE_API_URL` en `client/.env` antes de iniciar Vite.

## Evidencias y demostración

El guion de [docs/guion-video.md](docs/guion-video.md) cubre Docker, las operaciones CRUD, la persistencia, la API y la estructura del proyecto. [docs/defensa.md](docs/defensa.md) incluye preguntas de preparación. Guarda las capturas auténticas de la aplicación y de `docker compose ps` en `docs/evidencias/` al ejecutar el proyecto para incorporarlas al documento de entrega.
