import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

export const getTasks = () => api.get("/tasks");

export const getTaskById = (id) => api.get(`/tasks/${id}`);

export const createTask = (task) => api.post("/tasks", task);

export const updateTask = (id, task) =>
  api.put(`/tasks/${id}`, task);

export const deleteTask = (id) =>
  api.delete(`/tasks/${id}`);