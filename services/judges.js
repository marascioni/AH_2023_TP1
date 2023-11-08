import { MongoClient, ObjectId } from "mongodb";

const clientDB = new MongoClient("mongodb://127.0.0.1:27017");
const db = clientDB.db("AH_TP1_2023");
const JudgeCollection = db.collection("Judges");

/**
 * Devuelve los datos de un juez
 * @param {string} id ID de un juez
 * @returns {Object}
 */
async function getJudgeByID(id) {
  await clientDB.connect();
  return JudgeCollection.findOne({ _id: new ObjectId(id) });
}

/**
 * Valida si existe el juez
 * @param {string} id ID del juez
 * @returns {Promise}
 */
async function existJudge(id) {  
  await clientDB.connect();
  const resp=await JudgeCollection.findOne({ _id: new ObjectId(id) });  
  if(resp){
    return true
  }  
  return false;
}

export { getJudgeByID, existJudge};

export default {
  getJudgeByID,
  existJudge
};
