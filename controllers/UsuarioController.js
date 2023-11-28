const UsuarioModel = require("../model/usuarioModel");
const bcryptjs = require("bcryptjs");


class UsuarioController {

    static async cadastrar(req, res) {
        const usuario = await UsuarioModel.findOne({ email: req.body.email });
        const salt = bcryptjs.genSaltSync();
        const hash = bcryptjs.hashSync(req.body.senha, salt);
        console.log(req.body);
        if (usuario == null) {
            if (req.body._id == "") {
                const novoUsuario = new UsuarioModel({
                    nome: req.body.nome,
                    email: req.body.email,
                    senha: hash
                });

                await novoUsuario.save();
                res.redirect("/Usuarios?s=1");

            } else {
                
                await UsuarioModel.findOneAndUpdate({ _id: req.body._id },
                    {
                        nome: req.body.nome,
                        email: req.body.email,
                        senha: hash
                    });
                res.redirect("/usuarios?s=3");
            }
        } else {
            res.redirect(`/usuarios/cadastrar?s=1&nome=${req.body.nome}&email=${req.body.email}`);
        }
    }

    static loginGet(req,res){
        const status = req.query.s;
        res.render("usuario/login",{status});
    }
    
    static async loginPost(req, res){
        const usuario = await UsuarioModel.findOne({email: req.body.email});

        if(usuario != null) { 
            if (bcryptjs.compareSync(req.body.senha, usuario.senha)){
                req.session.usuario = usuario.email;
                res.redirect("/");
            }  else {
                res.redirect(`/usuarios/login?s=4&email=${req.body.email}`);
                console.log(usuario);
            }
         }else {
        res.redirect(`/usuarios/login?s=4&email=${req.body.email}`);
                console.log(usuario);
    }
} 
    
static cadastrarGet(req, res){
    const status = req.query.s;
    let usuario = {
        email: req.query.email,
        nome: req.query.nome
    };
    if(req.session.usuario == null){
        res.render("usuario/cadastrar", {usuario, status});
    }else{
        res.redirect("/");
    }
    
}

    static async listar(req, res) {
        const status = req.query.s;
        const vetorUsuario = await UsuarioModel.find();
        res.render("usuario/relatorio", { vetorUsuario, status });
    }
    static async detalhar(req, res) {
        const usuario = await UsuarioModel.findOne({ _id: req.params.id });
        res.render("usuario/detalhar", { usuario });

    }
    static async remove(req, res) {
        const usuario = await UsuarioModel.findOneAndDelete({ _id: req.params.id });
        res.redirect("/usuarios?s=2");
    }

    static async atualizar(req, res) {
        const usuario = await UsuarioModel.findOne({ _id: req.params.id });
        res.render("usuario/atualizar", { usuario });
    }


}


module.exports = UsuarioController;