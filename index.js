
const express = require('express');
const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended:true}));
app.use(express.static('public'));
const session = require("express-session");

app.use(session({
    secret: 'ifpe',
    saveUninitialized: false,
    resave: false
    }));

    require("dotenv/config");
    
const FornecedorRoutes = require("./routes/FornecedorRoutes");
 app.use(FornecedorRoutes);
 const VendaRoutes = require("./routes/VendaRoutes");
 app.use(VendaRoutes);
 const UsuarioRoutes = require("./routes/UsuarioRoutes");
 app.use(UsuarioRoutes);

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI);
const FornecedorModel = require("./model/fornecedorModel");

app.get("/",function(req,res){
    res.render("index");
});
app.get("/logout", function(req, res){
    req.session.usuario = null;
    res.redirect("/usuarios/login");
});

app.use(function(req, res){
res.status(404).render("erro");
});

app.listen(process.env.PORT, function () {
    console.log("Rodando");
})


