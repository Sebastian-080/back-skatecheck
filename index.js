// index.js
const express = require('express');
const cors = require('cors');
const config = require('./src/config');
const app = express();

// Middleware
app.use(cors(config.corsOptions)); // Permitir CORS con opciones
app.use(express.json()); // Para parsear JSON

// Rutas
const usuarioRoutes = require('./src/routes/usuarioRoutes');
const claseRoutes = require('./src/routes/claseRoutes');
const asistenciaRoutes = require('./src/routes/asistenciaRoutes');
app.use('/api/', usuarioRoutes);
app.use('/api/', claseRoutes);
app.use('/api/', asistenciaRoutes);

// Iniciar servidor
app.listen(config.port, () => {
  console.log(`Servidor corriendo en el puerto ${config.port}`);
});
