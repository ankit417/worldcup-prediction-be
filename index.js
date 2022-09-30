require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const jwt = require("jsonwebtoken");

// const AppError = require('./src/utils')
// const errorHandler = require('./src/utils')

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.post("/login", (req, res) => {
//   const username = req.body.username;
//   const user = { name: username };
//   const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
//   res.json({ accessToken: accessToken });
// });

const authRoutes = require("./src/routes/auth.routes");
app.use("/api/v1/auth", authRoutes);

//TOURNAMENT ROUTES
const tournamentRoutes = require("./src/routes/tournament.route");
app.use("/api/v1/tournament", tournamentRoutes);

//GROUP ROUTES
const groupRoutes = require("./src/routes/groups.routes");
app.use("/api/v1/groups", groupRoutes);

//TEAM ROUTES
const teamRoutes = require("./src/routes/teams.routes");
app.use("/api/v1/teams", teamRoutes);

//GAME ROUTES
const gameRoutes = require("./src/routes/game.routes");
app.use("/api/v1/game", gameRoutes);

//PREDICTION ROUTES
const predictionRoutes = require("./src/routes/prediction.routes");
app.use("/api/v1/prediction", predictionRoutes);

//TIESHEET ROUTES [ADMIN ONLY]
const tieSheetRoutes = require("./src/routes/tieSheet.route");
app.use("/api/v1/tiesheet", tieSheetRoutes);

//TIESHEET PREDICTION ROUTES [USER]
const tieSheetPredictionRoutes = require("./src/routes/tieSheetPrediction.route");
app.use("/api/v1/tiesheetprediction", tieSheetPredictionRoutes);
//FILES
app.use("/files", express.static("assets"));

const server = app.listen(8081, function () {
  console.log("Server has started");
});
