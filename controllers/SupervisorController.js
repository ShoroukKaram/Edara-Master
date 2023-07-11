const supervisorModel=require('../models/Supervisor')

class SupervisorController {
    static async request(req,res){
        var supervisor = new supervisorModel();
        var x = supervisor.request(req,res);
        if(x){
            res.send({message:"request success"});
        }else{
            res.send({message:"request faild"});
        }
    }
    static async getProductPerWarehouse(req, res) {
        try {
            const supervisor = new supervisorModel();
            const result = await supervisor.getProductPerWarehouse(req);
            console.log(result);
            res.send(result);
        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    }
    static async getRequests(req,res){
        var supervisor = new supervisorModel();
        var result = await supervisor.getRequests(req,res);
        console.log(result);
        res.send(result);
    }
}

module.exports=SupervisorController;