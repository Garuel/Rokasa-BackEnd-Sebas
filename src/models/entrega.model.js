const { Schema, model } = require("mongoose");
const pedidoSchema = require("../models/pedido.model")
const mongoose = require('mongoose');
const entregaSchema = new Schema({

  pedido:{
    type: Object,
    required:true
  },
  created_at: {
    type: Date,
    default: new Date(),
  },
});



module.exports = model("Entrega", entregaSchema);