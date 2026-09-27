import { useEffect, useMemo, useState } from "react";

import TaskFilters from "./components/TaskFilters";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskSummary from "./components/TaskSummary";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask
} from "./services/taskService";

function normalizeText(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("es-MX");
}

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todas");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadTasks() {
    try {
      setLoading(true);
      setError("");
      const response = await getTasks();
      setTasks(response.data);
    } catch (requestError) {
      console.error(requestError);
      setError("No se pudo conectar con el servidor. Comprueba que los servicios estén iniciados e inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  const filteredTasks = useMemo(() => {
    const query = normalizeText(search.trim());

    return tasks.filter((task) => {
      const matchesStatus = statusFilter === "Todas" || task.status === statusFilter;
      const searchableText = normalizeText(
        `${task.title} ${task.subject} ${task.description || ""}`
      );

      return matchesStatus && searchableText.includes(query);
    });
  }, [tasks, search, statusFilter]);

  async function handleTaskSaved(taskData) {
    if (editingTask) {
      await updateTask(editingTask._id, taskData);
      setEditingTask(null);
    } else {
      await createTask(taskData);
    }

    await loadTasks();
  }

  function handleEdit(task) {
    setEditingTask(task);
    document.getElementById("formulario")?.scrollIntoView({ behavior: "smooth" });
  }

  async function handleDelete(id) {
    if (!window.confirm("¿Seguro que deseas eliminar esta tarea?")) return;

    try {
      setError("");
      await deleteTask(id);

      if (editingTask?._id === id) {
        setEditingTask(null);
      }

      await loadTasks();
    } catch (requestError) {
      console.error(requestError);
      setError(requestError.response?.data?.message || "No se pudo eliminar la tarea.");
    }
  }

  return (
    <div className="app-shell" id="inicio">
      <header className="site-header">
        <nav className="navigation" aria-label="Navegación principal">
          <a className="brand" href="#inicio" aria-label="CUH Task Manager, inicio">
            <span className="brand-mark">CUH</span>
            <span>Task Manager</span>
          </a>
          <div className="nav-links">
            <a href="#resumen">Resumen</a>
            <a href="#tareas">Mis tareas</a>
          </div>
          <a className="button button-nav" href="#formulario">
            <span aria-hidden="true">＋</span> Nueva tarea
          </a>
        </nav>
      </header>

      <main>
        <section className="hero">
          <div className="hero-content">
            <p className="eyebrow hero-eyebrow">Centro Universitario Hidalguense</p>
            <h1>Tus pendientes,<br /><span>en orden.</span></h1>
            <p className="hero-copy">
              Reúne tus actividades, fechas de entrega y avances académicos en un solo lugar.
            </p>
            <a className="hero-link" href="#tareas">Ver mis tareas <span aria-hidden="true">↓</span></a>
          </div>
          <div className="hero-decoration" aria-hidden="true">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="hero-note">
              <span className="note-check">✓</span>
              <span><strong>Un paso a la vez</strong><small>Avanza a tu ritmo</small></span>
            </div>
          </div>
        </section>

        <div className="page-content">
          <section id="resumen" className="summary-section" aria-label="Resumen de tareas">
            <div className="section-intro">
              <div>
                <p className="eyebrow">Tu semana académica</p>
                <h2>Resumen</h2>
              </div>
              <span className="live-label"><span /> Datos actualizados</span>
            </div>
            <TaskSummary tasks={tasks} />
          </section>

          <section id="formulario" className="form-section">
            <div className="form-aside">
              <p className="eyebrow">Planifica tu avance</p>
              <h2>{editingTask ? "Actualiza tu tarea" : "¿Qué tienes pendiente?"}</h2>
              <p>Agrega los detalles para tener clara tu próxima entrega.</p>
              <div className="aside-tip"><span aria-hidden="true">✦</span> Una buena planificación empieza con una tarea.</div>
            </div>
            <TaskForm
              editingTask={editingTask}
              onTaskSaved={handleTaskSaved}
              onCancelEdit={() => setEditingTask(null)}
            />
          </section>

          <section id="tareas" className="tasks-section">
            <div className="tasks-heading">
              <div>
                <p className="eyebrow">Seguimiento académico</p>
                <h2>Mis tareas <span className="heading-count">{tasks.length}</span></h2>
              </div>
              <TaskFilters
                search={search}
                onSearchChange={setSearch}
                statusFilter={statusFilter}
                onStatusChange={setStatusFilter}
              />
            </div>

            {error && (
              <div className="alert" role="alert">
                <span>{error}</span>
                <button className="button button-retry" onClick={loadTasks}>Reintentar</button>
              </div>
            )}

            <TaskList
              tasks={filteredTasks}
              hasTasks={tasks.length > 0}
              hasError={Boolean(error)}
              loading={loading}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </section>
        </div>
      </main>

      <footer className="site-footer">
        <span className="footer-brand"><span className="brand-mark">CUH</span> Task Manager</span>
        <span>Organiza hoy. Avanza cada día.</span>
      </footer>
    </div>
  );
}

export default App;
