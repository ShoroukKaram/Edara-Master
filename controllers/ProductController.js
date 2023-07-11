const productModel = require('../models/Product')
const CRUD = require('./CRUD');


class ProductController extends CRUD {
    constructor(){
        super()
    }

    static async add(req, res) {
        var product = new productModel(req.body.name, req.body.description, req.body.photo, req.body.stock);
        var x = await product.addNewProduct()
        if (x) {
            res.send("add successful")
        } else {
            res.send("add failed")
        }
    }

    static async get(req, res) {
        var product = new productModel();
        var result = await product.getProducts()
        if (result) {
            res.send(result);
        } else {
            res.send("no result")
        }
    }

    static async update(req, res) {
        const {product_id} = req.params;
        const data = req.body;
        var product = new productModel('', '', '', '');
        var x = product.updateProduct(product_id, data);
        if (x) {

            res.send("Update done")
        } else {
            res.send("can't Update")
        }
    }

    static async delete(req, res) {
        const {delete_product_id} = req.params;
        console.log(delete_product_id)
        var product = new productModel();
        var x = product.deleteProduct(delete_product_id);

        if (x) {
            res.send("delete done")
        } else {
            res.send("delete failed")
        }
    }

}

module.exports = ProductController 

