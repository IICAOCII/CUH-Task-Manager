const mongoose = require("mongoose");
const Task = require("../models/Task");
const { validateTaskInput } = require("../validators/taskInput");

function validateId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

async function getTasks(req, res) {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al consultar las tareas" });
  }
}

async function getTaskById(req, res) {
  try {
    if (!validateId(req.params.id)) {
      return res.status(400).json({ message: "ID de tarea no válido" });
    }

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    res.status(200).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al consultar la tarea" });
  }
}

async function createTask(req, res) {
  try {
    const validationMessage = validateTaskInput(req.body);
    if (validationMessage) {
      return res.status(400).json({ message: validationMessage });
    }

    const { title, description = "", subject, dueDate, status = "Pendiente" } = req.body;

    const task = await Task.create({
      title,
      description,
      subject,
      dueDate,
      status
    });

    res.status(201).json(task);
  } catch (error) {
    console.error(error);

    if (["ValidationError", "CastError"].includes(error.name)) {
      return res.status(400).json({
        message: "Datos no válidos",
        errors: error.errors
          ? Object.values(error.errors).map((item) => item.message)
          : [error.message]
      });
    }

    res.status(500).json({ message: "Error al crear la tarea" });
  }
}

async function updateTask(req, res) {
  try {
    if (!validateId(req.params.id)) {
      return res.status(400).json({ message: "ID de tarea no válido" });
    }

    const validationMessage = validateTaskInput(req.body);
    if (validationMessage) {
      return res.status(400).json({ message: validationMessage });
    }

    const { title, description = "", subject, dueDate, status = "Pendiente" } = req.body;

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, subject, dueDate, status },
      {
        new: true,
        runValidators: true
      }
    );

    if (!task) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    res.status(200).json(task);
  } catch (error) {
    console.error(error);

    if (["ValidationError", "CastError"].includes(error.name)) {
      return res.status(400).json({
        message: "Datos no válidos",
        errors: error.errors
          ? Object.values(error.errors).map((item) => item.message)
          : [error.message]
      });
    }

    res.status(500).json({ message: "Error al actualizar la tarea" });
  }
}

async function deleteTask(req, res) {
  try {
    if (!validateId(req.params.id)) {
      return res.status(400).json({ message: "ID de tarea no válido" });
    }

    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    res.status(200).json({
      message: "Tarea eliminada correctamente",
      id: task._id
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar la tarea" });
  }
}

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};
