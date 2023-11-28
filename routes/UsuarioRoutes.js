const express = require("express");
const routes = express.Router();
const auth = require("../middlewares/usuarioAuth");
const usuarioController = require("../controllers/UsuarioController");
routes.post("/usuarios/", usuarioController.cadastrar);

routes.get("/usuarios/cadastrar", usuarioController.cadastrarGet);
routes.get("/usuarios/",auth, usuarioController.listar);
routes.get("/usuarios/login", usuarioController.loginGet);
routes.post("/usuarios/login", usuarioController.loginPost);

routes.get("/usuarios/cadastrar/:id?",auth, usuarioController.cadastrarGet);
routes.get("/usuarios/remove/:id", usuarioController.remove);
routes.get("/usuarios/:id",auth, usuarioController.detalhar);


module.exports = routes;