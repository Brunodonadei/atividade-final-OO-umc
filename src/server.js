import express from "express";
import ProdutoRoutes from "./routes/ProdutoRoutes.js";
import ReservaRoutes from "./routes/ReservaRoutes.js";
import Database from "./utils/Database.js";
import Seed from "./seed/Seed.js";
import { setupSwagger } from "./config/swagger.js";

const app = express();
app.use(express.json({ limit: "5mb" }));

Database.getInstance();

Seed.run();

setupSwagger(app);

app.use("/produtos", ProdutoRoutes.create());
app.use("/reservas", ReservaRoutes.create());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Servidor rodando em http://localhost:${PORT}`)
);
