const { Schema, model } = require("mongoose");


const ventaSchema = new Schema({
  codigo: {
    type: String,
    required: true,
    unique: true,
  },
  customer:{
    type: Object,
    required: true
  },
  vendedor: {
    type: String,
    required: true,
  },
  monto:{
      type: Number,
      required: true
  },
  created_at: {
    type: Date,
    default: new Date(),
  },
});



module.exports = model("Venta", ventaSchema);