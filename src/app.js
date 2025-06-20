let express = require("express");
let app = express();
let session = require("express-session");
app.use(session({
    secret : "yptoxic5555", // keep it safe
    resave : false,
   saveUninitialized : true,
   cookie:{maxAge:3600000}
}));
let bodyParser = require("body-parser");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
let router = require("../src/routes/routes.js");

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(express.static("assect"));
app.use('/uploads', express.static('uploads'));

let conn = require("./configuration/config.js");
app.use(express.json());
app.use(expressLayouts);
app.set("view engine","ejs");
app.set("layout","layout");
app.use("/",router);

module.exports=app;









