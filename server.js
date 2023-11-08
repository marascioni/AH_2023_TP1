import express from "express";
import GamesRoute from "./routes/games.js";
import JudgesRoute from "./routes/judges.js";
import VotesRoute from "./routes/votes.js";
import EditionRoute from "./routes/editions.js";

const app = express();
app.use(express.json()); // interpreta el body cuando viene un JSON

app.use(GamesRoute);
app.use(JudgesRoute);
app.use(VotesRoute);
app.use(EditionRoute);

app.listen(2023, function () {
  console.log("Server escuchando en http://localhost:2023");
});
