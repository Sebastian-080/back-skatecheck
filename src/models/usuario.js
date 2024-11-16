  
const { DataTypes } = require('sequelize');
const sequelize = require('../util/db');
const Estudiante = require('./estudiante');

const Usuario = sequelize.define('usuario', {
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  usuario: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  perfil_id: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'usuarios', // Especifica el nombre exacto de la tabla
  timestamps: false   // Desactiva createdAt y updatedAt ya que son agregados automaticamente por el ORM
});

// Establecer la relación: Un usuario puede tener muchos estudiantes
Usuario.hasOne(Estudiante, {
  foreignKey: 'usuario_id', // El campo de clave foránea en 'estudiantes'
  sourceKey: 'usuario_id'   // El campo de clave primaria en 'usuarios'
});

// Establecer la relación inversa: Un estudiante pertenece a un usuario
Estudiante.belongsTo(Usuario, {
  foreignKey: 'usuario_id', // La clave foránea en la tabla 'estudiantes'
  targetKey: 'usuario_id'   // La clave primaria en la tabla 'usuarios'
});

module.exports = Usuario;
