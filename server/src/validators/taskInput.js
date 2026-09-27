const allowedStatuses = ["Pendiente", "En progreso", "Completada"];
const allowedFields = new Set([
  "title",
  "description",
  "subject",
  "dueDate",
  "status"
]);

function validateTaskInput(input) {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return "Envía los datos de la tarea en formato JSON.";
  }

  const unknownField = Object.keys(input).find((field) => !allowedFields.has(field));
  if (unknownField) {
    return `El campo "${unknownField}" no está permitido.`;
  }

  if (!input.title || !input.subject || !input.dueDate) {
    return "Título, materia y fecha de entrega son obligatorios.";
  }

  if (typeof input.title !== "string" || input.title.trim().length < 3 || input.title.trim().length > 100) {
    return "El título debe contener entre 3 y 100 caracteres.";
  }

  if (typeof input.subject !== "string" || input.subject.trim().length < 2 || input.subject.trim().length > 80) {
    return "La materia debe contener entre 2 y 80 caracteres.";
  }

  if (input.description !== undefined && (typeof input.description !== "string" || input.description.length > 500)) {
    return "La descripción debe ser texto de hasta 500 caracteres.";
  }

  const dateOnly = typeof input.dueDate === "string" && /^\d{4}-\d{2}-\d{2}$/.test(input.dueDate);
  const parsedDate = dateOnly ? new Date(`${input.dueDate}T00:00:00.000Z`) : new Date(input.dueDate);
  const isInvalidDate =
    typeof input.dueDate !== "string" ||
    Number.isNaN(parsedDate.getTime()) ||
    (dateOnly && parsedDate.toISOString().slice(0, 10) !== input.dueDate);

  if (isInvalidDate) {
    return "La fecha de entrega no es válida.";
  }

  if (input.status !== undefined && !allowedStatuses.includes(input.status)) {
    return "El estado debe ser Pendiente, En progreso o Completada.";
  }

  return null;
}

module.exports = { validateTaskInput };
