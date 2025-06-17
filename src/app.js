let express = require("express");
let app = express();
let bodyparser = require("body-parser");
let router = require("../src/routes/routes.js");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
//let session = require("express-session");
const bodyParser = require("body-parser");
let conn = require("./configuration/config.js");
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.json());
// app.use(session({
//     secret : "5555sp",
//     resave : false,
//    saveUninitialized : false
// }));
app.use(express.static("public"));
app.use(express.static("assect"));
app.use('/uploads', express.static('uploads'));
app.use(expressLayouts);
app.use("/",router);
app.set("view engine","ejs");
app.set("layout","layout");

module.exports=app;
