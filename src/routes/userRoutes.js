// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const response = require('../util/response'); // Importamos el manejador de respuestas

// Simular una base de datos en memoria
const users = [];

// Ruta para agregar un nuevo usuario
router.post('user/register', (req, res) => {
  const { name, email } = req.body;

  // Validación de los campos
  if (!name || !email) {
    return response.error(req, res, 400, 'Todos los campos son obligatorios');
  }

  const newUser = new User(users.length + 1, name, email);
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

module.exports = router;
