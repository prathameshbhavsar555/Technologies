const conn = require("../configuration/config.js");
let serCtrl = require("../services/service.js");
let regmodel = require("../modules/module.js");


// prathm
// new updated

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
    res.render("addcategory.ejs");
}
exports.viewcategory=(req,res)=>{
    res.render("viewcategory.ejs");
}






exports.home = (req, res) => {
    res.render("home.ejs");
}

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
        // res.render("userlogin")
        res.render("userlogin.ejs", { msg: "Invalid  username and password" });
        res.end();
    })
}
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

