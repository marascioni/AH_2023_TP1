import { voteSchema } from "../schemas/vote.js";
import { existJudge } from "../services/judges.js";
import { existGame } from "../services/games.js";
import { voteJudgeSameGame } from "../services/votes.js";

/**
 * Controla que los datos ingresados sean válidos
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
function validateVote(req, res, next) {
  voteSchema
    .validate(req.body, { stripUnknown: true, abortEarly: true })
    .then(async function (vote) {
      req.body = vote;      
      next();
    })
    .catch(function (err) {
      res.status(400).json(err);
    });
}

/**
 * Controla que el juez ingresado exista en la base de datos
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
async function validateJudge(req, res, next) {
  const resp = await existJudge(req.body.judge_id);
  if (resp) {    
    next();
  } else {
    res.status(400).json({ msg: "No existe el juez ingresado" });
  }
}

/**
 * Controla que el juego ingresado exista en la base de datos
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
async function validateGame(req, res, next) {
  const resp = await existGame(req.body.game_id);
  if (resp) {    
    next();
  } else {
    res.status(400).json({ msg: "No existe el juego ingresado" });
  }
}

/**
 * Controla que no se haya emitido un voto por el juez para el juego
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
async function alreadyVote(req, res, next) {
  const resp = await voteJudgeSameGame(req.body.judge_id, req.body.game_id);
  if (resp) {
    res
      .status(400)
      .json({ msg: "Ya realizó una votación previa para el mismo juego" });
  } else {    
    next();
  }
}

export { validateVote, validateJudge, validateGame, alreadyVote };

export default {
  validateVote,
  validateJudge,
  validateGame,
  alreadyVote,
};
