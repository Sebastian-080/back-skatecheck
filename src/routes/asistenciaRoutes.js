// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const response = require('../util/response'); // Importamos el manejador de respuestas
const Asistencia = require('../models/asistencia');  // Asumiendo que tienes el modelo Asistencia

// Ruta para obtener un usuario por ID
router.get('/asistencia', async (req, res) => {
    try {
        const asistencia = await Asistencia.findAll({
            include: ['clase', 'usuario'] // Incluye las tablas relacionadas si es necesario
        });

        if (asistencia.length === 0) {
        return response.success(req, res, 200, 'No se encontraron asistencias', []);
        }

        res.body = asistencia;
        response.success(req, res, 200, 'Asitencias obtenidos exitosamente', asistencia);
    } catch (error) {
        response.error(req, res, 500, 'Error al obtener las asistencias');
    }
});
// Ruta para obtener un usuario por ID
router.get('/asistencia/:usuario_id', async (req, res) => {
    const { usuario_id } = req.params;
    try {
        const asistencia = await Asistencia.findAll({
            where: { usuario_id: usuario_id },
            include: ['clase', 'usuario'] // Incluye las tablas relacionadas si es necesario
        });

        if (asistencia.length === 0) {
        return response.success(req, res, 200, 'No se encontraron asistencias', []);
        }

        res.body = asistencia;
        response.success(req, res, 200, 'Asitencias obtenidos exitosamente', asistencia);
    } catch (error) {
        response.error(req, res, 500, 'Error al obtener las asistencias');
    }
});


// Ruta para agregar un nuevo usuario
router.post('/asistencia', async (req, res) => {
    const { clase_id, usuario_id } = req.body;
  
    try {
        // Crear nueva asistencia
        const nuevaAsistencia = await Asistencia.create({
            clase_id,
            usuario_id,
        });

        // Respuesta exitosa
        response.success(req, res, 201, 'Asistencia creado exitosamente');
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

});

module.exports = router;
