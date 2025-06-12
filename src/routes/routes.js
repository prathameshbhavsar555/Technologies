let routes = require("express");
let regCtrl=require("../controllers/control.js");


let router=routes.Router();

router.get("/",regCtrl.home);
router.get("/userlogin",regCtrl.userlogin);
router.get("/usersignup",regCtrl.usersignup);
router.post("/saveLogin",regCtrl.saveLogin);
router.post("/checkUser",regCtrl.checkUser);


module.exports=router;