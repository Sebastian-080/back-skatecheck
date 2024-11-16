// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const response = require('../util/response'); // Importamos el manejador de respuestas
const Clase = require('../models/clase');  // Asumiendo que tienes el modelo Clase

// Ruta para obtener un usuario por ID
router.get('/clase', async (req, res) => {
  try {
    const clase = await Clase.findAll();

    if (clase.length === 0) {
      return response.success(req, res, 200, 'No se encontraron clases', []);
    }

    res.body = clase;
    response.success(req, res, 200, 'Usuarios obtenidos exitosamente', clase);
  } catch (error) {
    response.error(req, res, 500, 'Error al obtener las clases');
  }
});

// Ruta para obtener un usuario por ID
router.get('/clase/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const clase = await Clase.findByPk(id);

    if (!clase) {
      return response.error(req, res, 404, 'Clase no encontrado');
    }

    res.body = clase;
    response.success(req, res, 200, 'Clase encontrado', clase);
  } catch (error) {
    response.error(req, res, 500, 'Error al obtener el usuario');
  }
});


// Ruta para agregar un nuevo usuario
router.post('/clase', async (req, res) => {

  try {
    req.body.usuario_id = 1
    const { fecha_clase, hora_ingreso, tiempo_clase, cantidad_estudiantes, usuario_id } = req.body;

    // Transformar hora_ingreso al formato correcto
    const horaFormatted = (dateString) => {
        const date = new Date(dateString) ;
        const hours = date.getHours().toString().padStart(2, '0'); // Formato HH
        const minutes = date.getMinutes().toString().padStart(2, '0'); // Formato mm
        return `${hours}:${minutes}`;
    };

    // Crear el registro en la base de datos
    const clase = await Clase.create({
        fecha_clase: new Date(fecha_clase), // Convierte a Date
        hora_ingreso: horaFormatted(hora_ingreso),
        tiempo_clase: tiempo_clase.toString(), // Asegurar string
        cantidad_estudiantes,
        usuario_id_cre: usuario_id
    });

    // Respuesta exitosa
    response.success(req, res, 201, 'Clase creado exitosamente');
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

});

module.exports = router;
