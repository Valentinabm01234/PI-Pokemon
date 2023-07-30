const { Router } = require('express');
const pokemonRouter = require('./pokemons.routes.js')
const typesRouter = require('./types.router.js')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
router.use('/pokemons', pokemonRouter)
router.use('/types', typesRouter)
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
