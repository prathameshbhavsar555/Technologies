let conn=require("../configuration/config.js");
let regmodel = require("../modules/module");
exports.checkData=(...checkUser)=>{
      
     let promise= new Promise((resolve,reject)=>{
        conn.query("select *from staff where email=? and contact_no=?",[...checkUser],(err,result)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(result);                                                                                                            
                }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
        })                                                                                                                                                                                                              
    });
    return promise;
}
exports.showMenuWithOrders = (orderId, callback) => {
  regmodel.getAllMenus((err, menus) => {
    if (err) return callback(err);
    regmodel.getOrderItems(orderId, (err2, orders) => {
      if (err2) return callback(err2);
      callback(null, { menus, orders });
    });
  });
};

exports.addItemToOrder = (data, callback) => {
  const orderId = parseInt(data.orderId);
  const menuId = parseInt(data.menu_id);
  const qty = parseInt(data.qty);
  const price = parseFloat(data.price);

  // 💥 Check for NaN
  if (isNaN(orderId) || isNaN(menuId) || isNaN(qty) || isNaN(price)) {
    return callback(new Error("Invalid input: One or more values are not numbers."));
  }

  const total = qty * price;
  regmodel.addOrderItem(orderId, menuId, qty, total, callback);
};

