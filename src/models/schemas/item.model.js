const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    producto: {
        type: mongoose.Types.ObjectId,
        ref: 'Product'
    },
    cantidad: {
        type: Number
    }   
});

module.exports = itemSchema;