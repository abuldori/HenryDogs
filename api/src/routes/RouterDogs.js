const { Router } = require('express');
const { getAllDogs } = require('../controllers/getDogs');
const { Temperament, Dog } = require("../db");


const routerDogs = Router();


routerDogs.get("/", async (req, res) => {
  const { name } = req.query;
  let allDogs = await getAllDogs(); // Obtener todos los perros
  // Filtrar por nombre si se proporciona el parámetro "name" en la consulta
  if (name) {
    allDogs = allDogs.filter((dog) => dog.name.toLowerCase().includes(name.toLowerCase()));
  }
  // Comprobar si hay perros después del filtrado
  if (allDogs.length) {
    res.status(200).send(allDogs); // Si hay perros, enviar una respuesta con los perros encontrados
  } else {
    res.status(404).send("No se encontraron perros"); // Si no hay perros, enviar una respuesta de error
  }
});

  routerDogs.get("/:id", async (req, res) => { 
    try {
      const { id } = req.params;

      const dogsAll = await getAllDogs();
        if (id) {
          let dogsId = await dogsAll.find(el => el.id == id );
            if(dogsId) 
            return res.status(200).json(dogsId)
            throw new Error("No existe el perro")
        }
        } catch (error) {
          return {error: error.message}
    }
      });

  routerDogs.post("/", async (req, res) => {
    try {
      const {  name, weight, height, life_span, temperaments, image } = req.body;
      
      if (!name || !weight || !height || !life_span  || !temperaments || !image) {
        throw Error("Faltan datos obligatorios")}
  
      let newDog = await Dog.create({
          name,
          weight,
          height,
          life_span,
          image,
          temperaments,
        });
  
        let temperDb = await Temperament.findAll({ 
          where: { name: temperaments } }); 
          newDog.addTemperament(temperDb)
          return res.status(200).send("Perro creado");
          
      } catch (error) {
        return res.status(404).send({error: error.message})
      }
    })

    

    routerDogs.delete('/:id', async (req, res) => {
      const { id } = req.params;
    try {
      const dog = await Dog.findByPk(id);; //Sequelize para buscar un perro en la base de datos que coincida con el ID// El método findOne busca un registro que coincida con el id
      if (!dog) { // si no encuentra el perro
        return res.status(404).json({ message: 'Perro no encontrado' }); // devuelve esto
      }
      await dog.destroy(); //Si el perro se encuentra y el creador del perro coincide con el usuario que hace la solicitud, la función utiliza el método destroy de sequelize para eliminar el registro de la base de datos.
      res.status(200).json({ message: 'Perro eliminado correctamente' });
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'No estás autorizado para realizar esta acción' });
    }
  });


 module.exports = routerDogs;

