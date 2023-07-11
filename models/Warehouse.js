const db =require('../config/db')


class WarehouseModel {
    constructor(name='',location='',status='',supervisor_id=''){
      this.name = name;
      this.location = location;
      this.status = status;
      this.supervisor_id = supervisor_id;
    }

    getwarehouses(){

    return new Promise (resolve =>{
    db.query("select * from warehouses",[],(error,result)=>{
        if(!error){
            resolve(result )
        }
    })

    })
}

    deleteWarehouse(Warehouse_id){
        return new Promise(resolve =>{
            db.query("delete from warehouses where ?",{warehouse_id:Warehouse_id},(error,result)=>{
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

    addWarehouse(){
        return new Promise(resolve =>{ 
      
            db.query("SELECT * FROM `warehouses` WHERE warehouses.supervisor_id = ?",[this.supervisor_id],async(error,result)=>{
               
                if(result.length >0){
                    console.log()
                    resolve("supervisor already manage warehouse");
                }else{
                    db.query("INSERT INTO warehouses (name, location,status, supervisor_id) VALUES (?, ?, ?, ?)",
                    [this.name, this.location, this.status, this.supervisor_id],(error,result)=>{
                    if(!error){
                        resolve("Add success!");
                    }
                    else{
                        resolve("Failed to add!")
                    }
                })
                }

            });
               
        })
    }

    updateWarehouse(updated_id, data){
        console.log(updated_id)
        return new Promise(resolve =>{  
            db.query("UPDATE warehouses SET? WHERE 	warehouse_id  = ?"
            ,[{name:data.name,location:data.location,status:data.status,supervisor_id:data.supervisor_id},updated_id],(error,result)=>{
            if(!error){
                resolve(true)
            }
            else{
                resolve(false)
            }
    })
    
    }) 
       
    }
    assignProduct_ToWarehouse(req,res){
        console.log(req.body)
        return new Promise(resolve =>{ 
            db.query("INSERT INTO product_warehouse (product_id, warehouse_id,warehouse_stock) VALUES (?, ?, ?)",
            [req.body.product_id, req.body.warehouse_id,req.body.warehouse_stock],(error,result)=>{
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


module.exports=WarehouseModel;