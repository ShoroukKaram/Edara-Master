const session = require('express-session');
const db =require('../config/db')

const getWarehouseId=(supervisor_id)=>{
    return new Promise (resolve =>{
        db.query("select warehouse_id from warehouses where supervisor_id =?",[supervisor_id],(error,result)=>{
            if(!error){
                resolve(result[0].warehouse_id )
            }
        })

        })

 }
class User {
    constructor(email='',password='',phone='',status='',type=''){
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.status = status;
        this.type = type;
    }
    static async login(req, res,next){
        var email = req.body.email;
        var password = req.body.password;

        if(email && password){
            db.query("select * from users where email = ? and password =?",[email,password],async function(err,data){
                if(data.length > 0){
                    req.session.user_id = data[0].id;
                    if(data[0].type == 'admin'){
                        res.send({ message: "login successful Admin", session: req.session });
                    }
                    else{
                        // req.session.warehouse_id= await getWarehouseId(data[0].id)
                      
                        res.send({ message: "login successful Supervisor", session: req.session });

                        
                    }
                    
                }else{
                    res.send({ message: "Incorrect email or password" });
                }
            })

        }else{
            res.send({message:"please enter your email and password"})
            res.end();
        }
        
    }
   
    static async logout(req,res,next){
        if (req.session) {
            req.session.destroy(function(err) {
                if (err) {
                    next(err);
                } else {
                    res.send("logout succesfully");
                }
            });
        } else {
            res.send("already logged out");
        }
    }
}

module.exports=User;