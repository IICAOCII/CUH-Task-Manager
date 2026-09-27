# Guion del video demostrativo

Duración máxima: 10 minutos.

## 0:00 - 0:45 | Problema

Explicar el problema de organización de tareas académicas y presentar CUH Task Manager.

## 0:45 - 1:30 | Objetivo y alcance

Explicar usuarios, objetivo y funcionalidades principales.

## 1:30 - 2:15 | Arquitectura

Mostrar:

Usuario → React → API REST → Express → MongoDB

## 2:15 - 3:00 | Docker

Ejecutar:

```bash
docker compose up --build
```

Después:

```bash
docker compose ps
```

## 3:00 - 4:00 | Frontend

Mostrar la interfaz y crear una tarea.

## 4:00 - 5:00 | Consulta

Mostrar la tarea registrada y explicar que los datos vienen de la API.

## 5:00 - 6:00 | Actualización

Editar el estado o información de una tarea.

## 6:00 - 7:00 | Eliminación

Eliminar una tarea.

## 7:00 - 8:00 | API REST

Mostrar GET, POST, PUT y DELETE mediante el navegador o una herramienta como Thunder Client.

## 8:00 - 8:45 | Persistencia

Mostrar una tarea, ejecutar:

```bash
docker compose down
docker compose up
```

y comprobar que continúa disponible.

## 8:45 - 9:30 | Código

Mostrar brevemente:

- componentes React
- services
- routes
- controllers
- model
- Dockerfile
- docker-compose.yml

## 9:30 - 10:00 | GitHub

Mostrar el repositorio, commits progresivos y README.
