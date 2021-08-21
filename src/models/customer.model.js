const {Schema, model}= require("mongoose");

const customerSchema = new Schema({
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
    created_at: {
        type: Date,
        default: new Date(),
    },
});

module.exports = model("Customer", customerSchema);