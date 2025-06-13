const conn = require("../configuration/config.js");
let serCtrl = require("../services/service.js");
let regmodel = require("../modules/module.js");


// prathm
exports.adminlogin=(req,res)=>{
    res.render("adminlogin.ejs");
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
    res.render("usersingup", { msg: "user added" });
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


