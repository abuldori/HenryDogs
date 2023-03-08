const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id : 
      {
      type: DataTypes.UUID, //usamos uuid para que no se pise con id de la api
      defaultValue: DataTypes.UUIDV4, // cuando creamos un personaje se van a crear automatico
      allowNull: false,
      primaryKey: true
      },
    image: {
         type: DataTypes.STRING,
         allowNull: false
      },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    height: {  //altura
      type: DataTypes.STRING,
        allowNull: false,
      },
    weight: { //peso
      type: DataTypes.STRING,
        allowNull: false,
      },
    life_span: { //años de vida
      type: DataTypes.STRING,
        allowNull: false,
      },
    createInDb: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    }
  },
  {
    timestamps: false
});
};
