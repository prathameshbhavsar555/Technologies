let routes = require("express");
let regCtrl=require("../controllers/control.js");


let router=routes.Router();

router.get("/",regCtrl.home);

module.exports=router;
