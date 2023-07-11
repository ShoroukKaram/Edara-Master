const adminModel=require('../models/Admin')
const CRUD = require('./CRUD');

class AdminController extends CRUD{
   constructor(){
      super();
   }
static async get(req,res){
   var admin = new adminModel();
   var results  = await admin.getSupervisors();
   if(results){
      res.send(results);
   }
   else {
      res.send("no result")
   }
      }

 static async add(req,res){
   var admin = new adminModel(req.body.email,req.body.password,req.body.phone,req.body.status,"supervisor");
   var x =await admin.addNewSupervisor()
   console.log(x);
   if(x){
      res.send("add successful")
   }
   else{
      res.send("add failed")
   }
   
 }

 static async update(req,res){
   const {id} = req.params;
  const data = req.body;
   var admin = new adminModel();
   var x = admin.updateSupervisor(id, data);
   if (x){

      res.send("Update done")
   }
   else {
      res.send("can't Update")
   }
    


 }

static async delete(req,res){
   const {deleted_id} = req.params;
   console.log(deleted_id)
   var admin = new adminModel();
   var x = admin.deleteSupervisor(deleted_id);

   if(x){
      res.send("delete done")
   }
   else{
      res.send("delete failed")
   }
}

static async getAllRequest(req,res){
   var admin = new adminModel();
   var results  = await admin.getAllRequest();
   if(results){
      res.send(results);
   }
   else {
      res.send("no result")
   }
}
static async RequestAccepted(req,res){
   var admin = new adminModel();
   var x  = await admin.RequestAccepted(req.body.request_id);
   if(x){
      
      res.send("update done")
   }
   else{
      res.send("update failed")
   }
 
}

static async RequestRejected(req,res){
   var admin = new adminModel();
   var x  = await admin.RequestRejected(req.body.request_id);
   if(x){
      res.send("update done")
   }
   else{
      res.send("update failed")
   }
 
}

static async getPendingRequest(req,res){
   var admin = new adminModel();
   var results  = await admin.getPendingRequest();
   if(results){
      res.send(results);
   }
   else {
      res.send("no result")
   }
}


}

module.exports=AdminController;