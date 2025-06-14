let express = require("express");
let app = express();
let bodyparser = require("body-parser");
let router = require("../src/routes/routes.js");
//let session = require("express-session");
const bodyParser = require("body-parser");
let conn = require("./configuration/config.js");
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
// app.use(session({
//     secret : "5555sp",
//     resave : false,
//    saveUninitialized : false
// }));
app.use(express.static("public"));
app.use(express.static("assect"));
app.use("/",router);
app.set("view engine","ejs");

module.exports=app;
