let mysql = require("mysql2");
 let conn = mysql.createConnection({
    host :"localhost",
    user : "root",
    password :"Root",
    database : "restaurant_app"
 });

 conn.connect((err)=>{
    if(err){
        console.log("Database Connection Failed");
    }else{
        console.log("Establish Database Connection");
    }
 });

 module.exports=conn;