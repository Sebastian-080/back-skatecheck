  
const { DataTypes } = require('sequelize');
const sequelize = require('../util/db');

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

module.exports = Usuario;
