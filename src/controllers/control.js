const conn = require("../configuration/config.js");
let serCtrl = require("../services/service.js");
let regmodel = require("../modules/module.js");

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
    res.render("admindasboard.ejs");
}
exports.addcategory=(req,res)=>{
    res.render("addcategory.ejs",{msg:""});
}
exports.viewcategory = (req, res) => {
  conn.query("SELECT * FROM category", (err, result) => {
    if (err) {
      console.error("Error fetching categories:", err);
      return res.status(500).send("Internal Server Error");
    }
    res.render("viewcategory", { data: result });
  });
};
//today changes
exports.addmeanu=(req,res)=>{
    res.render("addmeanu.ejs");
}
exports.viewmeanu=(req,res)=>{
    res.render("viewmeanu.ejs");
}
exports.insertcategories = (req, res) => {
  let { name } = req.body;
  conn.query("INSERT INTO category VALUES (0, ?)", [name], (err) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Failed to insert" });
    } else {
      return res.render("addcategory", { msg: "Category added" });
    }
  });
};
let admin={
    admin1:"shaheel",
    admin2:"prathamesh"
}
exports.adminentry = (req, res) => {

    let {username,password} = req.body;
    if((username==admin.admin1 || username==admin.admin2)&&(password=='4444'||password=='5555')){
        res.render("admindasboard");
    }else{
        res.render("adminlogin", { msg: "Invalid UserName & Password" });
    }
}

//USER ROUTS
exports.userlogin = (req, res) => {
    res.render("userlogin.ejs", { msg: "" })

}
exports.usersignup = (req, res) => {
    res.render("usersingup.ejs", { msg: "" })

}
exports.saveLogin = (req, res) => {

    let { name, email, contact, salary } = req.body;
    let result = regmodel.acceptRegData(name, email, contact, salary);
    res.render("usersingup", { msg: "Added Successfully" });
    return true;
}
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