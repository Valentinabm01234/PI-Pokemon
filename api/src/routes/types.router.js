const { getType } = require("../controllers/types.controller");
const { Router} = require("express");
const typesRouter = Router();


typesRouter.get("/", getType);



module.exports = typesRouter;