// index.js
const express = require('express');
const cors = require('cors');
const config = require('./src/config');
const app = express();

// Middleware
app.use(cors(config.corsOptions)); // Permitir CORS con opciones
app.use(express.json()); // Para parsear JSON

// Rutas
const userRoutes = require('./src/routes/userRoutes');
app.use('/api/', userRoutes);

// Iniciar servidor
app.listen(config.port, () => {
  console.log(`Servidor corriendo en el puerto ${config.port}`);
});
