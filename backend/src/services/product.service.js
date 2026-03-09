const Product = require('../models/product.nodel');

const createProduct = async(productData) =>{
    const product = new Product(productData);
    await product.save();
    return product;
};

const getAllProducts = async() =>{
    return await Product.find({}).populate('seller');
};

const getProductById = async(productId) =>{
    const product = new Product.findById(productId);
    if(!product){
        throw new Error('Product not found');
    }
    return product;
};

const updateProduct = async(productId, productData) =>{
    const product = await Product.findByIdAndUpdate(
        productId, productData,
        {new: true, runValidators: true}    
    );
    if(!product){
        throw new Error('Product not found');
    }
    return product;
}

const deleteProduct = async(productId) =>{
    const product = await Product.findByIdAndDelete(productId);
    if(!product){
        throw new Error("Product not found");
    }
    return product;
}

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
};