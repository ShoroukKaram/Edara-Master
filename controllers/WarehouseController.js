const warehouseModel=require('../models/Warehouse')
const CRUD = require('./CRUD');

class WarehouseController extends CRUD{
   constructor(){
      super()
   }

static async get(req,res){
   var warehouse = new warehouseModel();
   var results  = await warehouse.getwarehouses();
   if(results){
      res.send(results);
   }
   else {
      res.send("no result")
   }
   }

 static async add(req,res){
   var Warehouse = new warehouseModel(req.body.name,req.body.location,req.body.status,req.body.supervisor_id);
   res.send(await Warehouse.addWarehouse())
 }
 
 static async update(req,res){
   const {updated_id} = req.params;
  const data = req.body;
   var Warehouse = new warehouseModel();
   var x = Warehouse.updateWarehouse(updated_id, data);
   if (x){

      res.send("Update done")
   }
   else {
      res.send("can't Update")
   }
    


 }

static async delete(req,res){
   const {Warehouse_id} = req.params;
   console.log(Warehouse_id)
   var warehouse = new warehouseModel();
   var x = warehouse.deleteWarehouse(Warehouse_id);

   if(x){
      res.send("delete done")
   }
   else{
      res.send("delete failed")
   }
}
static async assignProduct_ToWarehouse(req,res){
   var warehouse = new warehouseModel();
   var x = warehouse.assignProduct_ToWarehouse(req,res)

   if(x){
      res.send("Successfully assigned")
   }
   else{
      res.send("failed")
   }
}
}
module.exports=WarehouseController;