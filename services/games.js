import { MongoClient, ObjectId } from "mongodb";
import VoteService from "./votes.js";

const clientDB = new MongoClient("mongodb://127.0.0.1:27017");
const db = clientDB.db("AH_TP1_2023");
const GameCollection = db.collection("Games");

/**
 * Devuelve el listado de juegos
 * @param {{Object}} filter Filtros
 * @returns {[Object]}
 */
async function getGames(filter = {}) {
  await clientDB.connect();
  const filterMongo = filterQueryToMongo(filter);
  return GameCollection.find(filterMongo).toArray();
}

/**
 * Guarda los datos de un juego
 * @param {Object} game Datos del juego
 * @returns {Object}
 */
async function createGame(game) {
  await clientDB.connect();
  const newGame = { ...game, points: 0 };
  /// side effect
  await GameCollection.insertOne(newGame);
  return newGame;
}

/**
 * Devuelve los datos de un juego
 * @param {string} id ID de un juego
 * @returns {Object}
 */
async function getGameByID(id) {
  await clientDB.connect();
  return GameCollection.findOne({ _id: new ObjectId(id) });
}

/**
 * Actualiza los datos del juego
 * @param {string} id ID del juego
 * @param {Object} game Datos a modificar en el juego
 * @returns {Object}
 */
async function updateGame(id, game) {
  await clientDB.connect();
  let updatedGame = null;
  const previousValues = await getGameByID(id);
  updatedGame = {
    ...previousValues,
    ...game,
  };
  if (updatedGame._id) {
    const update = await GameCollection.updateOne(
      { _id: new ObjectId(`${id}`) },
      {
        $set: updatedGame,
        /*  name: updatedGame.name,
          genre: updatedGame.genre,
          members: updatedGame.members, 
          edition: updatedGame.edition, 
          points: updatedGame.points,   */
      }
    );
    return update;
  }
}

/**
 * Borrado lógico del registro
 * @param {string} id ID del juego
 * @returns {Promise}
 */
async function deleteGame(id) {
  await clientDB.connect();
  return updateGame(id, { deleted: true });  
}

function filterQueryToMongo(filter) {
  const filterMongo = { deleted: false};
  for (const field in filter) {
    if (isNaN(filter[field])) {
      filterMongo[field] = filter[field];
    } else {
      filterMongo[field] = {
        $eq: parseInt(filter[field]),
      };
    }
  }
  return filterMongo;
}

/**
 * Calcula el promedio de los puntos para un juego.
 * @param {[{Object}]} points Array de votos de un juego en particular
 * @returns {Object}
 */
async function calculateAvg(points) {
  let resp = {
    gameplay: 0,
    art: 0,
    sound: 0,
    theme: 0,
  };
  for (const element of points) {
    resp.gameplay += element.gameplay;
    resp.art += element.art;
    resp.sound += element.sound;
    resp.theme += element.theme;
  }
  resp.gameplay = resp.gameplay / points.length;
  resp.art = resp.art / points.length;
  resp.sound = resp.sound / points.length;
  resp.theme = resp.theme / points.length;
  return resp;
}

/**
 * Valida si existe el juego
 * @param {string} id ID del juego
 * @returns {Promise}
 */
async function existGame(id) {  
  await clientDB.connect();
  const resp=await GameCollection.findOne({ _id: new ObjectId(id) });  
  if(resp){
    return true
  }  
  return false;
}

/**
 * Devuelve los datos de un juego con los datos de las categorías
 * @param {string} id ID del juego
 * @returns {Object}
 */
async function getGameByIDToShow(id) {
  await clientDB.connect();
  const resp = await GameCollection.findOne({ _id: new ObjectId(id) });
  const categories = await VoteService.getVotesByGame(id);
  const points = await calculateAvg(categories);
  if (isNaN(points.gameplay)) {
    return resp;
  }
  return {
    ...resp,
    ...points,
  };
}

/**
 * Devuelve los juegos de una edición en particular
 * @param {integer} year 
 * @param {Object} filter 
 * @returns {[Object]}}
 */
async function getGamesByEdition(year, filter) {
  await clientDB.connect();
  let condition;
  if (!Object.keys(filter).length) {
    // Quiero ver si filtro esta vacío
    return GameCollection.find({
      edition: { $eq: parseInt(year) },
    })
      .sort({ points: -1 })
      .toArray();
  } else {
    return GameCollection.find({
      edition: { $eq: parseInt(year) },
      genre: filter.genre,
    })
      .sort({ points: -1 })
      .toArray();
  }
}

export {
  getGames,
  createGame,
  updateGame,
  deleteGame,
  existGame,
  getGameByIDToShow,
  getGamesByEdition,
  getGameByID
};

export default {
  getGames,
  createGame,
  updateGame,
  deleteGame,
  existGame,
  getGameByIDToShow,
  getGamesByEdition,
  getGameByID
};
