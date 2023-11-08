import { MongoClient, ObjectId } from "mongodb";
import GameService from "./games.js";
import JudgeService from "./judges.js";

const clientDB = new MongoClient("mongodb://127.0.0.1:27017");
const db = clientDB.db("AH_TP1_2023");
const VoteCollection = db.collection("Votes");

/**
 * Carga un voto en la base de datos
 * @param {Object} vote Datos de un voto
 * @returns 
 */
async function createVote(vote) {
  await clientDB.connect();  
  const newVote = {
    judge_id: new ObjectId(vote.judge_id),
    game_id: new ObjectId(vote.game_id),
    gameplay: vote.gameplay,
    art: vote.art,
    sound: vote.sound,
    theme: vote.theme,
  };  
  /// side effect
  await VoteCollection.insertOne(newVote);  
  let sum = vote.art + vote.gameplay + vote.sound + vote.theme;
  const data = { points: sum };    
  await GameService.updateGame(vote.game_id, data);  
  return newVote;
}

/**
 * Devuelve el listado de los jueces que votaron el juego y sus puntajes
 * @param {[Object]} judgeList Listado de votos otorgados al juego
 * @returns {[Object]}
 */
async function getListJudges(judgeList) {  
  let listOfJudge = [];
  let judge = null;
  for (const element of judgeList) {
    judge = await JudgeService.getJudgeByID(element.judge_id.toString());
    listOfJudge.push({
      name: judge.name,
      gameplay: element.gameplay,
      art: element.art,
      sound: element.sound,
      theme: element.theme,
    });
  }
  return listOfJudge;
}

/**
 * Devuelve el listado de votos dado al juego
 * @param {string} id ID del juego
 * @returns [Object]
 */
async function getVotesByGame(id) {
  await clientDB.connect();
  const resp = await VoteCollection.find({
    game_id: new ObjectId(id),
  }).toArray();
  return getListJudges(resp);
}

/**
 * Devuelve el listado de los juegos que voto el juez
 * @param {[Object]} judgeList Listado de votos otorgados por el juez
 * @returns {[Object]}
 */
async function getListGames(gameList) {  
  let listOfGames = [];
  let game = null;
  for (const element of gameList) {
    game = await GameService.getGameByID(element.game_id);    
    listOfGames.push({
      name: game.name,
      gameplay: element.gameplay,
      art: element.art,
      sound: element.sound,
      theme: element.theme,
    });
  }
  
  return listOfGames;
}

/**
 * Devuelve el listado de votos dado al juego
 * @param {string} id ID del juego
 * @returns {[Object]}
 */
async function getVotesByJudge(id) {  
  await clientDB.connect();
  const resp = await VoteCollection.find({
    judge_id: new ObjectId(id),
  }).toArray();    
  return getListGames(resp);
}

/**
 * Busca si se realizó un voto para el juez y juego enviado
 * @param {string} judge_id 
 * @param {string} game_id 
 * @returns Boolean
 */
async function voteJudgeSameGame(judge_id, game_id) {
  await clientDB.connect();
  const resp = await VoteCollection.findOne({
    judge_id: new ObjectId(judge_id),
    game_id: new ObjectId(game_id),
  });
  if (resp) {    
    return true;
  } else {    
    return false;
  }
}

export { createVote, getVotesByJudge, getVotesByGame, voteJudgeSameGame };

export default {
  createVote,
  getVotesByJudge,
  getVotesByGame,
  voteJudgeSameGame,
};
