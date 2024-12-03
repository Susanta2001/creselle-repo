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
    },
    category: {
        type: String,
        required: true
    },
    images: [{ // Array of image paths
        type: String,
        required: true
    }],
    mainImage: { // Reference to the main image
        type: String,
        required: true
    }
    
})
module.exports = mongoose.model('Product', ProductSchema);