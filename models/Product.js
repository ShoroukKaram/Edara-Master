const db = require('../config/db')

class ProductModel {
    constructor(name = '', description = '', photo = '', stock = '') {
        this.name = name;
        this.description = description;
        this.photo = photo;
        this.stock = stock;
    }


    getProducts() {
        return new Promise(resolve => {
            db.query("select * FROM `products`", [], (error, result) => {
                if (!error) {
                    resolve(result)
                }
            })

        })
    }

    addNewProduct() {
        return new Promise(resolve => {

            db.query("INSERT INTO products (name, description, photo,stock) VALUES (?, ?, ?, ?)", [this.name, this.description, this.photo, this.stock], (error, result) => {
                if (!error) {
                    resolve(true)
                } else {
                    console.log(error)
                    resolve(false)

                }
            })
        });

    }


    updateProduct(product_id, data) {
        return new Promise(resolve => {
            db.query("UPDATE products SET? WHERE product_id = ?"
                , [{
                    name: data.name,
                    description: data.description,
                    photo: data.photo,
                    stock: data.stock
                }, product_id], (error, result) => {
                    if (!error) {
                        resolve(true)
                    } else {
                        resolve(false)
                    }
                })

        })


    }

    deleteProduct(delete_product_id) {

        return new Promise(resolve => {
            db.query("delete from products where ?", {product_id: delete_product_id}, (error, result) => {
                if (!error) {
                    result.message = 'success'
                    resolve(true)
                } else {
                    resolve(false)
                }
            })

        })

    }

}


module.exports = ProductModel;