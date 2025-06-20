const conn = require("../configuration/config.js");
let serCtrl = require("../services/service.js");
let regmodel = require("../modules/module.js");

const multer = require("multer");
const path = require("path");
const { createCipheriv } = require("crypto");

// Set up Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads'); // uploads folder in root
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + ext;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage: storage });

exports.upload = upload;

exports.home = (req, res) => {

    res.render("home.ejs");
  
}

//ADMIN ROUTES
exports.adminlogin=(req,res)=>{


    res.render("adminlogin.ejs", { msg: "" });
  
}

exports.logout = (req, res) => {
  req.session.destroy(err => {
  if (err) console.error("Session destroy error:", err);
  res.redirect("/");
});


};
exports.adminsignup=(req,res)=>{
    res.render("adminsignup.ejs");
}
exports.admindasboard=(req,res)=>{
    res.render("admindasboard.ejs",{filename:"no"});
}
exports.addcategory=(req,res)=>{
    res.render("addcategory.ejs",{filename:"addcategory.ejs", msg:""});
}
exports.viewmeanu=(req,res)=>{
    res.render("viewmeanu.ejs");
}
exports.addminprofile =((req,res)=>{
    res.render("addminprofile.ejs");
})
exports.addminEdit =((req,res)=>{
    res.render("addminEdit.ejs");
})
let admin={
    admin1:"shaheel",
    admin2:"prathamesh"
}
exports.adminentry = async(req, res) => {
try{
  const {username,password,role}=req.body;
  let result=await regmodel.adminentry(username,password,role);
console.log("result response: ",result);

  if(result.status==='admin'){
     res.render("admindasboard");
  }else if(result.status==='staff'){
      try {
        // Get staff ID by name (username == staff.name)
        req.session.username = username;
        const [staff] = await regmodel.getStaffByName(username);

        if (!staff) return res.render("userdashboard", { orderId: null });

        const staff_id = staff.staff_id;
        const table_id = 1; // You can change or make this dynamic
        const ord_date = new Date().toISOString().split('T')[0];
        const ord_status = 'Pending';

        // Insert a new order and get ID
        const newOrderId = await regmodel.insertOrder(table_id, staff_id, ord_date, 0, ord_status);

        res.render("userdashboard", { orderId: newOrderId.insertId });
    } catch (err) {
        console.error("Error creating order for staff:", err);
        res.render("userdashboard", { orderId: null });
    }
  }else{

      res.render("adminlogin", { msg: "Invalid UserName & Password" });
  }
}
catch{
  console.log("error in entry",err);
  res.status(500).send("internal server error");
}

}

//Category CRUD Operation
exports.viewcategory = async(req, res) => {
 try{
  let result=await regmodel.viewcategory();
  res.render("viewcategory",{data:result})
 }
 catch(err){
  console.log("error fetching categories",err);
  res.status(500).send("internal server error");
 }
};

// Update Catecategory
exports.updatecategory = async(req, res) => {
  try{
    const id=parseInt(req.query.id);
    let result=await regmodel.updatecategory(id);
    res.render("updatecategory",{data:result[0]})
  }
  catch(err){
    res.status(500).send("internal server error");
  }
};
//Delete Category
exports.delcategory = async(req, res) => {
  try{
  const id=parseInt(req.query.id);
  let result=await regmodel.delcategory(id);
  res.redirect("/viewcategory")
  }
  catch(err){
  res.status(500).send("internal server error");
  }
};
//Insert Category
// 
exports.insertcategories =async (req, res) => {
  try{
  let { name } = req.body;
  let result=await regmodel.insertcategories(name);
  res.render("addcategory",{msg:"category added"});
  }
  catch(err){
    res.status(500).json({ success: false, message: "Failed to insert" });
  }
};

//Update By POST Method Category
exports.updatecategoryH = async(req, res) => {
  try{
    let {id,name}=req.body;

      let result=await regmodel.updatecategoryH(id,name);
      res.redirect("/viewcategory");
  }
  catch(err){
      return res.status(500).send("Internal Server Error");
  }

};
//seraching category
exports.searchCategory = async (req, res) => {
  try{
    const searchValue = req.query.sd;
    let result=await regmodel.searchCategory(searchValue);
    res.json(result);
  }
  catch(err){
    res.json(result);
  }
};

//Menu CRUD Opearation
//Delete Menu
exports.deletemenus = async (req, res) => {
  try {
    const id = parseInt(req.query.id);
    console.log("the delete id: ", id);
    await regmodel.deletemenus(id);
    res.redirect("/viewmeanu");
  } catch (err) {
    console.error("Error deleting menu:", err);
    res.status(500).send("Internal Server Error");
  }
};

exports.addmeanu = async (req, res) => {
  try {
    const result = await regmodel.getAllCategories();
    res.render("addmeanu.ejs", { msg: "", data: result });
  } catch (err) {
    console.log("Error when fetching data from category:", err);
    res.status(500).send("Internal Server Error");
  }
};

exports.viewmeanu = async (req, res) => {
  try {
    const result = await regmodel.viewmeanu();
    res.render("viewmeanu", { data: result });
  } catch (err) {
    console.error("Error fetching menus:", err);
    res.status(500).send("Internal Server Error");
  }
};

exports.addmenuInDB = async (req, res) => {
  try {
    const { item_name, category_id, price, description } = req.body;
    const image = req.file.filename;
    await regmodel.addmenuInDB(item_name, category_id, price, description, image);

    const categories = await regmodel.getAllCategories();
    res.render("addmeanu", { msg: "menu added in db", data: categories });
  } catch (err) {
    console.error("Error inserting menu:", err);
    res.status(400).json({ success: false, message: "Invalid category ID" });
  }
};

exports.updatemenus = async (req, res) => {
  try {
    const id = req.query.id;
    const menuResult = await regmodel.getMenuById(id);
    if (menuResult.length === 0) {
      return res.status(404).send("Menu item not found");
    }
    const categoryResult = await regmodel.getAllCategories();
    res.render("updatemenu", { data: menuResult[0], categories: categoryResult });
  } catch (err) {
    console.error("Error fetching menu or categories:", err);
    res.status(500).send("Internal Server Error");
  }
};

exports.updateMenuHandler = async (req, res) => {
  try {
    const { id, item_name, category_id, price, description } = req.body;
    const image = req.file ? req.file.filename : null;

    await regmodel.updateMenuHandler(id, item_name, category_id, price, description, image);
    res.redirect("/viewmeanu");
  } catch (err) {
    console.error("Error updating menu:", err);
    res.status(500).send("Update Failed");
  }
};

// stafff

exports.viewstaff = async (req, res) => {
  try {
    let result = await regmodel.viewstaff();
    res.render("viewstaff", { data: result });
  } catch (err) {
    console.error("Error fetching staff:", err);
    res.status(500).send("Internal Server Error");
  }
};

exports.deletestaff = async (req, res) => {
  try {
    const id = parseInt(req.query.id);
    console.log("the delete id: ", id);
    await regmodel.deletestaff(id);
    res.redirect("/viewstaff");
  } catch (err) {
    console.error("Error deleting staff:", err);
    res.status(500).send("Internal Server Error");
  }
};

exports.updatestaff = async (req, res) => {
  try {
    const staff_id = parseInt(req.query.id);
    let result = await regmodel.updatestaff(staff_id);
    res.render("updatestaff", { staff: result[0] });
  } catch (err) {
    console.error("Error fetching staff:", err);
    res.status(500).send("Internal Server Error");
  }
};

exports.updatestaffH = async (req, res) => {
  try {
    let { staff_id, name, email, contact_no, salary } = req.body;
    await regmodel.updatestaffH(staff_id, name, email, contact_no, salary);
    res.redirect("/viewstaff");
  } catch (err) {
    console.error("Error updating staff:", err);
    res.status(500).send("Internal Server Error");
  }
};

exports.addstaff = (req, res) => {
  res.render("addstaff.ejs", { msg: "" });
};

exports.addstaffH = async (req, res) => {
  try {
    let { name, email, contact, salary } = req.body;
    await regmodel.acceptRegData(name, email, contact, salary);
    res.render("addstaff", { msg: "Added Successfully" });
  } catch (err) {
    console.error("Error adding staff:", err);
    res.status(500).send("Internal Server Error");
  }
};

//USER ROUTS
exports.userlogin = (req, res) => {
    res.render("userlogin.ejs", { msg: "" })

}
exports.usersignup = (req, res) => {
    res.render("usersingup.ejs", { msg: "" })

}

exports.saveLogin = async (req, res) => {
  try {
    let { name, email, contact, salary } = req.body;
    await regmodel.acceptRegData(name, email, contact, salary);
    res.render("usersingup", { msg: "Added Successfully" });
  } catch (error) {
    console.error("Error saving login data:", error);
    res.status(500).render("usersingup", { msg: "Something went wrong!" });
  }
};

exports.checkUser = (req, res) => {
    let { email, password } = req.body;
    let result = serCtrl.checkData(email, password);
    result.then((r) => {
        if (r.length > 0) {
            req.session.role = "user";
            res.render("userdashboard.ejs");

        } else {
            res.render("userlogin.ejs", { msg: "Invalid  username and password" });
        }
    }).catch((err) => {
        res.render("userlogin.ejs", { msg: "Invalid  username and password" });
        res.end();
    })
}

// Table CRUD operation
exports.addtable = (req, res) => {
  res.render("addtable.ejs", { msg: "" });
};

exports.addtableIndb = async (req, res) => {
  try {
    let { table_id, capacity, availability_status } = req.body;
    await regmodel.addtableIndb(table_id, capacity, availability_status);
    res.render("addtable", { msg: "Added to table" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, message: "Insert failed" });
  }
};

exports.viewtable = async (req, res) => {
  try {
    let result = await regmodel.viewtable();
    console.log("result: ", result);
    res.render("viewtable", { data: result });
  } catch (err) {
    console.error("Error fetching table:", err);
    res.status(500).send("Internal Server Error");
  }
};

exports.deletetable = async (req, res) => {
  try {
    const id = parseInt(req.query.id);
    console.log("the delete id: ", id);
    await regmodel.deletetable(id);
    res.redirect("/viewtable");
  } catch (err) {
    console.error("Error deleting table:", err);
    res.status(500).send("Internal Server Error");
  }
};

exports.updatetable = async (req, res) => {
  try {
    const table_id = parseInt(req.query.id);
    let result = await regmodel.updatetable(table_id);
    res.render("updatetable", { table: result[0] });
  } catch (err) {
    console.error("Error fetching table for update:", err);
    res.status(500).send("Internal Server Error");
  }
};

exports.updatetableH = async (req, res) => {
  try {
    const { table_id, capacity, availability_status } = req.body;
    await regmodel.updatetableH(table_id, capacity, availability_status);
    res.redirect("/viewtable");
  } catch (err) {
    console.error("Error updating table:", err);
    res.status(500).send("Internal Server Error");
  }
};

//seraching category 
exports.searchCategory = async (req, res) => {
  try{

    const searchValue = req.query.sd;

    let result=await regmodel.searchCategory(searchValue);
    res.json(result);

  }
  catch(err){
    res.json([]);
  }
 
};

exports.searchtable = async (req, res) => {
  try {
    let keyword = req.query.sd;
    let result = await regmodel.searchtable(keyword);
    console.log("result hai", result);
    res.json(result);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json([]);
  }
};

exports.searchStaff = async (req, res) => {
  try {
    const searchValue = req.query.sd;
    console.log("searchvalue : ", searchValue);
    const result = await regmodel.searchStaff(searchValue);
    res.json(result);
  } catch (err) {
    console.error("Search error:", err);
    res.json([]);
  }
};

exports.searchmenu = async (req, res) => {
  try {
    const searchValue = req.query.sd;
    console.log("searchvalue : ", searchValue);
    const result = await regmodel.searchmenu(searchValue);
    res.json(result);
  } catch (err) {
    console.error("Search error:", err);
    res.json([]);
  }
};

//stafftable
// exports.stafftable = async (req, res) => {
//   try {
//     const tables = await regmodel.viewtable();
//     const staff = await regmodel.getStaffByName("shah"); // or dynamic from login input
//     const staff_id = staff[0].staff_id;

//     res.render("stafftable", {
//       tables,
//       staff_id
//     });
//   } catch (err) {
//     console.error("Error loading stafftable:", err);
//     res.status(500).send("Internal Server Error");
//   }
// };
// ;
// GET /stafftable?username=shah
exports.stafftable = async (req, res) => {
  try {
    const username = req.session.username;
    console.log("username by the session: ",username);
    
    const tables = await regmodel.viewtable();
    const [staff] = await regmodel.getStaffByName(username);

    if (!staff) return res.status(404).send("Staff not found");

    res.render("stafftable", {
      tables,
      staff_id: staff.staff_id
    });
  } catch (err) {
    console.error("Error loading stafftable:", err);
    res.status(500).send("Internal Server Error");
  }
};



exports.viewOrders = async (req, res) => {
  try {
    const orders = await regmodel.getAllOrdersWithItems(); // new function

    res.render("viewOrders", {
      orders
    });

  // res.render("viewOrders");
  } catch (err) {
    console.error("Error loading orders:", err);
    res.status(500).send("Failed to load orders");
  }
};
// exports.viewOrders = async (req, res) => {
//   try {
//     const allOrders = await regmodel.getAllOrdersWithItems();

//     const pendingOrderList = allOrders.filter(order => order.ord_status === "Pending");
//     const completedOrderList = allOrders.filter(order => order.ord_status === "Completed");

//     res.render("viewOrders", {
//       pendingOrders: pendingOrderList,
//       completedOrders: completedOrderList
//     });
//   } catch (err) {
//     console.error("❌ Error loading viewOrders:", err);
//     res.status(500).send("Internal Server Error");
//   }
// };








  exports.renderMenuPage = (req, res) => {
  console.log("🧠 req.params.orderId =", req.params.orderId);
  const orderId = parseInt(req.params.orderId);

  if (isNaN(orderId)) {
    return res.status(400).send("❌ Invalid order ID in URL");
  }

  serCtrl.showMenuWithOrders(orderId, (err, result) => {
    if (err) return res.status(500).send("Internal Server Error");

    let total = 0;
result.orders.forEach((item) => {
  total += Number(item.total_amt); // ✅ convert each to number
});

    const date = new Date().toISOString().slice(0, 10);
    res.render("Allmenu", {
      menus: result.menus,
      orders: result.orders,
      orderId,
      date,
      total // 👈 pass to EJS
    });
  });
};


exports.handleAddToOrder = (req, res) => {
  const { orderId, menu_id, qty, price } = req.body;
  const quantity = parseInt(qty);
  const unitPrice = parseFloat(price);
  const total_amt = quantity * unitPrice;

  regmodel.addOrderItem(orderId, menu_id, quantity, total_amt, (err) => {
    if (err) {
      console.log("❌ Error inserting item:", err);
      return res.status(500).send("Error adding item");
    }
    res.redirect(`/menu/${orderId}`);
  });
};

exports.createOrderForTable = async (req, res) => {
 try {
    const table_id = parseInt(req.params.table_id);
    const staff_id = parseInt(req.params.staff_id);

    const ord_date = new Date().toISOString().split('T')[0];
    const ord_status = 'Pending';

    // Insert new order
    const newOrder = await regmodel.insertOrder(table_id, staff_id, ord_date, 0, ord_status);

    // Redirect to menu page with that new order
    res.redirect(`/menu/${newOrder.insertId}`);
  } catch (err) {
    console.error("❌ Failed to create order:", err);
    res.status(500).send("Failed to create order");
  }
};

//prathamesh
exports.getDashboardData = (req, res) => {
const queries = {
  categories: "SELECT COUNT(*) AS count FROM category",
  menus: "SELECT COUNT(*) AS count FROM menu",
  tables: "SELECT COUNT(*) AS count FROM dinning_table",
  availableTables: "SELECT COUNT(*) AS count FROM dinning_table WHERE availability_status = 'Available'",
  occupiedTables: "SELECT COUNT(*) AS count FROM dinning_table WHERE availability_status = 'Occupied'",
  orders: "SELECT COUNT(*) AS count FROM order_master",
  completedOrders: "SELECT COUNT(*) AS count FROM order_master WHERE ord_status = 'Completed'",
  pendingOrders: "SELECT COUNT(*) AS count FROM order_master WHERE ord_status = 'Pending'"
};


  const sql = `
    ${queries.categories};
    ${queries.menus};
    ${queries.tables};
    ${queries.availableTables};
    ${queries.occupiedTables};
    ${queries.orders};
    ${queries.completedOrders};
    ${queries.pendingOrders};
  `;
conn.query(sql, (err, results) => {
  if (err) {
    console.error("DB error:", err);
    return res.status(500).send("Database error");
  }

  res.render("viewdashboardAdmin", {
    totalCategories: results[0][0].count,
    totalMenus: results[1][0].count,
    totalTables: results[2][0].count,
    availableTables: results[3][0].count,
    occupiedTables: results[4][0].count,
    totalOrders: results[5][0].count,
    completedOrders: results[6][0].count,
    pendingOrders: results[7][0].count
  });
});
}


exports.confirmorder = async (req, res) => {
  try {
    const { orderId } = req.body;

    // Optional: Calculate updated total from order_items
    const total = await regmodel.getOrderTotal(orderId);
    await regmodel.updateOrderTotal(orderId, total);

    // Update status to Confirmed
    await regmodel.updateOrderStatus(orderId, 'Confirmed');

    // Redirect to view orders
    res.redirect("/viewOrders");
  } catch (err) {
    console.error("Error confirming order:", err);
    res.status(500).send("Failed to confirm order");
  }
};
