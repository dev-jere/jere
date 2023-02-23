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
            res.status(400).send('A farmer already exsist with this data...');

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
            res.status(201).send('Product Added successfully.')
        }
    } catch (err) {
        res.status(500).send('Service not available at the moment, please try again in 15mins...');
    }
}]

exports.getProduct = [ async (req, res) => {
    try {
        const { id } = req.body;
        const product = await Product.findOne({barcode: id});
        res.status(200).send(product);
    } catch (err) {
        res.send('Service error, please try again is 15mins...');
    }
}]

