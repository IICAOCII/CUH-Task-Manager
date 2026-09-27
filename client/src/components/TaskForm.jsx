import { useEffect, useState } from "react";

const emptyForm = {
  title: "",
  description: "",
  subject: "",
  dueDate: "",
  status: "Pendiente"
};

function TaskForm({ editingTask, onTaskSaved, onCancelEdit }) {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!editingTask) {
      setForm(emptyForm);
      return;
    }

    setForm({
      title: editingTask.title || "",
      description: editingTask.description || "",
      subject: editingTask.subject || "",
      dueDate: editingTask.dueDate
        ? editingTask.dueDate.substring(0, 10)
        : "",
      status: editingTask.status || "Pendiente"
    });
  }, [editingTask]);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (form.title.trim().length < 3 || form.title.trim().length > 100) {
      setError("El título debe contener entre 3 y 100 caracteres.");
      return;
    }

    if (form.subject.trim().length < 2 || form.subject.trim().length > 80) {
      setError("La materia debe contener entre 2 y 80 caracteres.");
      return;
    }

    if (!form.dueDate) {
      setError("La fecha de entrega es obligatoria.");
      return;
    }

    try {
      setSaving(true);
      await onTaskSaved(form);
      setForm(emptyForm);
    } catch (error) {
      setError(
        error.response?.data?.message ||
        "No se pudo guardar la tarea."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <div>
          <span className="eyebrow">
            {editingTask ? "Actualización" : "Nueva actividad"}
          </span>
          <h3>{editingTask ? "Editar tarea" : "Registrar tarea"}</h3>
        </div>

        {editingTask && (
          <button
            type="button"
            className="button button-light"
            onClick={onCancelEdit}
          >
            Cancelar
          </button>
        )}
      </div>

      <div className="form-grid">
        <label>
          Título *
          <input
            name="title"
            required
            value={form.title}
            onChange={handleChange}
            placeholder="Ej. Proyecto de bases de datos"
            maxLength="100"
          />
        </label>

        <label>
          Materia *
          <input
            name="subject"
            required
            value={form.subject}
            onChange={handleChange}
            placeholder="Ej. Programación Web"
            maxLength="80"
          />
        </label>

        <label className="full-width">
          Descripción
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Describe brevemente la actividad..."
            maxLength="500"
          />
        </label>

        <label>
          Fecha de entrega *
          <input
            type="date"
            name="dueDate"
            required
            value={form.dueDate}
            onChange={handleChange}
          />
        </label>

        <label>
          Estado
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option value="Pendiente">Pendiente</option>
            <option value="En progreso">En progreso</option>
            <option value="Completada">Completada</option>
          </select>
        </label>
      </div>

      {error && <p className="error-message" role="alert">{error}</p>}

      <button className="button button-primary" type="submit" disabled={saving}>
        {saving ? "Guardando…" : editingTask ? "Guardar cambios" : "Agregar tarea"}
      </button>
    </form>
  );
}

export default TaskForm;
