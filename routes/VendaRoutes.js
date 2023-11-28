const express = require("express");
const routes = express.Router();
const auth = require("../middlewares/usuarioAuth");

const vendaController = require("../controllers/VendaController");
routes.post("/vendas/", vendaController.cadastrar);
routes.get("/vendas/cadastrar",vendaController.cadastrarGet);
routes.get("/vendas/",auth, vendaController.listar);
routes.get("/vendas/cadastrar/:id?", vendaController.cadastrarGet);
routes.get("/vendas/remove/:id",auth , vendaController.remove);
routes.get("/vendas/:id", auth,vendaController.detalhar);

module.exports = routes;