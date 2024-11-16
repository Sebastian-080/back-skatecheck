const { DataTypes } = require('sequelize');
const sequelize = require('../util/db');

const Estudiante = sequelize.define('estudiante', {
    estudiante_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'usuarios', // Esto asume que tienes una tabla 'usuarios'
            key: 'usuario_id'
        }
    },
    nro_documento: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    fecha_nacimiento: {
        type: DataTypes.DATE,
        allowNull: false
    },
    telefono: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
    correo: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
    nombre_acudiente: {
        type: DataTypes.STRING(200),
        allowNull: true
    },
    telefono_acudiente: {
        type: DataTypes.STRING(15),
        allowNull: true
    },
    correo_acudiente: {
        type: DataTypes.STRING(15),
        allowNull: true
    }
}, {
    tableName: 'estudiante', // Especifica el nombre exacto de la tabla
    timestamps: false   // Desactiva createdAt y updatedAt ya que son agregados automáticamente por el ORM
});

module.exports = Estudiante;
