let routes = require("express");
let regCtrl=require("../controllers/control.js");

let router=routes.Router();
router.get("/",regCtrl.home);

//ADMIN ROUTES
router.get("/adminlogin",regCtrl.adminlogin);
router.get("/adminsingup",regCtrl.adminsignup);
router.post("/admindasboard",regCtrl.admindasboard);
router.get("/addcategory",regCtrl.addcategory);
router.get("/viewcategory",regCtrl.viewcategory);

//today changes
router.get("/addmeanu",regCtrl.addmeanu);
router.get("/viewmeanu",regCtrl.viewmeanu);

router.post("/insertcategories",regCtrl.insertcategories);
//router.get("/updatecategory",regCtrl.updatecategory);

//USER ROUTES
router.get("/userlogin",regCtrl.userlogin);
router.get("/usersignup",regCtrl.usersignup);
router.post("/saveLogin",regCtrl.saveLogin);
router.post("/checkUser",regCtrl.checkUser);
router.post("/adminentry",regCtrl.adminentry);

module.exports=router;

//today changes
router.get("/addminprofile",regCtrl.addminprofile);
router.get("/addminEdit",regCtrl.addminEdit);


