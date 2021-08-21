const {Schema, model} = require("mongoose");

const productSchema = new Schema({
    nombre:{
        type: String,
        required: true
    },
    stock:{
        type: Number,
        required: true,
        default: 0
    },
    unidadVenta:{
        type: String,
        required: true,
        default: 0
    },
    precioVenta:{
        type: Number,
        required: true,
        default: 0
    },
    precioCompra:{
        type: Number,
        required: true,
        default: 0
    },
    sku:{
        type: String,
        required: true
    },
    created_at:{
        type: Date,
        default: new Date()
    }
})

module.exports = model("Product", productSchema)