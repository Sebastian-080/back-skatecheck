// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const response = require('../util/response'); // Importamos el manejador de respuestas
const Contacto = require('../models/contacto');
const Evento = require('../models/evento');
const sequelize = require('../util/db');
const Asistencia = require('../models/asistencia');

const contactos = [];

const eventos = [];
let newEvento = new Evento(eventos.length + 1, "Rock al Parque");
eventos.push(newEvento);
newEvento = new Evento(eventos.length + 1, "Salsa al Parque");
eventos.push(newEvento);
newEvento = new Evento(eventos.length + 1, "Hip Hop al Parque");
eventos.push(newEvento);

const asistencias = [];

// Ruta para obtener un usuario por ID
router.get('/user', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findAll();

    if (user.length === 0) {
      return response.success(req, res, 200, 'No se encontraron usuarios', []);
    }

    res.body = user;
    response.success(req, res, 200, 'Usuarios obtenidos exitosamente', user);
  } catch (error) {
    response.error(req, res, 500, 'Error al obtener los usuarios');
  }
});

// Ruta para obtener un usuario por ID
router.get('/user/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return response.error(req, res, 404, 'Usuario no encontrado');
    }

    res.body = user;
    response.success(req, res, 200, 'Usuario encontrado', user);
  } catch (error) {
    response.error(req, res, 500, 'Error al obtener el usuario');
  }
});


// Ruta para agregar un nuevo usuario
router.post('/user/register', async (req, res) => {
  const { nombre, correo, telefono, direccion, usuario, pass } = req.body;

  // Validación de los campos
  if (!nombre || !correo || !telefono || !direccion || !usuario || !pass) {
    return response.error(req, res, 400, 'Todos los campos son obligatorios');
  }

  try {
    const user = await User.create(req.body);
    res.body = user;
    // Respuesta exitosa
    response.success(req, res, 201, 'Usuario creado exitosamente');
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

});

router.post('/user/login', async (req, res) => {
  const { usuario, pass } = req.body;

  // Validación de los campos
  if (!usuario || !pass) {
    return response.error(req, res, 400, 'Todos los campos son obligatorios');
  }

  try {
    const user = await User.findOne({
      where: {
        usuario: usuario,
        pass: pass
      }
    });

    if (!user) {
      return response.error(req, res, 404, 'Usuario no encontrado');
    }

    res.body = user;
    response.success(req, res, 200, 'Usuario encontrado', user);
  } catch (error) {
    response.error(req, res, 500, 'Error al obtener el usuario');
  }
});




router.post('/set-contacto', (req, res) => {
  const { usuario, correo, descripcion } = req.body;

  // Validación de los campos
  if (!usuario || !correo || !descripcion) {
    return response.error(req, res, 400, 'Todos los campos son obligatorios');
  }

  const newContacto = new Contacto(contactos.length + 1, usuario, correo, descripcion);
  contactos.push(newContacto);

  // Respuesta exitosa
  response.success(req, res, 201, 'Exitoso');
});


router.get('/get-contacto', (req, res) => {

  // Respuesta exitosa
  res.body = contactos;
  response.success(req, res, 201, 'Exitoso');
});


router.get('/evento/all', (req, res) => {

  // Respuesta exitosa
  res.body = eventos;
  response.success(req, res, 201, 'Exitoso');
});



router.get('/evento/asistencia/all', (req, res) => {

  // Respuesta exitosa
  res.body = asistencias;
  response.success(req, res, 201, 'Exitoso');
});

router.post('/evento/asistencia/create', (req, res) => {
  const { evento, usuario } = req.body;

  // Validación de los campos
  if (!evento || !usuario) {
    return response.error(req, res, 400, 'Todos los campos son obligatorios');
  }

  const newAsistencia = new Asistencia(asistencias.length + 1, evento, usuario, new Date());
  asistencias.push(newAsistencia);

  // Respuesta exitosa
  response.success(req, res, 201, 'Usuario Correcto');
});

module.exports = router;
