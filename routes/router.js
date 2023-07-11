const router=require ('express').Router();
const adminAuth = require ('../middlewares/admin.js');


const path = require ('path');
const multer = require('multer');


const storage = multer.diskStorage({
    destination : '../views/images/',
    filename : (req,file,cb) =>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
})

const upload = multer({
    storage:storage 
})



const adminControler=require('../controllers/AdminControler.js')
const warehouseController = require('../controllers/WarehouseController')
const productController= require('../controllers/ProductController')
const User = require('../controllers/User.js')
const supervisorController = require('../controllers/SupervisorController')



router.post('/login',User.login);
router.get('/logout', User.logout)
                     //ADMIN
router.get('/supervisor',adminAuth,adminControler.get)
router.post('/supervisor',adminControler.add)
router.delete("/supervisor/:deleted_id",adminAuth,adminControler.delete)
router.put("/supervisor/:id",adminAuth,adminControler.update)
router.get("/request",adminAuth,adminControler.getAllRequest)

router.put('/updateRequestAccept',adminAuth,adminControler.RequestAccepted)
router.put('/updateRequestReject',adminAuth,adminControler.RequestRejected)


router.get('/warehouse',adminAuth,warehouseController.get)
router.delete("/warehouse/:Warehouse_id",adminAuth,warehouseController.delete)
router.post("/warehouse",adminAuth,warehouseController.add)
router.put("/warehouse/:updated_id",adminAuth,warehouseController.update)
router.post("/warehouse/assignProductToWarehouse",adminAuth,warehouseController.assignProduct_ToWarehouse)


router.post("/product",productController.add)
router.get("/product",adminAuth,productController.get)
router.put("/product/:product_id",adminAuth,productController.update)
router.delete("/product/:delete_product_id",adminAuth,productController.delete)



                    ///SUPERVISOR
router.post("/supervisor/requests",supervisorController.request)
router.get("/supervisor/products/:warehouse_id",supervisorController.getProductPerWarehouse)
router.get("/supervisor/getRequests/:user_id",supervisorController.getRequests)

module.exports=router;
