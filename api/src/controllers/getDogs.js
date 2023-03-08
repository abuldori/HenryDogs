const axios = require("axios");
const { API_KEY } = process.env;
const { Dog, Temperament } = require("../db");


const getApiInfo = async () => {
  const apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
  const apiInfo = await apiUrl.data.map((dog) => {
    let tempArr =[];
    if (dog.temperament) {tempArr = dog.temperament.split(/(?:,| )+/)}
    return {
      id: dog.id,
      image: dog.image.url,
      name: dog.name,
      height: dog.height.metric,
      weight: dog.weight.metric,
      life_span: dog.life_span,
      temperaments: tempArr,
      createInDb: false,
    };
  });
  return apiInfo;
};

// INFO DE LA BASE DE DATOS
const getDbInfo = async () => {
  let dogs_DB = await Dog.findAll({
    include: {
      model: Temperament,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  const datBmap = dogs_DB.map((el) => ({
    ...el.toJSON(), // convertir el objeto Sequelize en un objeto plano de JavaScript.  el spread operator es necesario para crear un objeto de JavaScript a partir del objeto JSON retornado por la función toJSON().
    temperaments: el.temperaments.map((t) => t.name),
  }));
  return datBmap;
};

// TODA LA INFO DE LOS PERROS UNIFICADA
const getAllDogs = async () => {
  const apiInfo = await getApiInfo();
  const bdInfo = await getDbInfo();
  const infoUnified = apiInfo.concat(bdInfo);
  return infoUnified;
};

// ///////////////////////////

// desarma los arreglos de temperamentos y me los devuelve como singulares

const getTemperaments = async () => {
  const allDogs = await getAllDogs();
  const temperaments = allDogs.map((e) => e.temperaments).toString(); // los pasa a string
  const tempSpace = temperaments.split(","); // los separa
  const temperament = tempSpace.map((temp) => {
    if (temp[0] === " ") {
      // saca espacio
      return temp.trim(); // retorma lo que corresponde sin espacios
    }
    return temp;
  });
  const allTemperaments = temperament.filter((el) => el !== "");
  return allTemperaments;
};


module.exports = {
  getAllDogs,
  getDbInfo,
  getApiInfo,
  getTemperaments,
};
