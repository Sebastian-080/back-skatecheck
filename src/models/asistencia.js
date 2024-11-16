const { DataTypes } = require('sequelize');
const sequelize = require('../util/db'); // Asegúrate de ajustar esta ruta según tu configuración
const Clase = require('./clase'); // Asegúrate de importar el modelo de Clase
const Usuario = require('./usuario'); // Asegúrate de importar el modelo de Usuario

const Asistencia = sequelize.define('asistencia', {
  asistencia_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  clase_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'clase', // Nombre exacto de la tabla `clase`
      key: 'clase_id',
    }
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'usuarios', // Nombre exacto de la tabla `usuarios`
      key: 'usuario_id',
    }
  },
}, {
  tableName: 'asistencia', // Nombre exacto de la tabla
  timestamps: false, // Si no tienes columnas createdAt/updatedAt
});

// Definir las asociaciones
Asistencia.belongsTo(Clase, {
  foreignKey: 'clase_id',
  as: 'clase', // Alias para la relación
});

Asistencia.belongsTo(Usuario, {
  foreignKey: 'usuario_id',
  as: 'usuario', // Alias para la relación
});

module.exports = Asistencia;
