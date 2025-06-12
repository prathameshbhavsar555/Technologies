let routes = require("express");
let regCtrl=require("../controllers/control.js");


let router=routes.Router();

router.get("/",regCtrl.home);
router.get("/adminlogin",regCtrl.adminlogin);
router.get("/adminsingup",regCtrl.adminsignup);
router.post("/admindasboard",regCtrl.admindasboard);
router.get("/addcategory",regCtrl.addcategory);
router.get("/viewcategory",regCtrl.viewcategory);



module.exports=router;
