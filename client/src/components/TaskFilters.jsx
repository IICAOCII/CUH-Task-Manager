function TaskFilters({ search, onSearchChange, statusFilter, onStatusChange }) {
  return (
    <div className="task-filters">
      <label className="search-field">
        <span className="search-icon" aria-hidden="true">⌕</span>
        <span className="sr-only">Buscar tareas</span>
        <input
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Buscar tarea o materia"
        />
      </label>
      <label className="filter-select">
        <span className="sr-only">Filtrar por estado</span>
        <select value={statusFilter} onChange={(event) => onStatusChange(event.target.value)}>
          <option value="Todas">Todos los estados</option>
          <option value="Pendiente">Pendiente</option>
          <option value="En progreso">En progreso</option>
          <option value="Completada">Completada</option>
        </select>
      </label>
    </div>
  );
}

export default TaskFilters;
