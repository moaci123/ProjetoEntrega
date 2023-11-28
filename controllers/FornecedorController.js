const FornecedorModel = require("../model/fornecedorModel");



class FornecedorController{

    static async cadastrar(req, res){
        console.log(req.body._id);
    if (req.body._id == "") {
        const novoFornecedor = new FornecedorModel({
                id: req.body.id ,
                nome: req.body.nome,
                cnpj: req.body.cnpj
      });

           await novoFornecedor.save();
             res.redirect("/fornecedores?s=1");
    
            }  else {
                await FornecedorModel.findOneAndUpdate({_id: req.body._id},
                {
                    nome: req.body.nome,
                    cnpj: req.body.cnpj
                });
                res.redirect("/fornecedores?s=3");
            }
                }
    static async cadastrarGet(req, res){
        const id = req.params.id 
        let fornecedor = {}
        if (id != undefined) {
            fornecedor = await FornecedorModel.findOne({id: req.params.id}); 
        }    
            
        res.render("fornecedor/cadastrar", {fornecedor});            
    }

    static  async listar(req, res){
       const status = req.query.s;
       const vetorFornecedor = await FornecedorModel.find();
       res.render("fornecedor/relatorio",{vetorFornecedor, status});
    }
    static async detalhar(req, res){
        const fornecedor = await FornecedorModel.findOne({id: req.params.id});
        res.render("fornecedor/detalhar", {fornecedor});
        
    }
    static async remove (req, res){ 
        const fornecedor =  await FornecedorModel.findOneAndDelete({ id: req.params.id});
        res.redirect("/fornecedores?s=2");
    }

    static async atualizar (req, res){ 
        const fornecedor = await FornecedorModel.findOne({id: req.params.id});
        res.render("fornecedor/atualizar", {fornecedor});
    }


    }


module.exports = FornecedorController;