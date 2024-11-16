// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const response = require('../util/response'); // Importamos el manejador de respuestas
const Usuario = require('../models/usuario');  // Asumiendo que tienes el modelo Usuario
const Estudiante = require('../models/estudiante');  // Asumiendo que tienes el modelo Usuario

// Ruta para obtener un usuario por ID
router.get('/user', async (req, res) => {
  try {
    const user = await Usuario.findAll();

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
    const user = await Usuario.findByPk(id);

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
router.post('/user', async (req, res) => {
  usuarioData = {};
  usuarioData.nombre = req.body.nombre + " " + req.body.nombre;
  usuarioData.usuario = await generateUniqueUsername(usuarioData.nombre);
  usuarioData.password = usuarioData.usuario;
  usuarioData.perfil_id = 3;


  // Validación de los campos
  if (!usuarioData.nombre) {
    return response.error(req, res, 400, 'Todos los campos son obligatorios');
  }

  try {
    const user = await Usuario.create(usuarioData);
    
    estudianteData = {}
    estudianteData.usuario_id = user.usuario_id;
    estudianteData.nro_documento = req.body.doc;
    estudianteData.fecha_nacimiento = req.body.nacimiento;
    estudianteData.telefono = req.body.telefono;
    estudianteData.correo = req.body.correo;

    const estudiante = await Estudiante.create(estudianteData);
    // Respuesta exitosa
    response.success(req, res, 201, 'Usuario creado exitosamente');
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

});

// Función para generar un nombre de usuario basado en el nombre completo
function generateUsername(fullName) {
  // Aquí puedes implementar la lógica para generar el nombre de usuario
  // Por ejemplo, tomando las primeras letras del nombre y apellido
  const nameParts = fullName.split(" ");
  const firstName = nameParts[0].toLowerCase();
  const lastName = nameParts[1] ? nameParts[1].toLowerCase() : "";
  return firstName + lastName;
}

async function generateUniqueUsername(fullName) {
  let baseUsername = generateUsername(fullName);  // Usamos la función definida
  let uniqueUsername = baseUsername;
  let counter = 1;

  // Comprobar si el nombre de usuario ya existe en la base de datos
  while (await isUsernameTaken(uniqueUsername)) {
      uniqueUsername = baseUsername + counter;
      counter++;
  }

  return uniqueUsername;
}

async function isUsernameTaken(username) {
  const user = await Usuario.findOne({ where: { usuario: username } });
  return user !== null; // Si existe un usuario con el nombre de usuario, retorna true
}

router.post('/user/login', async (req, res) => {
  const { usuario, pass } = req.body;

  // Validación de los campos
  if (!usuario || !pass) {
    return response.error(req, res, 400, 'Todos los campos son obligatorios');
  }

  try {
    const user = await Usuario.findOne({
      where: {
        usuario: usuario,
        password: pass
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

module.exports = router;
