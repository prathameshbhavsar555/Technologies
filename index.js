let app = require("./src/app.js");
let PORT = 5555;

app.listen(PORT,(req,res)=>{
    console.log("Server Started Succesfully on "+PORT)
});