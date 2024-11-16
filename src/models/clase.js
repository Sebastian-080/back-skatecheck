const { DataTypes } = require('sequelize');
const sequelize = require('../util/db');

const Clase = sequelize.define('clase', {
    clase_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    estado: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    fecha_clase: {
        type: DataTypes.DATE,
        allowNull: false
    },
    hora_ingreso: {
        type: DataTypes.STRING(5),
        allowNull: false
    },
    tiempo_clase: {
        type: DataTypes.STRING(3),
        allowNull: false
    },
    cantidad_estudiantes: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    usuario_id_cre: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'usuarios', // Esto asume que tienes una tabla 'usuarios'
            key: 'usuario_id'
        }
    }
}, {
    tableName: 'clase', // Especifica el nombre exacto de la tabla
    timestamps: false   // Desactiva createdAt y updatedAt ya que son agregados automáticamente por el ORM
});

module.exports = Clase;
