const { Router } = require("express");
const { Temperament } = require("../db");
const { getTemperaments } = require("../controllers/getDogs");

const temperamentRouter = Router();

temperamentRouter.get("/", async (req, res) => {
  // lo traigo de la api
  const temperamentsApi = await getTemperaments();
  temperamentsApi.forEach((el) => {
    Temperament.findOrCreate({
      // busca o crea en mi modelo de bd
      where: {
        name: el,
      }, // donde? recorre cada temp. si lo encuentra listo, sino lo crea
    });
  });
  // me guarda todos los temp en el modelo
  const totalTemperaments = await Temperament.findAll();
  res.status(200).send(totalTemperaments); // como respuesta el total de temp
});

module.exports = temperamentRouter;
