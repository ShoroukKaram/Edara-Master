const db =require('../config/db')
const User = require('../controllers/User')


class AdminModel extends User {
    constructor(email='',password='',phone='',status='',type=''){
       super(email,password,phone,status,type)
    }

    getSupervisors(){

        return new Promise (resolve =>{
        db.query("select * FROM `users` WHERE id != 1",[],(error,result)=>{
            if(!error){
                resolve(result )
            }
        })

        })
    }

    addNewSupervisor() {
        return new Promise(resolve =>{
            
        db.query("select * from users where email = ?",[this.email],async(error,result)=>{
            if(error){
                console.log(error);
            }
            if(result.length >0){
                console.log('That email is already in use')
                resolve(false);
                return;
            }

            db.query("INSERT INTO users (email, password, phone, status, type) VALUES (?, ?, ?, ?, ?)",
            [this.email, this.password, this.phone, this.status, this.type],(error,result)=>{
            if(!error){
                resolve(true)
            }
            else{
                console.log(error)
                resolve(false)
        
            }
        })
        });
    })
    }

    updateSupervisor(id,data){
        return new Promise(resolve =>{
            
            db.query("UPDATE users SET? WHERE id = ?"
            ,[{email:data.email,password:data.password,phone:data.phone,status:data.status,type:data.type},id],(error,result)=>{
            if(!error){
                resolve(true)
            }
            else{
                resolve(false)
            }
    })

    }) 
    
    
    }

    deleteSupervisor(deleted_id){
        console.log(deleted_id)
        return new Promise(resolve =>{
            db.query("delete from users where ?",{id:deleted_id},(error,result)=>{
            if(!error){
                result.message = 'success'
                resolve(true)
            }
            else{
                resolve(false)
            }
    })

    }) 
    
    }

    getAllRequest(){
        return new Promise (resolve =>{
            db.query("select * from requests",[],(error,result)=>{
                if(!error){
                    resolve(result )
                }
            })
    
            })
    }

    getPendingRequest(){
        return new Promise (resolve =>{
            db.query("select * from requests where status ='pending' ",[],(error,result)=>{
                if(!error){
                    resolve(result )
                }
            })
    
            })
    }

    UpdateTotalStock(request_id){
        const sqlInc = `
    UPDATE products 
    SET stock = stock + ? 
    WHERE product_id = ?;
    `;
    const sqlDec = `
    UPDATE products 
    SET stock = stock - ? 
    WHERE product_id = ?;
    `;
    db.query('SELECT product_id, quantity ,request_type FROM requests WHERE request_id = ?;', [request_id], (err, rows) => {
    if (err) {
        console.error(err);
        return;
    }
    const { product_id, quantity,request_type } = rows[0];
    if(request_type == 'increment') {   db.query(sqlInc, [quantity, product_id], (err, result) => {
        if (err) {
        console.error(err);
        return;
        }
        console.log(`Successfully updated `);
    });}
    else{
        db.query(sqlDec, [quantity, product_id], (err, result) => {
            if (err) {
            console.error(err);
            return;
            }
            console.log(`Successfully updated `);
        });
    }
 
    });

    }

    UpdateStockInWarehouse(request_id){
        const sqlInc = `
        UPDATE product_warehouse
        SET warehouse_stock = warehouse_stock + ? 
        WHERE product_id = ? AND warehouse_id  = ?;
        `;
        const sqlDec = `
        UPDATE product_warehouse 
        SET warehouse_stock = warehouse_stock - ? 
        WHERE product_id = ? AND warehouse_id  = ?;
        `;
     
             db.query('SELECT product_id, quantity ,request_type,supervisor_id FROM requests WHERE request_id = ?;', [request_id], (err, rows) => {
            if (err) {return}
            const { product_id, quantity,request_type,supervisor_id } = rows[0];
            var warehouse_id;
            db.query('SELECT warehouse_id FROM warehouses WHERE supervisor_id = ?;', [supervisor_id], (err, rows) => {
                if (err) {return}
                warehouse_id =rows[0].warehouse_id;
                console.log("Warehouse id" + warehouse_id)
                if(request_type == 'increment') { db.query(sqlInc, [quantity,product_id, warehouse_id], (err, result) => {
                    if (err) {return}
                    console.log(`Successfully updated Increment`);
                });}
                else{
                    db.query(sqlDec, [quantity,product_id, warehouse_id], (err, result) => {
                        if (err) {return}
                        console.log(`Successfully updated Decrement`); 
                    });
                }
            });
          
        });
        
       
    }

    RequestAccepted(request_id){
        console.log(request_id)
        console.log(typeof request_id)
        return new Promise (resolve =>{
            db.query("update requests set status='approved' where request_id=?", [request_id],(error,result)=>{
                if(!error){
                    this.UpdateTotalStock(request_id)
                    this.UpdateStockInWarehouse(request_id)
                    resolve(true)
                }
                else{
                    resolve(false)
                }
            })
    
            })

    }

    RequestRejected(request_id){
        console.log(request_id)
        console.log(typeof request_id)
        return new Promise (resolve =>{
            db.query("update requests set status='rejected' where request_id=?", [request_id],(error,result)=>{
                if(!error){
                    resolve(true)
                }
                else{
                    resolve(false)
                }
            })
    
            })

    }

}


module.exports=AdminModel;