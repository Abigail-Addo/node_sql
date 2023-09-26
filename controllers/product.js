const Product = require('../model/product')

exports.getProducts = async (req, res) => {

    try {
        const products = await Product.query().select('*');
        if(!products){
            throw new Error('failed to get product from db')
        }
        res.status(200).json(products)
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error'); //error
      }

}