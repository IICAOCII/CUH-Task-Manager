const summaries = [
  { label: "Por hacer", status: "Pendiente", className: "summary-pending" },
  { label: "En progreso", status: "En progreso", className: "summary-progress" },
  { label: "Completadas", status: "Completada", className: "summary-completed" }
];

function TaskSummary({ tasks }) {
  return (
    <div className="summary-grid">
      <article className="summary-card summary-total">
        <span className="summary-icon" aria-hidden="true">▤</span>
        <span className="summary-label">Total de tareas</span>
        <strong>{tasks.length}</strong>
        <span className="summary-footnote">En tu lista académica</span>
      </article>
      {summaries.map(({ label, status, className }) => {
        const count = tasks.filter((task) => task.status === status).length;
        return (
          <article className={`summary-card ${className}`} key={status}>
            <span className="summary-icon" aria-hidden="true">
              {status === "Pendiente" ? "◷" : status === "En progreso" ? "↗" : "✓"}
            </span>
            <span className="summary-label">{label}</span>
            <strong>{count}</strong>
            <span className="summary-footnote">{count === 1 ? "actividad" : "actividades"}</span>
          </article>
        );
      })}
    </div>
  );
}

export default TaskSummary;
