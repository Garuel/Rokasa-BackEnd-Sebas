const { Schema, model } = require("mongoose");
const itemSchema = require("./schemas/item.model")

const pedidoSchema = new Schema({

  proveedor:{
    type: Object,
    required: true
    
  },

  productos:[{
    type: itemSchema
  }],

  created_at: {
    type: Date,
    default: new Date(),
  },
});



module.exports = model("Pedido", pedidoSchema);