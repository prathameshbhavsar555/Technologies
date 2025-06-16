const conn = require("../configuration/config.js");
let serCtrl = require("../services/service.js");
let regmodel = require("../modules/module.js");


const multer = require("multer");
const path = require("path");

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
    res.render("adminlogin.ejs",{msg:""});
}
exports.adminsignup=(req,res)=>{
    res.render("adminsignup.ejs");
}
exports.admindasboard=(req,res)=>{
    res.render("admindasboard.ejs");
}
exports.addcategory=(req,res)=>{
    res.render("addcategory.ejs",{msg:""});
}
// exports.viewcategory = (req, res) => {
//   conn.query("SELECT * FROM category", (err, result) => {
//     if (err) {
//       console.error("Error fetching categories:", err);
//       return res.status(500).send("Internal Server Error");
//     }
//     res.render("viewcategory", { data: result });
//   });
// };
//today changes
// exports.addmeanu=(req,res)=>{
//     res.render("addmeanu.ejs");`
// }
exports.viewmeanu=(req,res)=>{
    res.render("viewmeanu.ejs");
}
// exports.insertcategories = (req, res) => {
//   let { name } = req.body;
//   conn.query("INSERT INTO category VALUES (0, ?)", [name], (err) => {
//     if (err) {
//       return res.status(500).json({ success: false, message: "Failed to insert" });
//     } else {
//       return res.render("addcategory", { msg: "Category added" });
//     }
//   });
// };
let admin={
    admin1:"shaheel",
    admin2:"prathamesh"
}
exports.adminentry = (req, res) => {

    let {username,password} = req.body;
    if((username==admin.admin1 || username==admin.admin2)&&(password=='4444'||password=='5555')){
        res.render("admindasboard");
    }else{
        res.render("adminlogin", { msg: "Invalid UserName & Password" });
    }
}


//shheeel
//category
exports.viewcategory = (req, res) => {
  conn.query("SELECT * FROM category", (err, result) => {
    if (err) {
      console.error("Error fetching categories:", err);
      return res.status(500).send("Internal Server Error");
    }
    res.render("viewcategory", { data: result });
  });
};
exports.updatecategory = (req, res) => {
  const id=parseInt(req.query.id);
  console.log("the updated id: ",id);
  
  conn.query("SELECT * FROM category where id=?",[id], (err, result) => {
    if (err) {
      console.error("Error fetching categories:", err);
      return res.status(500).send("Internal Server Error");
    }
    res.render("updatecategory", { data: result[0] });
  });
};

exports.delcategory = (req, res) => {
  const id=parseInt(req.query.id);
  console.log("the delete id: ",id);
  
  conn.query("delete from category where id=?",[id], (err, result) => {
    if (err) {
      console.error("Error fetching categories:", err);
      return res.status(500).send("Internal Server Error");
    }
    res.redirect("/viewcategory")
  });
};
exports.insertcategories = (req, res) => {
  let { name } = req.body;
  conn.query("INSERT INTO category VALUES (0, ?)", [name], (err) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Failed to insert" });
    } else {
      return res.render("addcategory", { msg: "Category added" });
    }
  });
};

exports.updatecategoryH = (req, res) => {
  let {id,name}=req.body;
  console.log("the updated id: ",id);
  
  conn.query("update category set name=? where id=?",[name,id], (err, result) => {
    if (err) {
      console.error("Error fetching categories:", err);
      return res.status(500).send("Internal Server Error");
    }
    res.redirect("/viewcategory")
  });
};


//menus 

exports.deletemenus = (req, res) => {
  const id=parseInt(req.query.id);
  console.log("the delete id: ",id);
  
  conn.query("delete from menu where id=?",[id], (err, result) => {
    if (err) {
      console.error("Error fetching menu:", err);
      return res.status(500).send("Internal Server Error");
    }
    res.redirect("/viewmeanu")
  });
};
exports.addmeanu=(req,res)=>{
    res.render("addmeanu.ejs",{msg:""});
}
exports.viewmeanu=(req,res)=>{
     conn.query("SELECT * FROM menu", (err, result) => {
    if (err) {
      console.error("Error fetching categories:", err);
      return res.status(500).send("Internal Server Error");
    }
    res.render("viewmeanu", { data: result });
  });
}

exports.addmenuInDB = (req, res) => {
  let {item_name,category_id,price,description } = req.body;
  const image=req.file.filename;
    console.log("Body:", req.body);
    console.log("File:", req.file); 
  conn.query("INSERT INTO menu VALUES (0,?,?,?,?,?)", [item_name,category_id,price,description,image], (err,result) => {
     if (err || result.length === 0) {
   
      return res.status(400).json({ success: false, message: "Invalid category ID" });
  }
    else {
      return res.render("addmeanu", { msg: "menu added in db" });
    }
  });
};
exports.updatemenus = (req, res) => {
  // console.log("the updtate id: ",id);
  let id=req.query.id;
  
  conn.query("SELECT * FROM menu where id=?",[id], (err, result) => {
    if (err) {
      console.error("Error fetching categories:", err);
      return res.status(500).send("Internal Server Error");
    }
    res.render("updatemenu", { data: result[0] });
  });
};
exports.updateMenuHandler = (req, res) => {
  //  let kid=req.query.id;
  // console.log("the updtate id: ",kid);
  
   const { id, item_name, category_id, price, description } = req.body;
  let image = req.file ? req.file.filename : null;

  let query = `UPDATE menu SET item_name = ?, category_id = ?, price = ?, description = ?`;
  let values = [item_name, category_id, price, description];

  if (image) {
    query += `, image = ?`;
    values.push(image);
  }

  query += ` WHERE id = ?`;
  values.push(id);

  conn.query(query, values, (err, result) => {
    if (err) {
      console.error("Error updating menu:", err);
      return res.status(500).send("Update Failed");
    }

    res.redirect("/viewmeanu"); // Redirect to list page or wherever
  });
};


//USER ROUTS
exports.userlogin = (req, res) => {
    res.render("userlogin.ejs", { msg: "" })

}
exports.usersignup = (req, res) => {
    res.render("usersingup.ejs", { msg: "" })

}
exports.saveLogin = (req, res) => {

    let { name, email, contact, salary } = req.body;
    let result = regmodel.acceptRegData(name, email, contact, salary);
    res.render("usersingup", { msg: "Added Successfully" });
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
        res.render("userlogin.ejs", { msg: "Invalid  username and password" });
        res.end();
    })
}


//today changes
exports.addminprofile =((req,res)=>{
    res.render("addminprofile.ejs");
})
exports.addminEdit =((req,res)=>{
    res.render("addminEdit.ejs");
})



// stafff
exports.viewstaff = (req, res) => {
  conn.query("SELECT * FROM staff", (err, result) => {
    if (err) {
      console.error("Error fetching categories:", err);
      return res.status(500).send("Internal Server Error");
    }
    res.render("viewstaff", { data: result });
  });
};

exports.deletestaff = (req, res) => {
  const id=parseInt(req.query.id);
  console.log("the delete id: ",id);
  
  conn.query("delete from staff where staff_id=?",[id], (err, result) => {
    if (err) {
      console.error("Error fetching categories:", err);
      return res.status(500).send("Internal Server Error");
    }
    res.redirect("/viewstaff")
  });
};

exports.updatestaff = (req, res) => {
  const staff_id=parseInt(req.query.id);
  // console.log("the updated id: ",id);
  
  conn.query("select *from staff where staff_id=?",[staff_id], (err, result) => {
    if (err) {
      console.error("Error fetching categories:", err);
      return res.status(500).send("Internal Server Error");
    }
    res.render("updatestaff",{staff:result[0]})
  });
};
exports.updatestaffH = (req, res) => {
  let {staff_id,name,email,contact_no,salary}=req.body;
  // console.log("the updated id: ",id);
  
  conn.query("update staff set name=?,email=?,contact_no=?,salary=? where staff_id=?",[name,email,contact_no,salary,staff_id], (err, result) => {
    if (err) {
      console.error("Error fetching categories:", err);
      return res.status(500).send("Internal Server Error");
    }
    res.redirect("/viewstaff")
  });
};
exports.addstaff = (req, res) => {
    res.render("addstaff.ejs", { msg: "" })

}
exports.addstaffH = (req, res) => {

    let { name, email, contact, salary } = req.body;
    let result = regmodel.acceptRegData(name, email, contact, salary);
    res.render("addstaff", { msg: "Added Successfully" });
    return true;
}
