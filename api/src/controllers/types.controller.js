const axios = require("axios");
const { Type } = require("../db");

const getType = async (req, res, next) => {
  try {
    //LLENADO DE LOS TYPES
    // const apiUrlTypes = "https://pokeapi.co/api/v2/type";
    // const response = await axios.get(apiUrlTypes);
    // const types = response.data.results.map((el) => ({ name: el.name }));

    // await Type.bulkCreate(types, { ignoreDuplicates: true }); // En lugar de realizar una llamada a la base de datos por cada tipo de Pokémon en el bucle, Utilizamos el método bulkCreate de Sequelize para insertar todos los tipos en la base de datos de una sola vez.

    const allTypes = await Type.findAll();
    res.json(allTypes);
    
  } catch (error) {
    next(error);
  }
};
module.exports = {getType};