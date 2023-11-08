import { gameEditSchema, gameNewSchema } from "../schemas/game.js";

/**
 * Controla que los datos ingresados sean válidos cuando se crea un juego
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
function validateNewGame(req, res, next) {
  gameNewSchema.validate(req.body, { stripUnknown: true, abortEarly: true })
    .then(async function (game) {
      req.body = game;
      req.body.points = 0;      
      next();
    })
    .catch(function (err) {        
      res.status(400).json(err);
    });
}

/**
 * Controla que los datos ingresados sean válidos cuando se actualiza un juego
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
function validateEditGame (req, res, next) {
    gameEditSchema.validate(req.body, { stripUnknown: true, abortEarly: true })
    .then(async function (game) {
      req.body = game;      
      next();
    })
    .catch(function (err) {        
      res.status(400).json(err);
    });
}

export { validateNewGame, validateEditGame };

export default { validateNewGame, validateEditGame };