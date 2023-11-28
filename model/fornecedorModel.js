const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fornecedorSchema = Schema({

    id: Number,
    nome: String,
    cnpj: Number
});

module.exports = mongoose.model("fornecedor", fornecedorSchema);