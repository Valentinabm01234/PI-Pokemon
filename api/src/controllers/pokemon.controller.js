const axios = require("axios");
const { Pokemon, Type } = require("../db");

const getInformationApi = async (limit = 100, offset = 0) => {
  const { data: dataPokemons } = await axios.get(
    "https://pokeapi.co/api/v2/pokemon",
    {
      params: {
        limit,
        offset,
      },
    }
  );

  const arrPromises = dataPokemons.results.map(({ url }) =>
    axios.get(url).then(({ data }) => data)
  );

  const arr = await Promise.all(arrPromises).then((res) =>
    res.map((p) => {
      //toma la respuesta y mapea por cada pokemon la info necesaria
      const info = {
        id: p.id,
        name: p.name,
        img: p.sprites.other.dream_world.front_default,
        type: p.types.map((el) => el.type.name),
        health: p.stats[0].base_stat,
        attack: p.stats[1].base_stat,
        defense: p.stats[2].base_stat,
        speed: p.stats[5].base_stat,
        height: p.height,
        weight: p.weight,
      };
      return info; //devuelve toda la info
    })
  );
  return arr;
};

const getInformationByName = async (name) => {
    return axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(({data:p}) => ({
        id: p.id,
        name: p.name,
        img: p.sprites.other.dream_world.front_default,
        type: p.types.map((el) => el.type.name),
        health: p.stats[0].base_stat,
        attack: p.stats[1].base_stat,
        defense: p.stats[2].base_stat,
        speed: p.stats[5].base_stat,
        height: p.height,
        weight: p.weight,
      }))
      .catch(() =>{})
 };

const getInformationDB = async () => {
  return await Pokemon.findAll({
    include: {
      model: Type,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  })
};

const getAllInformation = async (req, res, next) => {
  try {
    const { limit, offset, name } = req.query;
    console.log(name);
    if (name) {
      const pkmonsByName = []
      const pkmon = await getInformationByName(name);
      pkmonsByName.push(pkmon)
      return res.json(pkmonsByName);

    }
    const infoApi = await getInformationApi(limit, offset);
    const infoDB = await getInformationDB();
    const allInfo = infoDB.concat(infoApi);
    res.status(200).json(allInfo);
  } catch (error) {
    next(error);
  }
};

const getPokemonById = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id)
    const {data: pk}= await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    res.json(pk)
  } catch (error) {
    next(error);
  }
};

const createPokemon = async (req, res, next) => {
  try {
    const { name, img, health, attack, defense, speed, height, weight, type } =
      req.body;
    if (name && img && health && attack && defense) {
      const pokemon = await Pokemon.create({
        name,
        img,
        health,
        attack,
        defense,
        speed,
        height,
        weight,
      });

      let typeByDB = await Type.findAll({
        where: {
          name: type,
        },
      });
      await pokemon.addType(typeByDB);
      return res.status(200).send("El pokemon ha sido creado exitosamente");
    }
    res.status(400).send("Faltan datos obligatorios");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllInformation,
  getPokemonById,
  createPokemon,
  getInformationDB,
};