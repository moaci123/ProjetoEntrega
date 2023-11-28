const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vendaSchema = Schema({

    id: Number,
    nome: String,
    quant: Number
});

module.exports = mongoose.model("venda", vendaSchema);