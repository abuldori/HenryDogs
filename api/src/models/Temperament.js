const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('temperament', {
    id : 
      {
      type: DataTypes.UUID, //usamos uuid para que no se pise con id de la api
      defaultValue: DataTypes.UUIDV4, // ver a que se refiere
      allowNull: false,
      primaryKey: true,
      },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  },
  {
    timestamps: false
});
};