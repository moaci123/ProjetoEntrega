const VendaModel = require("../model/vendaModel");



class VendaController{

    static async cadastrar(req, res){
        console.log(req.body._id);
        if (req.body._id == "") {
            const novoVenda = new VendaModel({
                    id: req.body.id ,
                    nome: req.body.nome,
                    quant: req.body.quant
          });
    
               await novoVenda.save();
                 res.redirect("/vendas?s=1");
        
                }  else {
                    await VendaModel.findOneAndUpdate({_id: req.body._id},
                    {
                        nome: req.body.nome,
                        quant: req.body.quant
                    });
                    res.redirect("/vendas?s=3");
                }
                    
}

    static async cadastrarGet(req, res) {
        const id = req.params.id
        const status = req.query.s;
        const nome = req.query.nome;
        const quant= req.query.quant; 
        let venda = {
            nome: req.query.nome,
            quant: req.body.quant
        }
        if (id != undefined) {
            venda = await VendaModel.findOne({_id: id});
        }

        res.render("venda/cadastrar", {venda, status});
    }
    static  async listar(req, res){
       const status = req.query.s;
       const vetorVendas = await VendaModel.find();
       res.render("venda/relatorio",{vetorVendas, status});
    }
    static async detalhar(req, res){
        const venda = await VendaModel.findOne({id: req.params.id});
        res.render("venda/detalhar", {venda});
        
    }
    static async remove (req, res){ 
        const venda =  await VendaModel.findOneAndDelete({id: req.params.id});
        res.redirect("/vendas?s=2");

}
}

module.exports = VendaController;