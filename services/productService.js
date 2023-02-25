/**
 * This is the product service
 */
const Product = require('../models/productModel'); //Farmer model


//Register a new Farmer for USSD Access
exports.createProduct = [async (req, res)=> {
    try {
        const { title, description, quantity, category, barcode, price, supplier_price } = req.body;
        const product = await Product.findOne({barcode: barcode}); //Checking database if user already exists

        if (product) {
            res.status(400).send('A product already exsist with this data...');

        } else {
            const newProduct = new Product({
                title,
                description,
                quantity,
                category,
                barcode,
                price,
                supplier_price
            });
            await newProduct.save();
            res.send('Product Added successfully.');
        }
    } catch (err) {
        console.log(err);
    }
}]

exports.getProduct = [ async (req, res) => {
    try {
        const { id } = req.body;
        const product = await Product.findOne({barcode: id});
        if (!product) {
            res.json('Incorrect Barcode or Product Doesnt Exist in Databae');
        } else {
            res.status(200).json({product});
        }
    } catch (err) {
        console.log(err);
    }
}]

exports.getAllProducts = [ async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({'products':products});
    } catch (err) {
        res.status(400).send('Service error, please try again is 15...');
    }
}]

