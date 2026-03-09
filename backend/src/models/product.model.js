const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    category: {type: String, required: true},
    image: {type: String},
    stock: {type: Number, default: 0},
    seller: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    ratings: {type: Number, default: 0},
    reviews: [{type: mongoose.Schema.Types.ObjectId, ref: 'Review'}],
    
}, {timestamps: true});

module.exports = mongoose.model('Product', productSchema);

