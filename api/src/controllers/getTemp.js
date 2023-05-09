const { getAllDogs } = require("./getDogs")

// const getTemperaments = async () => {
//     const allDogs = await getAllDogs();
//     const allTemperaments = allDogs.flatMap((dog) => dog.temperaments);
//     return [...new Set(allTemperaments)];
//   };

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
  const allTemperaments = temperament.filter((temper) => temper !== "");
  return allTemperaments;
};


  //Aquí, flatMap() se utiliza para crear un array plano de todos los temperamentos, y Set se utiliza para eliminar los elementos duplicados en el array. Por último, el operador de propagación (...) se utiliza para convertir el Set de vuelta a un array.
  
  module.exports = {
    getTemperaments,
  };