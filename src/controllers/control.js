const conn = require("../configuration/config.js");
let serCtrl = require("../services/service.js");
let regmodel = require("../modules/module.js");

const multer = require("multer");
const path = require("path");
const { createCipheriv } = require("crypto");

// Set up Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads'); // uploads folder in root
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + ext;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage: storage });

exports.upload = upload;

exports.home = (req, res) => {
    res.render("home.ejs");
}

//ADMIN ROUTES
exports.adminlogin=(req,res)=>{
    res.render("adminlogin.ejs",{msg:""});
}
exports.adminsignup=(req,res)=>{
    res.render("adminsignup.ejs");
}
exports.admindasboard=(req,res)=>{
    res.render("admindasboard.ejs",{filename:"no"});
}
exports.addcategory=(req,res)=>{
    res.render("addcategory.ejs",{filename:"addcategory.ejs", msg:""});
}
exports.viewmeanu=(req,res)=>{
    res.render("viewmeanu.ejs");
}
let admin={
    admin1:"shaheel",
    admin2:"prathamesh"
}
exports.adminentry = async(req, res) => {
try{
  const {username,password}=req.body;
  let result=await regmodel.adminentry(username,password);
console.log("result response: ",result);

  if(result.status==='admin'){
     res.render("admindasboard");
  }else if(result.status==='staff'){

      res.render("userdashboard");
  }else{

      res.render("adminlogin", { msg: "Invalid UserName & Password" });
  }
}
catch{
  console.log("error in entry",err);
  res.status(500).send("internal server error");
}
}

//Category CRUD Operation

exports.viewcategory = async(req, res) => {
 try{
  let result=await regmodel.viewcategory();
  res.render("viewcategory",{data:result})
 }
 catch(err){
  console.log("error fetching categories",err);
  res.status(500).send("internal server error");
 }
};

// 
exports.updatecategory = async(req, res) => {
  try{
    const id=parseInt(req.query.id);
    let result=await regmodel.updatecategory(id);
    res.render("updatecategory",{data:result[0]})
  }
  catch(err){
    res.status(500).send("internal server error");
  }
};
//Delete Category
// 
exports.delcategory = async(req, res) => {
  try{
  const id=parseInt(req.query.id);
  let result=await regmodel.delcategory(id);
  res.redirect("/viewcategory")
  }
  catch(err){
  res.status(500).send("internal server error");
  }
};
//Insert Category
// 
exports.insertcategories =async (req, res) => {
  try{
  let { name } = req.body;
  let result=await regmodel.insertcategories(name);
  res.render("addcategory",{msg:"category added"});
  }
  catch(err){
    res.status(500).json({ success: false, message: "Failed to insert" });
  }
};
//Update By POST Method Category
// 
exports.updatecategoryH = async(req, res) => {
  try{
    let {id,name}=req.body;

      let result=await regmodel.updatecategoryH(id,name);
      res.redirect("/viewcategory");
  }
  catch(err){
      return res.status(500).send("Internal Server Error");
  }

};
//seraching category
// 
exports.searchCategory = async (req, res) => {
  try{
    const searchValue = req.query.sd;
    let result=await regmodel.searchCategory(searchValue);
    res.json(result);
  }
  catch(err){
    res.json(result);
  }
};

// _______________________________________________________
//Menu CRUD Opearation
//Delete Menu


exports.deletemenus = async (req, res) => {
  try {
    const id = parseInt(req.query.id);
    console.log("the delete id: ", id);
    await regmodel.deletemenus(id);
    res.redirect("/viewmeanu");
  } catch (err) {
    console.error("Error deleting menu:", err);
    res.status(500).send("Internal Server Error");
  }
};

exports.addmeanu = async (req, res) => {
  try {
    const result = await regmodel.getAllCategories();
    res.render("addmeanu.ejs", { msg: "", data: result });
  } catch (err) {
    console.log("Error when fetching data from category:", err);
    res.status(500).send("Internal Server Error");
  }
};

exports.viewmeanu = async (req, res) => {
  try {
    const result = await regmodel.viewmeanu();
    res.render("viewmeanu", { data: result });
  } catch (err) {
    console.error("Error fetching menus:", err);
    res.status(500).send("Internal Server Error");
  }
};

exports.addmenuInDB = async (req, res) => {
  try {
    const { item_name, category_id, price, description } = req.body;
    const image = req.file.filename;
    await regmodel.addmenuInDB(item_name, category_id, price, description, image);

    const categories = await regmodel.getAllCategories();
    res.render("addmeanu", { msg: "menu added in db", data: categories });
  } catch (err) {
    console.error("Error inserting menu:", err);
    res.status(400).json({ success: false, message: "Invalid category ID" });
  }
};

exports.updatemenus = async (req, res) => {
  try {
    const id = req.query.id;
    const menuResult = await regmodel.getMenuById(id);
    if (menuResult.length === 0) {
      return res.status(404).send("Menu item not found");
    }
    const categoryResult = await regmodel.getAllCategories();
    res.render("updatemenu", { data: menuResult[0], categories: categoryResult });
  } catch (err) {
    console.error("Error fetching menu or categories:", err);
    res.status(500).send("Internal Server Error");
  }
};
exports.updateMenuHandler = async (req, res) => {
  try {
    const { id, item_name, category_id, price, description } = req.body;
    const image = req.file ? req.file.filename : null;

    await regmodel.updateMenuHandler(id, item_name, category_id, price, description, image);
    res.redirect("/viewmeanu");
  } catch (err) {
    console.error("Error updating menu:", err);
    res.status(500).send("Update Failed");
  }
};

// stafff

exports.viewstaff = async (req, res) => {
  try {
    let result = await regmodel.viewstaff();
    res.render("viewstaff", { data: result });
  } catch (err) {
    console.error("Error fetching staff:", err);
    res.status(500).send("Internal Server Error");
  }
};

exports.deletestaff = async (req, res) => {
  try {
    const id = parseInt(req.query.id);
    console.log("the delete id: ", id);
    await regmodel.deletestaff(id);
    res.redirect("/viewstaff");
  } catch (err) {
    console.error("Error deleting staff:", err);
    res.status(500).send("Internal Server Error");
  }
};

exports.updatestaff = async (req, res) => {
  try {
    const staff_id = parseInt(req.query.id);
    let result = await regmodel.updatestaff(staff_id);
    res.render("updatestaff", { staff: result[0] });
  } catch (err) {
    console.error("Error fetching staff:", err);
    res.status(500).send("Internal Server Error");
  }
};

exports.updatestaffH = async (req, res) => {
  try {
    let { staff_id, name, email, contact_no, salary } = req.body;
    await regmodel.updatestaffH(staff_id, name, email, contact_no, salary);
    res.redirect("/viewstaff");
  } catch (err) {
    console.error("Error updating staff:", err);
    res.status(500).send("Internal Server Error");
  }
};

exports.addstaff = (req, res) => {
  res.render("addstaff.ejs", { msg: "" });
};

exports.addstaffH = async (req, res) => {
  try {
    let { name, email, contact, salary } = req.body;
    await regmodel.acceptRegData(name, email, contact, salary);
    res.render("addstaff", { msg: "Added Successfully" });
  } catch (err) {
    console.error("Error adding staff:", err);
    res.status(500).send("Internal Server Error");
  }
};
//USER ROUTS
exports.userlogin = (req, res) => {
    res.render("userlogin.ejs", { msg: "" })

}
exports.usersignup = (req, res) => {
    res.render("usersingup.ejs", { msg: "" })

}

exports.saveLogin = async (req, res) => {
  try {
    let { name, email, contact, salary } = req.body;
    await regmodel.acceptRegData(name, email, contact, salary);
    res.render("usersingup", { msg: "Added Successfully" });
  } catch (error) {
    console.error("Error saving login data:", error);
    res.status(500).render("usersingup", { msg: "Something went wrong!" });
  }
};

exports.checkUser = (req, res) => {
    let { email, password } = req.body;
    let result = serCtrl.checkData(email, password);
    result.then((r) => {
        if (r.length > 0) {
            res.render("userdashboard.ejs");

        } else {
            res.render("userlogin.ejs", { msg: "Invalid  username and password" });
        }
    }).catch((err) => {
        res.render("userlogin.ejs", { msg: "Invalid  username and password" });
        res.end();
    })
}
//today changes
exports.addminprofile =((req,res)=>{
    res.render("addminprofile.ejs");
})
exports.addminEdit =((req,res)=>{
    res.render("addminEdit.ejs");
})
// // table:
exports.addtable = (req, res) => {
  res.render("addtable.ejs", { msg: "" });
};

exports.addtableIndb = async (req, res) => {
  try {
    let { table_id, capacity, availability_status } = req.body;
    await regmodel.addtableIndb(table_id, capacity, availability_status);
    res.render("addtable", { msg: "Added to table" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, message: "Insert failed" });
  }
};

exports.viewtable = async (req, res) => {
  try {
    let result = await regmodel.viewtable();
    console.log("result: ", result);
    res.render("viewtable", { data: result });
  } catch (err) {
    console.error("Error fetching table:", err);
    res.status(500).send("Internal Server Error");
  }
};

exports.deletetable = async (req, res) => {
  try {
    const id = parseInt(req.query.id);
    console.log("the delete id: ", id);
    await regmodel.deletetable(id);
    res.redirect("/viewtable");
  } catch (err) {
    console.error("Error deleting table:", err);
    res.status(500).send("Internal Server Error");
  }
};

exports.updatetable = async (req, res) => {
  try {
    const table_id = parseInt(req.query.id);
    let result = await regmodel.updatetable(table_id);
    res.render("updatetable", { table: result[0] });
  } catch (err) {
    console.error("Error fetching table for update:", err);
    res.status(500).send("Internal Server Error");
  }
};

exports.updatetableH = async (req, res) => {
  try {
    const { table_id, capacity, availability_status } = req.body;
    await regmodel.updatetableH(table_id, capacity, availability_status);
    res.redirect("/viewtable");
  } catch (err) {
    console.error("Error updating table:", err);
    res.status(500).send("Internal Server Error");
  }
};
//seraching category
// 
exports.searchCategory = async (req, res) => {
  try{

    const searchValue = req.query.sd;

    let result=await regmodel.searchCategory(searchValue);
    res.json(result);

  }
  catch(err){
    res.json([]);
  }
 
};

exports.searchtable = async (req, res) => {
  try {
    let keyword = req.query.sd;
    let result = await regmodel.searchtable(keyword);
    console.log("result hai", result);
    res.json(result);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json([]);
  }
};

exports.searchStaff = async (req, res) => {
  try {
    const searchValue = req.query.sd;
    console.log("searchvalue : ", searchValue);
    const result = await regmodel.searchStaff(searchValue);
    res.json(result);
  } catch (err) {
    console.error("Search error:", err);
    res.json([]);
  }
};

exports.searchmenu = async (req, res) => {
  try {
    const searchValue = req.query.sd;
    console.log("searchvalue : ", searchValue);
    const result = await regmodel.searchmenu(searchValue);
    res.json(result);
  } catch (err) {
    console.error("Search error:", err);
    res.json([]);
  }
};


