const axios = require("axios");
//const { API_KEY } = process.env;
const { Dog, Temperament } = require("../db");


const getApiInfo = async () => {
  const apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds`);
  const apiInfo = await apiUrl.data.map((dog) => {
    const tempArr = dog.temperament ? dog.temperament.split(/(?:,| )+/) : [];
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
// const getDbInfo = async () => {
//   const dogs_DB = await Dog.findAll({
//     attributes: ["id", "name", "height", "weight", "life_span", "image"],
//     include: {
//       model: Temperament,
//       attributes: ["name"],
//       through: {
//         attributes: [],
//       },
//     },
//   });
//   return dogs_DB;
// };


// TODA LA INFO DE LOS PERROS UNIFICADA
const getAllDogs = async () => {
  const apiInfo = await getApiInfo();
  const bdInfo = await getDbInfo();
  const infoUnified = apiInfo.concat(bdInfo);
  return infoUnified;
};


module.exports = {
  getAllDogs,
  getDbInfo,
  getApiInfo
};
