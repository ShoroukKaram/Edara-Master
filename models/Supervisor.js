const db = require('../config/db')
const User = require('../controllers/User')

class SupervisorModel extends User {
    constructor(email='',password='',phone='',status='',type=''){
        super(email,password,phone,status,type)
     }
    request(req, res) {
        const date = new Date();
        const options = {day: '2-digit', month: '2-digit', year: 'numeric'};
        const formattedDate = date.toLocaleDateString('en-GB', options);
        console.log(typeof parseInt(req.body.product_id))
        console.log(JSON.stringify(req.body))
        return new Promise(resolve => {

                db.query("INSERT INTO requests (supervisor_id , product_id , quantity,status, date, request_type) VALUES (?, ?, ?,?, ?, ?)",
                    [req.body.user_id, parseInt(req.body.product_id), parseInt(req.body.quantity), 'pending', formattedDate, req.body.request_type], (error, result) => {
                        if (!error) {
                            resolve(result)
                        } else {

                        }
                    }
                )
                // this.updateProductQuantity(req,res);
                // var result= this.getProductQuantity(req.product_id)
                // console.log(typeof result) //product where i want increase prod_id quantity type
                // this.updateProductQuantity(result,req);


            }
        )

    }


    async getProductPerWarehouse(req) {
        return new Promise((resolve, reject) => {
            db.query('SELECT products.product_id, name, description, photo, warehouse_stock FROM products JOIN product_warehouse WHERE product_warehouse.warehouse_id = ? AND product_warehouse.product_id = products.product_id', [req.params.warehouse_id], (error, result) => {
                if (error) {
                    console.error(error);
                    reject(error);
                } else {
                    resolve(result);
                }
            })
        })
    }

    getRequests(req, res) {
        return new Promise(resolve => {
            db.query("select * from requests WHERE supervisor_id = ?", [req.params.user_id], (error, result) => {
                if (!error) {
                    resolve(result)
                }
            })

        })
    }
}


module.exports = SupervisorModel;