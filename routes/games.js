import express from "express";
import GamesController from "../controllers/games.js"
import VotesController from "../controllers/votes.js";
import { validateNewGame, validateEditGame } from "../middleware/games.js"

const route = express.Router();

route.get('/games/:idGame', GamesController.getGameByID);
route.get('/games', GamesController.getGames);
route.post('/games', [validateNewGame], GamesController.createGame);
route.delete('/games/:idGame', GamesController.deleteGame);
route.patch('/games/:idGame', [validateEditGame], GamesController.updateGame);


route.get("/games/:idGame/votes", VotesController.getVotesByGame);

export default route;