const {Schema, model} = require("mongoose");

const proveedorSchema = new Schema({
    DNI: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    empresa:{
        type: String,
        required: true
    },
    descripcion_Empresa:{
        type:String,
        required: true
    },
    created_at: {
        type: Date,
        default: new Date(),
    },
})

module.exports = model("Proveedor", proveedorSchema)