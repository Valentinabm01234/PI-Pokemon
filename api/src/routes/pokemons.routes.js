const { getAllInformation, getPokemonById, createPokemon, getInformationDB} = require("../controllers/pokemon.controller");
const { Router} = require("express");
const pokemonsRouter = Router();


pokemonsRouter.get("/", getAllInformation)
pokemonsRouter.get("/:id", getPokemonById)
pokemonsRouter.post("/", createPokemon)
pokemonsRouter.get("/", getInformationDB)


module.exports = pokemonsRouter;
