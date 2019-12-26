import path from "path";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import middlewares from "./middlewares";
import controllers from "./controllers";

const app = express();

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "localhost";
const API_BASE = "/api/v1";

var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
  methods: ["GET", "PUT", "POST", "DELETE", "PATCH", "HEAD"],
  preflightContinue: false,
  exposedHeaders: ["Resource"]
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.text({ type: "text/html" }));
app.use(cors(corsOptions));
app.use(middlewares.messageHandler);
app.use(middlewares.authorizationHandler);

app.use(`${API_BASE}/auth`, controllers.authentication);
app.use(`${API_BASE}/users`, controllers.users);
app.use(`${API_BASE}/roles`, controllers.roles);
app.use(`${API_BASE}/permissions`, controllers.permissions);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.listen(PORT, HOST, function() {
  console.log("Server has started on port " + PORT);
});
