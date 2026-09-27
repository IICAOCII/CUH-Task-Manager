const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "El título es obligatorio"],
      minlength: [3, "El título debe tener al menos 3 caracteres"],
      maxlength: [100, "El título no puede superar 100 caracteres"],
      trim: true
    },
    description: {
      type: String,
      maxlength: [500, "La descripción no puede superar 500 caracteres"],
      default: "",
      trim: true
    },
    subject: {
      type: String,
      required: [true, "La materia es obligatoria"],
      minlength: [2, "La materia debe tener al menos 2 caracteres"],
      maxlength: [80, "La materia no puede superar 80 caracteres"],
      trim: true
    },
    dueDate: {
      type: Date,
      required: [true, "La fecha de entrega es obligatoria"]
    },
    status: {
      type: String,
      enum: {
        values: ["Pendiente", "En progreso", "Completada"],
        message: "Estado no válido"
      },
      default: "Pendiente"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Task", taskSchema);