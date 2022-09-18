const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// const AppError = require('./src/utils')
// const errorHandler = require('./src/utils')

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//TOURNAMENT ROUTES
const tournamentRoutes = require("./src/routes/tournament.route");
app.use("/api/v1/tournament", tournamentRoutes);

//GROUP ROUTES
const groupRoutes = require("./src/routes/groups.routes");
app.use("/api/v1/groups", groupRoutes);

//TEAM ROUTES
const teamRoutes = require("./src/routes/teams.routes");
app.use("/api/v1/teams", teamRoutes);

//FILES
app.use("/files", express.static("assets"));

const server = app.listen(8081, function () {
  console.log("Server has started");
});
