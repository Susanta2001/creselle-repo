const { type } = require('@testing-library/user-event/dist/type');
const mongoose = require('mongoose');
const {Schema} = mongoose;

const ProductSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})
module.exports = mongoose.model('Product', ProductSchema);