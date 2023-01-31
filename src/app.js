import express from "express";
import swaggerUI from "swagger-ui-express";
import YAML from "yamljs";

// import { path } from "path";

import autobusRoutes from "./routes/boletos.routes.js";
import maletaRoutes from "./routes/maletas.routes.js";
import usuarioRoutes from "./routes/usuario.routes.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

const swaggerDoc = YAML.load("./yaml/doc_apiUser.yaml");

app.use("/api-doc/user", swaggerUI.serve, swaggerUI.setup(swaggerDoc));

app.use(autobusRoutes);
app.use(maletaRoutes);
app.use(usuarioRoutes);

export default app;
