import express from "express";
import VotesRoute from "./votes.js"
import VotesController from "../controllers/votes.js";

const route = express.Router();

//route.use('/judges', VotesRoute);
route.get("/judges/:idJudge/votes", VotesController.getVotesByJudge);

export default route;