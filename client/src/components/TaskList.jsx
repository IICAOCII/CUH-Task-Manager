function getStatusClass(status) {
  if (status === "Completada") return "status-completed";
  if (status === "En progreso") return "status-progress";
  return "status-pending";
}

function TaskList({ tasks, hasTasks, hasError, loading, onEdit, onDelete }) {
  if (loading) {
    return <div className="empty-state" role="status">Cargando tareas...</div>;
  }

  if (tasks.length === 0) {
    return (
      <div className="empty-state" role="status">
        <span className="empty-icon" aria-hidden="true">{hasError ? "!" : hasTasks ? "⌕" : "✦"}</span>
        <h3>{hasError ? "No se pudo cargar la lista" : hasTasks ? "No encontramos resultados" : "Tu espacio está listo"}</h3>
        <p>{hasError ? "Revisa la conexión con el servidor e inténtalo de nuevo." : hasTasks ? "Prueba con otra búsqueda o cambia el filtro de estado." : "Agrega tu primera tarea y empieza a organizar tus entregas."}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="task-grid">
        {tasks.map((task) => (
          <article className="task-card" key={task._id}>
            <div className="task-card-top">
              <span className={`status ${getStatusClass(task.status)}`}>
                {task.status}
              </span>
            </div>

            <h3>{task.title}</h3>

            <p className="task-subject">{task.subject}</p>

            {task.description && (
              <p className="task-description">
                {task.description}
              </p>
            )}

            <div className="task-date">
              <span>Fecha de entrega</span>
              <strong>
                {new Date(task.dueDate).toLocaleDateString("es-MX", { timeZone: "UTC" })}
              </strong>
            </div>

            <div className="task-actions">
              <button
                className="button button-secondary"
                aria-label={`Editar ${task.title}`}
                onClick={() => onEdit(task)}
              >
                Editar
              </button>

              <button
                className="button button-danger"
                aria-label={`Eliminar ${task.title}`}
                onClick={() => onDelete(task._id)}
              >
                Eliminar
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default TaskList;
