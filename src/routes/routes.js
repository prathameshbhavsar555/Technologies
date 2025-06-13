let routes = require("express");
let regCtrl=require("../controllers/control.js");


let router=routes.Router();
// he file change kele aahe bho

// changed regControl routes 
router.get("/",regCtrl.home);
//prath
router.get("/adminlogin",regCtrl.adminlogin);
router.get("/adminsingup",regCtrl.adminsignup);
router.post("/admindasboard",regCtrl.admindasboard);
router.get("/addcategory",regCtrl.addcategory);
router.get("/viewcategory",regCtrl.viewcategory);

router.get("/userlogin",regCtrl.userlogin);
router.get("/usersignup",regCtrl.usersignup);
router.post("/saveLogin",regCtrl.saveLogin);
router.post("/checkUser",regCtrl.checkUser);

module.exports=router;

