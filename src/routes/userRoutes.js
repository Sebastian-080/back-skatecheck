// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const response = require('../util/response'); // Importamos el manejador de respuestas
const Contacto = require('../models/contacto');

// Simular una base de datos en memoria
const users = [];
const contacto = [];

// Ruta para agregar un nuevo usuario
router.post('/user/register', (req, res) => {
  const { nombre, correo, telefono, direccion, usuario, pass } = req.body;

  // Validación de los campos
  if (!nombre || !correo || !telefono || !direccion || !usuario || !pass) {
    return response.error(req, res, 400, 'Todos los campos son obligatorios');
  }

  const newUser = new User(users.length + 1, nombre, correo);
  users.push(newUser);

  // Respuesta exitosa
  response.success(req, res, 201, 'Usuario creado exitosamente');
});

// Ruta para loguear un usuario
router.post('/user/login', (req, res) => {
  const { usuario, pass } = req.body;

  // Validación de los campos
  if (!usuario || !pass) {
    return response.error(req, res, 400, 'Todos los campos son obligatorios');
  }

  // Respuesta exitosa
  response.success(req, res, 201, 'Usuario Correcto');
});

// Ruta para loguear un usuario
router.post('/contacto', (req, res) => {
  const { nombre, correo, descripcion } = req.body;

  // Validación de los campos
  if (!nombre || !correo || !descripcion) {
    return response.error(req, res, 400, 'Todos los campos son obligatorios');
  }

  const newContacto = new Contacto(contacto.length + 1, nombre, correo, descripcion);
  contacto.push(newContacto);

  // Respuesta exitosa
  response.success(req, res, 201, 'Registro Exitoso');
});

module.exports = router;
