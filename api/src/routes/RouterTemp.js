const { Router } = require("express");
const { Temperament } = require("../db");
const { getTemperaments } = require("../controllers/getTemp");

const temperamentRouter = Router();


temperamentRouter.get("/", async (req, res) => {
  // lo traigo de la api
  const temperamentsApi = await getTemperaments();

  temperamentsApi.forEach((temp) => {
    Temperament.findOrCreate({
         where: { name: temp }, // donde? recorre cada temp. si lo encuentra listo, sino lo crea(agrega)
    });
  });
  // me guarda todos los temp en el modelo
  const totalTemperaments = await Temperament.findAll();
  return res.status(200).send(totalTemperaments); // como respuesta el total de temp
});

temperamentRouter.get("/", async (req, res) => {
  // lo traigo de la api
  const temperamentsApi = await getTemperaments();
  // buscar o crear un registro en la tabla de temperamentos en la base de datos. 
  //Si se encuentra un registro con el mismo nombre, se deja tal cual, sino se crea un nuevo registro en la tabla.
  temperamentsApi.forEach((temp) => {
    Temperament.findOrCreate({
         where: { name: temp }, // donde? recorre cada temp. si lo encuentra listo, sino lo crea(agrega)
    });
  });
  // me guarda todos los temp en el modelo
  const totalTemperaments = await Temperament.findAll();
  return res.status(200).send(totalTemperaments); // como respuesta el total de temp
});

module.exports = temperamentRouter;
