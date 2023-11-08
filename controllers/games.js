import GamesService from "../services/games.js";

/**
 * Controlador para obtener el listado de juegos
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function getGames(req, res) {
  GamesService.getGames(req.query)
    .then(function (games) {
    res.status(200).json(games);
  });
}

/**
 * Controlador para obtener un juego
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function getGameByID(req, res) {
  GamesService.getGameByIDToShow(req.params.idGame)
    .then(function (games) {
    res.status(200).json(games);
  });
}

/**
 * Controlador para crear un juego
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function createGame(req, res) {
  return GamesService.createGame(req.body)
    .then(function (game) {
      res.status(201).json(game);
    })
    .catch(function (err) {
      res.status(500).json({ msg: err.msg });
    });
}

/**
 * Controlador para actualizar un juego
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function updateGame(req, res) {  
  return GamesService.updateGame(req.params.idGame, req.body)
    .then(function (game) {
      res.status(200).json(game);
    })
    .catch(function (err) {
      res.status(500).json({ msg: err.msg });
    });
}

/**
 * Controlador para borrar un juego
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function deleteGame(req, res) {
  return GamesService.deleteGame(req.params.idGame)
    .then(function (game) {
      res.status(200).json(game);
    })
    .catch(function (err) {
      res.status(500).json({ msg: err.msg });
    });
}

/**
 * Controlador para obtener el listado de juegos para una edición en particular
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function getGamesByEdition(req, res) {    
  GamesService.getGamesByEdition(req.params.idEdition, req.query)
    .then(function (games) {
    res.status(200).json(games);
  });
}

export { getGames, createGame, deleteGame, updateGame, getGameByID, getGamesByEdition };

export default {
  getGames,
  createGame,
  deleteGame,
  updateGame,
  getGameByID,
  getGamesByEdition,
};
