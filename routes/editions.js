import express from "express";
import GamesController from "../controllers/games.js"

const route = express.Router();

route.get("/edition/:idEdition", GamesController.getGamesByEdition);

export default route;