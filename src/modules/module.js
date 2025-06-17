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
exports.adminentry = (username, password) => {
    console.log("username", username);
    console.log("password: ", password);


    return new Promise((resolve, reject) => {
        if (username === admin.admin1 || username === admin.admin2) {
            if ((username === admin.admin1 && password === '4444') || (username === admin.admin2 && password === '5555')) {
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


