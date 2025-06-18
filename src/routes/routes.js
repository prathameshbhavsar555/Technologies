let routes = require("express");
let regCtrl=require("../controllers/control.js");
const upload = require("../controllers/control.js").upload; // export upload from control.js

let router=routes.Router();
router.get("/",regCtrl.home);

const auth=require("../middleware/auth.js")
//ADMIN ROUTES

//logout
// router.get("/logout",regCtrl.logout);
router.get("/logout", regCtrl.logout);
//ADMIN ROUTES
router.get("/login",auth.checkLoggedIn, regCtrl.adminlogin);
router.post("/admindasboard",regCtrl.admindasboard);
// middleware logic directly shere the page
router.get("/dashboard", auth.isAdmin, (req, res) => {
  res.render("admindasboard"); // your admin dashboard view
});

router.get("/udashboard", auth.isUser, (req, res) => {
  res.render("userdashboard"); // your user dashboard view
});

// router.get("/adminlogin",regCtrl.adminlogin);
router.get("/adminsingup",regCtrl.adminsignup);
// router.post("/admindasboard",regCtrl.admindasboard);
router.get("/addminprofile",regCtrl.addminprofile);
router.get("/addminEdit",regCtrl.addminEdit);

//menu
router.get("/addmeanu",regCtrl.addmeanu);
router.get("/viewmeanu",regCtrl.viewmeanu);
router.get("/deletemenus",regCtrl.deletemenus);
router.get("/updatemenus",regCtrl.updatemenus);
router.post("/addmenuInDB", upload.single("image"), regCtrl.addmenuInDB);
router.post("/updateMenuHandler", upload.single("image"), regCtrl.updateMenuHandler);
// router.post("/updateMenuHandler", regCtrl.updateMenuHandler);

//category
router.get("/addcategory",regCtrl.addcategory);
router.get("/viewcategory",regCtrl.viewcategory);
router.post("/insertcategories",regCtrl.insertcategories);
router.get("/updatecategory",regCtrl.updatecategory);
router.post("/updatecategoryH",regCtrl.updatecategoryH);
router.get("/deletecategory",regCtrl.delcategory);

//USER ROUTES
router.get("/userlogin",regCtrl.userlogin);
//router.get("/usersignup",regCtrl.usersignup);
router.post("/saveLogin",regCtrl.saveLogin);
router.post("/checkUser",regCtrl.checkUser);
router.post("/verify",regCtrl.adminentry);

//staff
router.get("/viewstaff",regCtrl.viewstaff)
router.get("/addstaff",regCtrl.addstaff);
router.post("/addstaffH",regCtrl.addstaffH);
router.get("/deletestaff",regCtrl.deletestaff);
router.get("/updatestaff",regCtrl.updatestaff);
router.post("/updatestaffH",regCtrl.updatestaffH);

//search category
router.get("/searchCategory",regCtrl.searchCategory);
router.get("/searchmenu",regCtrl.searchmenu);
router.get("/searchStaff",regCtrl.searchStaff);

//table
router.get("/addtable",regCtrl.addtable);
router.post("/addtableIndb",regCtrl.addtableIndb);
router.get("/viewtable",regCtrl.viewtable);
router.get("/deletetable",regCtrl.deletetable);
router.get("/updatetable",regCtrl.updatetable);
router.get("/searchtable",regCtrl.searchtable);
router.post("/updatetableH",regCtrl.updatetableH);

module.exports=router;