const { resolve } = require("path");
let conn = require("../configuration/config.js");
const { rejects } = require("assert");


exports.acceptRegData = (name, email, contact, salary) => {
    return new Promise((resolve, reject) => {
        conn.query(
            "INSERT INTO staff (name, email, contact_no, salary) VALUES (?, ?, ?, ?)",
            [name, email, contact, salary],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
        );
    });
};

const admin = {
    admin1: 'shaheel',
    admin2: 'prathamesh'
};
exports.adminentry = (username, password, role) => {
    console.log("username", username);
    console.log("password: ", password);
    console.log("role: ", role);


    return new Promise((resolve, reject) => {
        if (username === admin.admin1 || username === admin.admin2) {
            if ((username === admin.admin1 && password === '4444' && role === 'admin') || (username === admin.admin2 && password === '5555' && role === 'admin')) {
                resolve({ status: 'admin' })
            } else {
                resolve({ status: 'invalid' });
            }
        } else {
            conn.query("select *from staff where name=? and contact_no=?", [username, password], (err, result) => {

                if (err) return reject(err);

                if (result.length > 0) {
                    resolve({ status: 'staff' });
                } else {
                    resolve({ status: 'invalid' })
                }

            });
        }
    })
}
exports.viewcategory = () => {
    return new Promise((resolve, reject) => {
        conn.query("select * from category", (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })
    })
}

exports.updatecategory = (id) => {

    return new Promise((resolve, rejects) => {
        conn.query("select *from category where id=?", [id], (err, result) => {
            if (err) return reject(err);

            resolve(result)
        })
    })


}
exports.delcategory = (id) => {

    return new Promise((resolve, rejects) => {
        conn.query("delete from category where id=?", [id], (err, result) => {
            if (err) return reject(err);

            resolve(result)
        })
    })


}

exports.insertcategories = (name) => {

    return new Promise((resolve, reject) => {
        conn.query("insert into category values (0, ?)", [name], (err, result) => {
            if (err) return reject(err);

            resolve(result)
        })
    })


}
exports.updatecategoryH = (id, name) => {

    return new Promise((resolve, reject) => {
        conn.query("update category set name=? where id=?", [name, id], (err, result) => {
            if (err) return reject(err);

            resolve(result)
        });
    })


}
exports.searchCategory = (searchValue) => {

    return new Promise((resolve, reject) => {
        const query = `
        SELECT id,name
        FROM category 
        WHERE id LIKE ? OR name LIKE ? 
    `;

        const likeSearch = `%${searchValue}%`;
        conn.query(query, [likeSearch, likeSearch], (err, data) => {
            if (err) return reject(err);

            resolve(data);

        })

    })
}

//menu models
exports.deletemenus = (id) => {
    return new Promise((resolve, reject) => {
        conn.query("DELETE FROM menu WHERE id=?", [id], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

exports.getAllCategories = () => {
    return new Promise((resolve, reject) => {
        conn.query("SELECT * FROM category", (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

exports.viewmeanu = () => {
    return new Promise((resolve, reject) => {
        conn.query("SELECT * FROM menu", (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

exports.addmenuInDB = (item_name, category_id, price, description, image) => {
    return new Promise((resolve, reject) => {
        conn.query(
            "INSERT INTO menu VALUES (0, ?, ?, ?, ?, ?)",
            [item_name, category_id, price, description, image],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
        );
    });
};

exports.getMenuById = (id) => {
    return new Promise((resolve, reject) => {
        conn.query("SELECT * FROM menu WHERE id = ?", [id], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

exports.updateMenuHandler = (id, item_name, category_id, price, description, image) => {
    return new Promise((resolve, reject) => {
        let query = `UPDATE menu SET item_name = ?, category_id = ?, price = ?, description = ?`;
        const values = [item_name, category_id, price, description];

        if (image) {
            query += `, image = ?`;
            values.push(image);
        }

        query += ` WHERE id = ?`;
        values.push(id);

        conn.query(query, values, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};


// staff
exports.viewstaff = () => {
    return new Promise((resolve, reject) => {
        conn.query("SELECT * FROM staff", (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

exports.deletestaff = (id) => {
    return new Promise((resolve, reject) => {
        conn.query("DELETE FROM staff WHERE staff_id = ?", [id], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

exports.updatestaff = (staff_id) => {
    return new Promise((resolve, reject) => {
        conn.query("SELECT * FROM staff WHERE staff_id = ?", [staff_id], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

exports.updatestaffH = (staff_id, name, email, contact_no, salary) => {
    return new Promise((resolve, reject) => {
        conn.query(
            "UPDATE staff SET name = ?, email = ?, contact_no = ?, salary = ? WHERE staff_id = ?",
            [name, email, contact_no, salary, staff_id],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
        );
    });
};

exports.acceptRegData = (name, email, contact, salary) => {
    return new Promise((resolve, reject) => {
        conn.query(
            "INSERT INTO staff (name, email, contact_no, salary) VALUES (?, ?, ?, ?)",
            [name, email, contact, salary],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
        );
    });
};

// table
exports.addtableIndb = (table_id, capacity, availability_status) => {
    return new Promise((resolve, reject) => {
        conn.query(
            "INSERT INTO dinning_table (table_id, capacity, availability_status) VALUES (?, ?, ?)",
            [table_id, capacity, availability_status],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
        );
    });
};

exports.viewtable = () => {
    return new Promise((resolve, reject) => {
        conn.query("SELECT * FROM dinning_table", (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

exports.deletetable = (id) => {
    return new Promise((resolve, reject) => {
        conn.query("DELETE FROM dinning_table WHERE table_id = ?", [id], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

exports.updatetable = (table_id) => {
    return new Promise((resolve, reject) => {
        conn.query("SELECT * FROM dinning_table WHERE table_id = ?", [table_id], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

exports.updatetableH = (table_id, capacity, availability_status) => {
    return new Promise((resolve, reject) => {
        conn.query(
            "UPDATE dinning_table SET capacity = ?, availability_status = ? WHERE table_id = ?",
            [capacity, availability_status, table_id],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
        );
    });
};


exports.searchtable = (keyword) => {
    return new Promise((resolve, reject) => {
        const like = `%${keyword}%`;
        conn.query(
            `SELECT * FROM dinning_table WHERE 
       table_id LIKE ? OR 
       capacity LIKE ? OR 
       availability_status LIKE ?`,
            [like, like, like],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
        );
    });
};

exports.searchStaff = (searchValue) => {
    return new Promise((resolve, reject) => {
        const likeSearch = `%${searchValue}%`;
        const query = `
      SELECT staff_id, name, email, contact_no, salary 
      FROM staff 
      WHERE name LIKE ? OR email LIKE ? OR contact_no LIKE ?
    `;
        conn.query(query, [likeSearch, likeSearch, likeSearch], (err, data) => {
            if (err) return reject(err);
            resolve(data);
        });
    });
};

exports.searchmenu = (searchValue) => {
    return new Promise((resolve, reject) => {
        const likeSearch = `%${searchValue}%`;
        const query = `
      SELECT m.id, m.item_name, m.category_id, m.price, m.description, m.image, c.name AS category_name
      FROM menu m
      LEFT JOIN category c ON m.category_id = c.id
      WHERE m.item_name LIKE ? OR m.description LIKE ? OR c.name LIKE ?
    `;
        conn.query(query, [likeSearch, likeSearch, likeSearch], (err, data) => {
            if (err) return reject(err);
            resolve(data);
        });
    });
};

//19-06
// Get all menu items
exports.getAllMenus = (callback) => {
    conn.query("SELECT * FROM menu", callback);
};

// Get all order items for a given order
exports.getOrderItems = async (orderId) => {
    const query = `
    SELECT i.menu_id, m.item_name, i.quantity, i.total_amt AS price
    FROM order_items i
    JOIN menu m ON i.menu_id = m.id
    WHERE i.order_id = ?
  `;

    return new Promise((resolve, reject) => {
        conn.query(query, [orderId], (err, result) => {
            if (err) {
                console.error("❌ getOrderItems error:", err);
                return reject(err);
            }
            resolve(result); // ✅ return the array of items
        });
    });
};



exports.addOrderItem = (orderId, menuId, qty, total, callback) => {
    console.log("Inserting:", orderId, menuId, qty, total);
    const sql = "INSERT INTO order_items (order_id, menu_id, quantity, total_amt) VALUES (?, ?, ?, ?)";
    conn.query(sql, [parseInt(orderId), parseInt(menuId), parseInt(qty), parseFloat(total)], callback);
};

// Get staff ID by name
exports.getStaffByName = (name) => {
    return new Promise((resolve, reject) => {
        conn.query("SELECT * FROM staff WHERE name = ?", [name], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

// Insert new order into order_master
exports.insertOrder = (table_id, staff_id, ord_date, total_amt, ord_status) => {
    return new Promise((resolve, reject) => {
        conn.query(
            "INSERT INTO order_master (table_id, staff_id, ord_date, total_amt, ord_status) VALUES (?, ?, ?, ?, ?)",
            [table_id, staff_id, ord_date, total_amt, ord_status],
            (err, result) => {
                if (err) return reject(err);
                
                resolve(result);
            }
        );
    });
};

exports.getOrderTotal = (orderId) => {
    return new Promise((resolve, reject) => {
        conn.query(
            "SELECT SUM(total_amt) AS total FROM order_items WHERE order_id = ?",
            [orderId],
            (err, result) => {
                if (err) return reject(err);
                resolve(result[0].total || 0);
            }
        );
    });
};

exports.updateOrderTotal = (orderId, total_amt) => {
    return new Promise((resolve, reject) => {
        conn.query(
            "UPDATE order_master SET total_amt = ? WHERE order_id = ?",
            [total_amt, orderId],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
        );
    });
};

exports.updateOrderStatus = (orderId, status) => {
    return new Promise((resolve, reject) => {
        conn.query(
            "UPDATE order_master SET ord_status = ? WHERE order_id = ?",
            [status, orderId],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
        );
    });
};

// exports.getAllOrdersWithItems = () => {
//   return new Promise((resolve, reject) => {
//     const sql = `
//       SELECT 
//         om.order_id, om.table_id, om.staff_id, om.ord_date, om.ord_status,
//         s.name AS staff_name,
//         oi.quantity, oi.total_amt, m.item_name, m.price
//       FROM order_master om
//       JOIN order_items oi ON om.order_id = oi.order_id
//       JOIN menu m ON oi.menu_id = m.id
//       JOIN staff s ON om.staff_id = s.staff_id
//       ORDER BY om.order_id DESC;
//     `;

//     conn.query(sql, (err, results) => {
//       if (err) return reject(err);

//       // Group orders by order_id
//       const groupedOrders = {};

//       results.forEach(row => {
//         const {
//           order_id, table_id, ord_date, ord_status, staff_name,
//           item_name, quantity, price
//         } = row;

//         if (!groupedOrders[order_id]) {
//           groupedOrders[order_id] = {
//             order_id,
//             table_id,
//             ord_date,
//             ord_status,
//             staff_name,
//             items: []
//           };
//         }

//         groupedOrders[order_id].items.push({
//           item_name,
//           quantity,
//           price
//         });
//       });

//       resolve(Object.values(groupedOrders)); // convert object to array
//     });
//   });
// };


exports.getAllOrdersWithItems = async () => {
    return new Promise((resolve, reject) => {
        const sql = `
      SELECT 
        o.order_id, o.table_id, o.staff_id, o.ord_date, o.ord_status,
        s.name,
        i.menu_id, i.quantity, i.total_amt,
        m.item_name, m.price
      FROM order_master o
      JOIN staff s ON o.staff_id = s.staff_id
      JOIN order_items i ON o.order_id = i.order_id
      JOIN menu m ON i.menu_id = m.id
      ORDER BY o.order_id DESC;
    `;

        conn.query(sql, (err, results) => {
            if (err) return reject(err);

            // group by order_id
            const ordersMap = {};
            results.forEach(row => {
                if (!ordersMap[row.order_id]) {
                    ordersMap[row.order_id] = {
                        order_id: row.order_id,
                        table_id: row.table_id,
                        staff_name: row.name,
                        ord_date: row.ord_date,
                        ord_status: row.ord_status,
                        items: []
                    };
                }

                ordersMap[row.order_id].items.push({
                    item_name: row.item_name,
                    quantity: row.quantity,
                    price: row.price
                });
            });

            const allOrders = Object.values(ordersMap);
            resolve(allOrders);
        });
    });
};

exports.getOrderDetailsById = async (orderId) => {
    const query = `
    SELECT o.order_id, o.table_id, o.ord_date, o.ord_status, s.name AS staff_name
    FROM order_master o
    JOIN staff s ON o.staff_id = s.staff_id
    WHERE o.order_id = ?
  `;
    return new Promise((resolve, reject) => {
        conn.query(query, [orderId], (err, result) => {
            if (err) return reject(err);
            resolve(result[0]); // return single row
        });
    });
};


exports.getTableIdFromOrder = async (orderId) => {
  const query = `SELECT table_id FROM order_master WHERE order_id = ?`;

  return new Promise((resolve, reject) => {
    conn.query(query, [orderId], (err, result) => {
      if (err) return reject(err);
      if (result.length > 0) resolve(result[0].table_id);
      else reject(new Error("Order not found"));
    });
  });
};

exports.updateTableAvailability = async (table_id, status) => {
  return new Promise((resolve, reject) => {
    const query = `UPDATE dinning_table SET availability_status = ? WHERE table_id = ?`;
    conn.query(query, [status, table_id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};






exports.getAllCompletedBills = () => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT 
        o.order_id, 
        o.ord_date, 
        o.total_amt, 
        s.name AS staff_name, 
        t.table_id
      FROM 
        order_master o
      JOIN 
        staff s ON o.staff_id = s.staff_id
      JOIN 
        dinning_table t ON o.table_id = t.table_id
      WHERE 
        o.ord_status = 'Completed'
      ORDER BY 
        o.order_id DESC
    `;

    conn.query(sql, (err, result) => {
      if (err) {
        console.error("❌ Error fetching completed bills:", err);
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
