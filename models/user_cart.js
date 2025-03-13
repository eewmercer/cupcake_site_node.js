const mongoose = require('mongoose');
const Cupcake = require('./cupcake')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    cupcake: { //cupcake is attributed to user
        type: Schema.Types.ObjectId, ref: 'Cupcake'
    }
});

module.exports = mongoose.model('User', userSchema)
