import express from "express";
import VotesController from "../controllers/votes.js";
import {validateVote, validateJudge, validateGame, alreadyVote} from "../middleware/votes.js"

const route = express.Router();

route.post("/votes", [validateVote, validateJudge, validateGame, alreadyVote] ,VotesController.createVote);

//route.get("/:idGame/votes", VotesController.getVotesByGame);
//route.get("/:idJudge/votes", VotesController.getVotesByJudge);

export default route;

/* 
/    /:idJuez --> nombre de los juegos, puntos por c/categoria
/    /:idJuego --> nombre de los jueces, puntos por c/categoria 

*/
