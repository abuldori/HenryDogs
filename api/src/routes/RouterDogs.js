const { Router } = require('express');
const { getAllDogs } = require('../controllers/getDogs');
const { Temperament, Dog } = require("../db");


const routerDogs = Router();


routerDogs.get("/", async (req, res) => {

    const { name } = req.query;
    let allDogs= await getAllDogs(); // llamo a todos los perros

    if (name) { //si hay un nom q me pasan por query

// agarro la const allDogs(q tiene todo) y lo filtro pido que agarre el name,fijat si incluye lo que pase por query(name), y le aplico tolowercase(por las may y minusculas)
      let dogName = await allDogs.filter((el) =>  
        el.name.toLowerCase().includes(name.toLowerCase())); // nose pone el === pq asi busca toodoooooo con el includes

      dogName.length  //encontraste algo?
        ? res.status(200).send(dogName)  // le paso el nombre
        : res.status(404).send("No existe el perro"); // le envio el mensaje de error
    } else {
      res.status(200).send(allDogs); // si no tiene query, envia todos perros
    }
  });


  routerDogs.get("/:id", async (req, res) => { 
    try {
      const { id } = req.params;
      const dogsTotal = await getAllDogs();
      if (id) {
        let dogsId = await dogsTotal.find(el => el.id == id );
          if(dogsId) res.status(200).json(dogsId)
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
          res.status(200).send("Perro creado");
          
      } catch (error) {
        res.status(404).send({error: error.message})
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


    //   routerDogs.delete('/:id', async (req, res) => {
  //     const { id } = req.params;
   
  //  const dog = await Dog.findByPk(id);

  //  if(dog) {
  //   await dog.destroy();
  //   res.status(200).send("Perro eliminado");
  //  } else {
  //   res.status(404).send("No se puede eliminar")
  //  }
  // })
 module.exports = routerDogs;

