const express = require("express");
const routes = express.Router();
const auth = require("../middlewares/usuarioAuth");

const fornecedorController = require("../controllers/FornecedorController");
routes.post("/fornecedores/", fornecedorController.cadastrar);        

routes.get("/fornecedores/cadastrar",fornecedorController.cadastrarGet);
routes.get("/fornecedores",auth, fornecedorController.listar);
routes.get("/fornecedores/:id",auth, fornecedorController.detalhar);
routes.get("/fornecedores/cadastrar/:id?", fornecedorController.cadastrarGet);
routes.get("/fornecedores/remove/:id",auth, fornecedorController.remove);


module.exports = routes;