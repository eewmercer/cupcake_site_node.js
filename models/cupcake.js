const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cupcakeSchema = new Schema({
    title: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Cupcake', cupcakeSchema)