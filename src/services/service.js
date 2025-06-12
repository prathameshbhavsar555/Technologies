let conn=require("../configuration/config.js");

exports.checkData=(...checkUser)=>{
       
     let promise= new Promise((resolve,reject)=>{
        conn.query("select *from staff where email=? and contact_no=?",[...checkUser],(err,result)=>{
                if(err){
                    reject(err);
                }else{
                    console.log(result);
                    
                    resolve(result);                                                                                                            
                }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
        })                                                                                                                                                                                                              
    });
    return promise;


}