let conn=require("../configuration/config.js")
exports.acceptRegData=(...regData)=>{
    
    conn.query("insert into staff values('0',?,?,?,?)",
        [...regData],(err)=>{
            if(err){
                console.log("not saved");
                
            }else{
                console.log("saved data");
                
            }
        })
         
    return true;
}