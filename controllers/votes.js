import VotesService from "../services/votes.js";

/**
 * Controlador para obtener el listado de votos
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function createVote(req, res) {
  return VotesService.createVote(req.body)
    .then(function (vote) {
      res.status(201).json(vote);
    })
    .catch(function (err) {
      res.status(500).json({ msg: err.msg });
    });
}

/**
 * Controlador para obtener el listado de votos de un juez
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function getVotesByJudge(req, res) {    
  return VotesService.getVotesByJudge(req.params.idJudge)
    .then(function (vote) {
      res.status(200).json(vote);
    })
    .catch(function (err) {
      res.status(500).json({ msg: err.msg });
    });
}

/**
 * Controlador para obtener el listado de votos de un juego
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function getVotesByGame(req, res) {    
    return VotesService.getVotesByGame(req.params.idGame)
    .then(function (votes) {
      res.status(200).json(votes);
    })
    .catch(function (err) {
      res.status(500).json({ msg: err.msg });
    });
}

export { createVote, getVotesByGame, getVotesByJudge };

export default {
  createVote,
  getVotesByGame,
  getVotesByJudge,
};
