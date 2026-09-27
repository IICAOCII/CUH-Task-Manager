require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const connectDB = require("./config/db");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: "20kb" }));

app.get("/api/health", (req, res) => {
  const databaseConnected = mongoose.connection.readyState === 1;
  res.status(databaseConnected ? 200 : 503).json({
    message: databaseConnected
      ? "Backend funcionando correctamente"
      : "La base de datos no está disponible",
    database: databaseConnected ? "connected" : "disconnected"
  });
});

app.use("/api/tasks", taskRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: "Ruta no encontrada"
  });
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  if (error.type === "entity.parse.failed") {
    return res.status(400).json({ message: "El cuerpo de la solicitud no contiene JSON válido." });
  }

  if (error.type === "entity.too.large") {
    return res.status(413).json({ message: "La solicitud supera el tamaño permitido." });
  }

  console.error(error);
  return res.status(500).json({ message: "Ocurrió un error interno en el servidor." });
});

async function startServer() {
  await connectDB();

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
  });
}

startServer();
