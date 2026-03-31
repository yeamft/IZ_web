const mysql = require("mysql2");
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const router = express.Router();
const multer = require("multer");
const ejs = require("ejs");
const jwt = require("jsonwebtoken");
const http = require("http");
const fs = require("fs");
const path = require("path");
require("dotenv").config();
const config = process.env;
var token;
// const auth = require("./middleware/auth");
const app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: (origin, callback) => callback(null, origin || "*"),
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
    credentials: true,
  })
);
app.set("trust proxy", 1);
app.use(
  session({
    resave: false,
    secret: "session",
    saveUninitialized: true,
    cookie: {
      expires: 60 * 60 * 24,
      secure: true,
    },
  })
);
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "C:/xampp/htdocs/ecommerce/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: fileStorage,
});
app.use(express.json());
// const connection = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   database: "ecommerce",
// });
const dbConfig = (() => {
  const base = {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "ecommerce",
  };

  if (process.env.DB_SSL === "true") {
    const caPath = path.resolve(__dirname, process.env.DB_SSL_CA || "");
    try {
      base.ssl = {
        rejectUnauthorized: true,
        minVersion: "TLSv1.2",
        ca: fs.readFileSync(caPath),
      };
    } catch (err) {
      console.error(`Failed to load DB SSL CA file at ${caPath}.`, err);
      process.exit(1);
    }
  }

  return base;
})();

const connection = mysql.createConnection(dbConfig);
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL: ", err.stack);
    return;
  }
  console.log('Connected to MySQL as ID', connection.threadId);
  connection.query('SELECT * FROM users', (err, rows) => {
    if (err) {
      console.error("Error querying MySQL: ", err.stack);
      return;
    }
    console.log('Query result:', rows);
  });
});





app.post("/new/catagory", auth, upload.single("file"), (req, res) => {
  const catagory = req.body.catagory;
  const catagory_amh = req.body.catagory_amh;

  if (!req.file) {
    res.send("failed");
  } else {
    const create_catagory = `INSERT INTO catagory(catagory_name,catagory_name_amh,image_path, image_name) VALUES ('${catagory}','${catagory_amh}','ecommerce/images/${req.file.filename}','${req.file.filename}');`;
    connection.query(create_catagory, (err, result) => {
      res.send("uploaded");
    });
  }
});
app.post("/update/product_image", auth, upload.single("file"), (req, res) => {
  const product_id = req.body.product_id;
  const image_id = req.body.image_id;

  if (!req.file) {
    res.send("failed");
  } else {
    if (image_id == "new") {
      const insert_image = `INSERT INTO product_image(image_path,image_name, product_id) VALUES
            ('ecommerce/images/${req.file.filename}','${req.file.filename}','${product_id}');`;
      connection.query(insert_image, (err, result) => {
        if (result) {
          res.send("uploaded");
        } else {
          res.send("failed");
        }
      });
    } else {
      const insert_image = `UPDATE product_image SET image_path='ecommerce/images/${req.file.filename}',image_name='${req.file.filename}' WHERE product_id='${product_id}' and image_id='${image_id}';`;
      connection.query(insert_image, (err, result) => {
        if (result) {
          res.send("uploaded");
        } else {
          res.send("failed");
        }
      });
    }
  }
});
app.post("/update/catagory", auth, upload.single("file"), (req, res) => {
  const catagory = req.body.catagory;
  const catagory_amh = req.body.catagory_amh;
  const catagory_id = req.body.catagory_id;
  if (!req.file) {
    const create_catagory = `UPDATE catagory SET catagory_name='${catagory}',catagory_name_amh='${catagory_amh}' WHERE catagory_id='${catagory_id}';`;
    connection.query(create_catagory, (err, result) => {
      res.send("uploaded");
    });
  } else {
    const create_catagory = `UPDATE catagory SET catagory_name='${catagory}',image_path='ecommerce/images/${req.file.filename}',image_name='${req.file.filename}' WHERE catagory_id='${catagory_id}';`;
    connection.query(create_catagory, (err, result) => {
      res.send("uploaded");
    });
  }
});
app.post("/update/type", auth, upload.single("file"), (req, res) => {
  const catagory = req.body.catagory;
  const type_id = req.body.type_id;
  const type = req.body.type;
  const type_amh = req.body.type_amh;
  if (!req.file) {
    const create_catagory = `UPDATE product_type SET catagory_id='${catagory}',product_type='${type}',product_type_amh='${type_amh}' WHERE product_type_id='${type_id}';`;
    connection.query(create_catagory, (err, result) => {
      res.send("uploaded");
    });
  } else {
    const create_catagory = `UPDATE product_type SET catagory_id='${catagory}',product_type='${type}',image_path='ecommerce/images/${req.file.filename}',image_name='${req.file.filename}' WHERE product_type_id='${type_id}';`;
    connection.query(create_catagory, (err, result) => {
      res.send("uploaded");
    });
  }
});

app.post("/new/product_type", auth, upload.single("file"), (req, res) => {
  const catagory = req.body.catagory;
  const product_type = req.body.product_type;
  const product_type_amh = req.body.product_type_amh;
  if (!req.file) {
    res.send("failed");
  } else {
    const create_product_type = `INSERT INTO product_type(catagory_id, product_type, product_type, image_path, image_name) VALUES ('${catagory}','${product_type}','${product_type_amh}','ecommerce/images/${req.file.filename}','${req.file.filename}');`;
    connection.query(create_product_type, (err, result) => {
      res.send("uploaded");
    });
  }
});
// app.post("/admin/register",async(req,res)=> {
//     const phone_number = "0911185911";
//     let password = "ezi@elebat123@2022";
//     let encryptedPassword = await bcrypt.hash(password, 10);
//       token = jwt.sign(
//        { phone_number: phone_number },
//        process.env.TOKEN_KEY,
//        {
//          expiresIn: "2h",
//        }
//      );
//     const create_admin = `INSERT INTO users(user_id, phone_number, password, role, token) VALUES ('AD0001','${phone_number}','${encryptedPassword}','admin','${token}');`;
//     connection.query(create_admin, (err, result) => {

//     });
// });
app.post("/users/delete", auth, (req, res) => {
  const user_id = req.body.user_id;

  const user_select_id = `SELECT user_id FROM user WHERE id='${user_id}';`;

  connection.query(user_select_id, (err, result) => {
    let user_unique_id = result[0].user_id;

    const delete_user_form_users = `DELETE FROM users WHERE user_id='${user_unique_id}';`;
    connection.query(delete_user_form_users, (err, result) => {
      const delete_cart_users = `DELETE FROM cart WHERE user_id='${user_unique_id}';`;
      connection.query(delete_cart_users, (err, result) => {
        const delete_user = `DELETE FROM user WHERE user_id='${user_unique_id}';`;
        connection.query(delete_user, (err, result) => {
          res.send(result);
        });
      });
    });
  });
});
app.post("/user/login", express.urlencoded({ extended: false }), (req, res) => {
  let phone = req.body.phone;
  let password = req.body.password;
  const sql_check_user_id = `SELECT * FROM users WHERE role='admin' and phone_number='${phone}';`;
  connection.query(sql_check_user_id, (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    if (result.length > 0) {
      const user_id = result[0].user_id;
      result_password = result[0].password;
      bcrypt.compare(password, result_password, function (err, response) {
        if (response) {
          token = jwt.sign(
            { phone_number: phone, Login: true },
            process.env.TOKEN_KEY,
            {
              expiresIn: "2h",
            }
          );

          const login_admin = `UPDATE users SET token='${token}' WHERE user_id='${user_id}'`;
          connection.query(login_admin, (err, result) => {
            if (result) {
              // var request = http.request();
              // request.setHeader('Set-Token',token);
              // res.header('Set-Token',token);
              //   res.send({
              //     message: "OK",
              //   });
              res.send(token);
            } else {
              res.send("failed");
            }
          });
        } else {
          res.send({ message: "fail" });
        }
      });
    } else {
      res.send({ message: "User doesn't exist" });
    }
  });
});

app.get("/logout", auth, (req, res) => {
  // session.islogedin="false";
  // session.user_id="";
  // res.redirect('/');
  token = "expired";
});

app.post("/businesstype", auth, (req, res) => {
  const type_name = req.body.type_name;
  const type_name_amh = req.body.type_name_amh;
  // console.log(type_name);
  const select_query =
    "INSERT INTO bussiness_type(bussiness_type_name,bussiness_type_name_amh) VALUES (?) ;";
  connection.query(select_query, [type_name, type_name_amh], (err, result) => {
    res.send(result);
  });
});
app.post("/update/businesstype", auth, (req, res) => {
  const type_id = req.body.type_id;
  const type_name = req.body.type_name;
  const type_name_amh = req.body.type_name_amh;
  const select_query =
    "UPDATE bussiness_type SET bussiness_type_name=(?) ,bussiness_type_name_amh=(?) WHERE bussiness_type_id= (?) ;";
  connection.query(
    select_query,
    [type_name, type_name_amh, type_id],
    (err, result) => {
      res.send(result);
    }
  );
});
app.post("/businesstype/byid", auth, (req, res) => {
  const type_id = req.body.type_id;
  const select_query = `SELECT bussiness_type_name,bussiness_type_name_amh FROM bussiness_type WHERE bussiness_type_id='${type_id}' ;`;
  connection.query(select_query, (err, result) => {
    res.send(result);
  });
});
app.post("/businesstype/delete", auth, (req, res) => {
  const type_id = req.body.type_id;

  const select_query = `SELECT count(*)suppiler_id FROM supplier WHERE bussiness_type_id='${type_id}';`;
  connection.query(select_query, (err, result) => {
    let count = result[0].suppiler_id;

    if (count > 0) {
      res.send("fail");
    } else {
      const delete_from_cart = `DELETE FROM bussiness_type WHERE bussiness_type_id='${type_id}' ;`;
      connection.query(delete_from_cart, (err, result) => {
        if (result) {
          res.send("ok");
        }
      });
    }
  });
});
app.get("/catagory/all", auth, (req, res) => {
  const select_query = `SELECT ROW_NUMBER() OVER() AS id, catagory_id, catagory_name,catagory_name_amh, image_path, image_name FROM catagory ;`;
  connection.query(select_query, (err, result) => {
    res.send(result);
  });
});
app.post("/catagory/delete", auth, (req, res) => {
  const catagory_id = req.body.catagory_id;

  const select_query = `DELETE FROM catagory WHERE catagory_id='${catagory_id}';`;
  connection.query(select_query, (err, result) => {
    if (err) {
      res.send("fail");
    } else if (result) {
      res.send("ok");
    }
  });
});
app.post("/delivery/delete", auth, (req, res) => {
  let date = new Date();
  const updated_at =
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  const delivery_id = req.body.delivery_id;

  const count = `SELECT COUNT(DISTINCT delivery_service.order_id ) as count from delivery_service INNER JOIN product_order on product_order.order_id=delivery_service.order_id WHERE delivery_service.user_id='${delivery_id}' and product_order.status='assigned';`;
  connection.query(count, (err, result) => {
    let count = result[0].count;

    if (count == 0) {
      const delete_delivery = `DELETE FROM delivery WHERE user_id='${delivery_id}';`;
      connection.query(delete_delivery, (err, result) => {
        if (result) {
          const delete_user = `DELETE FROM users WHERE user_id='${delivery_id}';`;
          connection.query(delete_user, (err, result1) => {
            res.send(result1);
          });
        }
      });
    } else if (count > 0) {
      const select_query = `SELECT DISTINCT delivery_service.order_id from delivery_service INNER JOIN product_order on 
            product_order.order_id=delivery_service.order_id WHERE delivery_service.user_id='${delivery_id}' and product_order.status='assigned';`;
      connection.query(select_query, (err, result) => {
        for (let i = 0; i < result.length; i++) {
          let order_id = result[i].order_id;
          const update_order = `UPDATE product_order SET status='pending' , updated_at='${updated_at}' WHERE order_id='${order_id}';`;
          connection.query(update_order, (err, result) => {
            const delete_delivery = `DELETE FROM delivery WHERE user_id='${delivery_id}';`;
            connection.query(delete_delivery, (err, result1) => {
              if (result1) {
                const delete_user = `DELETE FROM users WHERE user_id='${delivery_id}';`;
                connection.query(delete_user, (err, result2) => {
                  res.send(result2);
                });
              }
            });
          });
        }
      });
    }
  });
});
// app.post("/catagory/add",(req,res)=>{

//     const catagory_id=req.body.catagory_id
//     console.log(catagory_id);
//     const select_query=`DELETE FROM catagory WHERE catagory_id='${catagory_id}';`
//     connection.query(select_query,(err,result)=>
//     {
//         if(err)
//         {
//             res.send("fail");
//         }
//         else if(result)
//         {
//             res.send("ok");
//         }
//     })
// });
app.post("/producttype/by_catagory", auth, (req, res) => {
  const catagory = req.body.selected_catagory;

  const select_query = `SELECT * FROM product_type WHERE catagory_id='${catagory}' ;`;
  connection.query(select_query, (err, result) => {
    res.send(result);
  });
});
app.get("/producttype/all", auth, (req, res) => {
  const select_query =
    "SELECT ROW_NUMBER() OVER() AS id,product_type_id,catagory_id, product_type,product_type_amh, image_path, image_name FROM product_type ;";
  connection.query(select_query, (err, result) => {
    res.send(result);
  });
});
app.get("/business_type/all", auth, (req, res) => {
  const select_query =
    "SELECT ROW_NUMBER() OVER() AS id,bussiness_type_id,bussiness_type_name,bussiness_type_name_amh,status FROM bussiness_type;";
  connection.query(select_query, (err, result) => {
    res.send(result);
  });
});
app.get("/product/all", auth, (req, res) => {
  const select_query =
    "SELECT ROW_NUMBER() OVER() AS id,p.product_id, p.name,p.name_amh, p.price, p.Description, p.Description_amh, p.Stock,c.catagory_name,c.catagory_name_amh,pt.product_type ,pt.product_type_amh , p.created_at,s.business_name,s.business_name_amh FROM supplier s INNER JOIN product_supplier sp ON sp.supplier_id=s.suppiler_id INNER JOIN product p  ON sp.product_id=p.product_id INNER JOIN catagory c ON   c.catagory_id=p.catagory_id INNER JOIN product_type pt ON p.product_type_id=pt.product_type_id;";
  connection.query(select_query, (err, result) => {
    res.send(result);
  });
});
app.post("/catagory/byid", auth, (req, res) => {
  const catagory_id = req.body.catagory_id;
  const select_query = `SELECT catagory_name,catagory_name_amh, image_path, image_name FROM catagory WHERE catagory_id=${catagory_id};`;
  connection.query(select_query, (err, result) => {
    res.send(result);
  });
});
app.post("/type/byid", auth, (req, res) => {
  const type_id = req.body.type_id;
  const select_query = `SELECT catagory.catagory_name,product_type.catagory_id, product_type.product_type,product_type.product_type_amh, product_type.image_path, product_type.image_name FROM product_type INNER JOIN catagory ON catagory.catagory_id=product_type.catagory_id WHERE product_type_id=${type_id};`;
  connection.query(select_query, (err, result) => {
    res.send(result);
  });
});
app.post("/product/byid", auth, (req, res) => {
  const product_id = req.body.product_id;

  const select_query = `SELECT p.id,p.product_id, p.name,p.name_amh, p.price, p.Description,p.Description_amh, p.Stock,p.unit,p.target_group,p.pre_order,p.date_order,p.catagory_id,p.product_type_id,c.catagory_name,pt.product_type , p.created_at,p.unit,p.pre_order,p.target_group,p.date_order,s.business_name,s.suppiler_id FROM supplier s INNER JOIN product_supplier sp ON sp.supplier_id=s.suppiler_id INNER JOIN product p  ON sp.product_id=p.product_id INNER JOIN catagory c ON   c.catagory_id=p.catagory_id INNER JOIN product_type pt ON c.catagory_id=pt.catagory_id Where p.product_id='${product_id}';`;
  connection.query(select_query, (err, result) => {
    res.send(result);
  });
});
app.post("/product_image/byid", auth, (req, res) => {
  const product_id = req.body.product_id;

  const select_query = `select product_image.image_path,product_image.image_id from product_image WHERE product_image.product_id='${product_id}';`;
  connection.query(select_query, (err, result) => {
    res.send(result);
  });
});

app.post("/product/update", auth, (req, res) => {
  let date = new Date();

  const created_at =
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

  const product_name = req.body.product_name;
  const product_name_amh = req.body.product_name_amh;
  const product_id = req.body.product_id;
  const price = req.body.price;
  const description = req.body.description;
  const description_amh = req.body.description_amh;
  const stock = req.body.stock;
  const catagory_id = req.body.catagory_id;
  const product_type_id = req.body.product_type_id;
  const supplier_id = req.body.supplier_id;

  const unit = req.body.unit;
  const target_group = req.body.target_group;
  const preorder = req.body.preorder;
  const date_order = req.body.date_order;

  const select_query = `UPDATE product SET name='${product_name}',name_amh='${product_name_amh}',price='${price}',Description='${description}',Description_amh='${description_amh}',unit='${unit}',Stock='${stock}}',catagory_id='${catagory_id}',product_type_id='${product_type_id}',updated_at='${created_at}' ,target_group='${target_group}',date_order='${date_order}',pre_order='${preorder}' WHERE product_id='${product_id}';`;
  connection.query(select_query, (err, result) => {
    if (result) {
      const update = `UPDATE product_supplier SET supplier_id='${supplier_id}' WHERE product_id='${product_id}';`;
      connection.query(update, (err, result) => {
        if (result) {
          res.send("successful");
        }
      });
    }
  });
});

app.post("/product/new", auth, upload.array("products", 12), (req, res) => {
  var date = new Date();
  const created_at =
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

  const product_name = req.body.product_name;
  const product_name_amh = req.body.product_name_amh;
  const price = req.body.price;
  const description = req.body.description;
  const description_amh = req.body.description_amh;
  const stock = req.body.stock;
  const catagory_id = req.body.catagory_id;
  const product_type_id = req.body.product_type_id;
  const supplier_id = req.body.supplier_id;

  const unit = req.body.unit;
  const target = req.body.target;
  const preorder = req.body.preorder;
  const orderdate = req.body.orderdate;
  const id = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
  const product_id = "PR" + id;

  const select_query = `INSERT INTO product(product_id, name,name_amh, price, Description,Description_amh,unit, Stock, catagory_id, product_type_id, created_at
            ,target_group,date_order,pre_order) 
        VALUES ('${product_id}','${product_name}','${product_name_amh}','${price}','${description}','${description_amh}','${unit}','${stock}','${catagory_id}','${product_type_id}','${created_at}','${target}','${orderdate}','${preorder}');`;

  connection.query(select_query, (err, result) => {
    const insert_relation = `INSERT INTO product_supplier(product_id,supplier_id) VALUES ('${product_id}','${supplier_id}');`;
    if (result) {
      connection.query(insert_relation, (err, result) => {
        if (result) {
          let mes = "";
          for (var i = 0; i < req.files.length; i++) {
            const insert_image = `INSERT INTO product_image(image_path,image_name, product_id) VALUES
                ('ecommerce/images/${req.files[i].filename}','${req.files[i].filename}','${product_id}');`;
            connection.query(insert_image, (err, result_final) => {
              if (result_final) {
                mes = "Upload Success";
              } else {
                mes = "Upload Err";
              }
            });
          }
          console.log(mes);
          res.send(mes);
        }
      });
    }
  });
});

app.post("/product/delete", auth, (req, res) => {
  const product_id = req.body.product_id;

  const select_query = `SELECT COUNT(*) product_id FROM cart WHERE product_id='${product_id}' and check_out_status='1';`;
  connection.query(select_query, (err, result) => {
    let count = result[0].product_id;

    if (count > 0) {
      res.send("fail");
    } else {
      const delete_from_cart = `DELETE FROM cart WHERE product_id='${product_id}' ;`;
      connection.query(delete_from_cart, (err, result) => {
        if (result) {
          const delete_from_product_supplier = `DELETE FROM product_supplier WHERE product_id='${product_id}';`;
          connection.query(delete_from_product_supplier, (err, result) => {
            const delete_from_product = `DELETE FROM product WHERE product_id='${product_id}';`;
            connection.query(delete_from_product, (err, result) => {
              res.send("ok");
            });
          });
        }
      });
    }
  });
});
app.post("/order/changestatus", auth, (req, res) => {
  const payment_status = req.body.payment_status;
  const order_id = req.body.order_id;

  //const select_query ="UPDATE supplier SET status=(?) WHERE suppiler_id=(?);"
  const select_query = `UPDATE product_order SET payment_status='${payment_status}' WHERE order_id='${order_id}';`;
  connection.query(select_query, (err, result) => {
    res.send(result);
  });
});
app.post("/order/change_delivery_status", auth, (req, res) => {
  const delivery_status = req.body.delivery_status;
  const order_id = req.body.order_id;

  //const select_query ="UPDATE supplier SET status=(?) WHERE suppiler_id=(?);"
  const select_query = `UPDATE product_order SET status='${delivery_status}' WHERE order_id='${order_id}';`;
  connection.query(select_query, (err, result) => {
    res.send(result);
  });
});
app.post("/order/assign", auth, (req, res) => {
  const order_id = req.body.order_id;

  const select_query = `SELECT longitude, latitude FROM product_order WHERE order_id=${order_id};`;
  connection.query(select_query, (err, result) => {
    if (result) {
      let longitude = result[0].longitude;

      let latitude = result[0].latitude;
      const select_distance = `SELECT distance FROM setting;`;
      connection.query(select_distance, (err, result) => {
        let distance = result[0].distance;
        const select_delivery = `SELECT 6371 * acos( cos( radians(${latitude}) ) * cos( radians(latitude) ) * cos( radians(${longitude}) -  radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians(latitude) ) )   AS distance,user_id, first_name, longtuid, latitude, address, last_name, middle_name, phone FROM delivery 
         WHERE 6371 * acos( cos( radians(${latitude}) ) * cos( radians(latitude) ) * cos( radians(longtuid) - 
    radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians(latitude) ) )   <= ${distance} ORDER BY distance ;`;
        connection.query(select_delivery, (err, result) => {
          res.send(result);
        });
      });
    } else {
      res.send("failed");
    }
  });
});
app.post("/delivery/assign", auth, (req, res) => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();

  today = yyyy + "-" + mm + "-" + dd;

  const order_id = req.body.order_id;
  const delivery_id = req.body.delivery_id;
  const select_query = `INSERT INTO delivery_service(order_id, user_id) VALUES ('${order_id}','${delivery_id}');`;
  connection.query(select_query, (err, result) => {
    if (result) {
      const select_distance = `UPDATE product_order SET status='assigned' ,updated_at='${today}' WHERE order_id=${order_id};`;
      connection.query(select_distance, (err, result) => {
        res.send(result);
      });
    }
  });
});
app.post("/catagory/delete", auth, (req, res) => {
  const catagory_id = req.body.catagory_id;

  const select_query = `SELECT COUNT(*) product_id FROM product WHERE catagory_id='${catagory_id}';`;
  connection.query(select_query, (err, result) => {
    let count = result[0].product_id;

    if (count > 0) {
      res.send("fail");
    } else {
      const delete_from_type = `DELETE FROM product_type WHERE catagory_id='${catagory_id}' ;`;
      connection.query(delete_from_type, (err, result) => {
        if (result) {
          const delete_from_catagory = `DELETE FROM catagory WHERE catagory_id='${catagory_id}' ;`;
          connection.query(delete_from_catagory, (err, result) => {
            res.send("ok");
          });
        }
      });
    }
  });
});
app.post("/supplier/delete", auth, (req, res) => {
  const supplier_id = req.body.supplier_id;

  const select_query = `SELECT COUNT(*) supplier_id FROM product_supplier INNER JOIN cart on cart.product_id=product_supplier.product_id INNER JOIN product_order on product_order.cart_id=cart.cart_id WHERE product_supplier.supplier_id='${supplier_id}' and cart.check_out_status='1' AND product_order.status <> 'delivered';`;
  connection.query(select_query, (err, result) => {
    let count = result[0].supplier_id;

    if (count > 0) {
      res.send("fail");
    } else {
      const select_product_id = `SELECT product_id FROM product_supplier WHERE supplier_id='${supplier_id}' ;`;
      connection.query(select_product_id, (err, result) => {
        for (let i = 0; i < result.length; i++) {
          let product_id = result[i].product_id;
          const delete_from_relation = `DELETE FROM product_supplier WHERE product_id='${product_id}' ;`;
          connection.query(delete_from_relation, (err, result) => {
            if (result) {
              const delete_from_product = `DELETE FROM product WHERE product_id='${product_id}' ;`;
              connection.query(delete_from_product, (err, result) => {});
            }
          });
        }
        const delete_from_supplier = `DELETE FROM supplier WHERE suppiler_id='${supplier_id}' ;`;
        connection.query(delete_from_supplier, (err, result) => {
          if (result) {
            res.send("ok");
          }
        });
      });
    }
  });
});

app.post("/type/delete", auth, (req, res) => {
  const type_id = req.body.type_id;

  const select_query = `SELECT COUNT(*) product_id FROM product WHERE product_type_id='${type_id}';`;
  connection.query(select_query, (err, result) => {
    let count = result[0].product_id;

    if (count > 0) {
      res.send("fail");
    } else {
      const delete_from_type = `DELETE FROM product_type WHERE product_type_id='${type_id}' ;`;
      connection.query(delete_from_type, (err, result) => {
        if (result) {
          res.send("ok");
        }
      });
    }
  });
});
app.get("/supplier", auth, (req, res) => {
  const select_query = "SELECT * FROM supplier;";
  connection.query(select_query, (err, result) => {
    res.send(result);
  });
});
app.post("/supplier/view", auth, (req, res) => {
  const userid = req.body.userid;
  const select_one =
    "SELECT business_name, bussiness_owner_name, company_registration_number, business_licence_image,  country, city, subcity, status, phone_number,tin_number,image_path FROM supplier WHERE id=(?);";
  connection.query(select_one, [userid], (err, result) => {
    res.send(result);
  });
});
var today = new Date();
var dd = String(today.getDate()).padStart(2, "0");
var mm = String(today.getMonth() + 1).padStart(2, "0");
var yyyy = today.getFullYear();

today = yyyy + "-" + mm + "-" + dd;
app.get("/dashboard/todayorder", auth, (req, res) => {
  const select_query =
    "SELECT COUNT(*) order_id  FROM product_order WHERE status='pending' AND createdt_at=(?);";
  connection.query(select_query, [today], (err, result) => {
    res.send(result);
  });
});
app.get("/distance", auth, (req, res) => {
  const select_distance = `SELECT distance FROM setting;`;
  connection.query(select_distance, (err, result) => {
    let distance = result[0].distance.toString();
    res.send(distance);
  });
});

app.get("/dashboard/suppliers", auth, (req, res) => {
  const select_query =
    "SELECT COUNT(*) suppiler_id FROM supplier WHERE status='Active';";
  connection.query(select_query, (err, result) => {
    res.send(result);
  });
});
app.get("/dashboard/users", auth, (req, res) => {
  const select_query = "SELECT COUNT(*) user_id FROM user;";
  connection.query(select_query, (err, result) => {
    res.send(result);
  });
});
app.get("/dashboard/delivery", auth, (req, res) => {
  const select_query = "SELECT COUNT(*) user_id FROM delivery ;";
  connection.query(select_query, (err, result) => {
    res.send(result);
  });
});

app.get("/users/all", auth, (req, res) => {
  const select_query =
    "SELECT ROW_NUMBER() OVER() AS no,id,user_id, phone_number, full_name,longtuide, latitude FROM user ;";
  connection.query(select_query, (err, result) => {
    res.send(result);
  });
});
app.get("/report", auth, (req, res) => {
  const select_query =
    "SELECT ROW_NUMBER() OVER() AS no,CONCAT(delivery.first_name,' ',delivery.last_name,' ',delivery.middle_name)full_name,product_order.order_id,delivery_service.delivered_at,product_order.total_price FROM delivery_service INNER JOIN delivery on delivery.user_id=delivery_service.user_id INNER JOIN product_order on product_order.order_id=delivery_service.order_id WHERE product_order.status='delivered';";
  connection.query(select_query, (err, result) => {
    res.send(result);
  });
});

app.post("/users/byid", auth, (req, res) => {
  const userid = req.body.userid;
  const select_query =
    "SELECT  phone_number, full_name,country,city, subcity, longtuide, latitude FROM user WHERE id=(?);";
  connection.query(select_query, [userid], (err, result) => {
    res.send(result);
  });
});
app.post("/delivery/byid", auth, (req, res) => {
  const userid = req.body.userid;
  const select_query =
    "SELECT CONCAT(first_name,' ',middle_name,' ',last_name) as full_name,address,phone,status FROM delivery WHERE user_id=(?);";
  connection.query(select_query, [userid], (err, result) => {
    res.send(result);
  });
});
app.post("/distance/update", auth, (req, res) => {
  const distance = req.body.distance;
  const select_query = `UPDATE setting SET distance='${distance}' ;`;
  connection.query(select_query, (err, result) => {
    res.send(result);
  });
});
app.get("/suppliers/all", auth, (req, res) => {
  const select_query =
    "SELECT ROW_NUMBER() OVER() AS no, id,suppiler_id, business_name, business_name_amh,bussiness_owner_name, country,city,subcity, status, phone_number,company_registration_number,tin_number,image_path FROM supplier;";
  connection.query(select_query, (err, result) => {
    res.send(result);
  });
});
app.get("/delivery/all", auth, (req, res) => {
  const select_query = `SELECT ROW_NUMBER() OVER() AS id, CONCAT( first_name,' ',last_name,' ',middle_name)full_name,address,user_id,longtuid,latitude,phone,status from delivery;`;
  connection.query(select_query, (err, result) => {
    res.send(result);
  });
});

app.get("/suppliers/byid", auth, (req, res) => {
  const suppiler_id = req.body.supplier_id;
  const select_query =
    "SELECT suppiler_id, business_name, bussiness_owner_name, company_registration_number, business_licence_image, country, city, subcity, status, phone_number, latitude, longitude, bussiness_type_id FROM supplier WHERE suppiler_id=(?);";
  connection.query(select_query, [supplier_id], (err, result) => {
    res.send(result);
  });
});
app.post("/suppliers/changestatus", auth, (req, res) => {
  const status_supplier = req.body.status_supplier;
  const user_id = req.body.userid;
  //const select_query ="UPDATE supplier SET status=(?) WHERE suppiler_id=(?);"
  const select_query = `UPDATE supplier SET status='${status_supplier}' WHERE suppiler_id='${user_id}';`;
  connection.query(select_query, [status_supplier, user_id], (err, result) => {
    res.send(result);
  });
});
app.post("/delivery/changestatus", auth, (req, res) => {
  const status_delivery = req.body.status_delivery;
  const user_id = req.body.userid;
  const select_query = `UPDATE delivery SET status='${status_delivery}' WHERE user_id='${user_id}';`;
  connection.query(select_query, (err, result) => {
    res.send(result);
  });
});

app.post("/delivery/new", auth, (req, res) => {
  min = 100000;
  max = 999999;
  sup_id = Math.floor(Math.random() * (max - min + 1)) + min;
  user_id_new = "DE" + sup_id;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const middlename = req.body.middlename;
  const phone = req.body.phone;
  const userpassword = req.body.userpassword;
  const address = req.body.address;
  const longtuide = req.body.longtuide;
  const latitude = req.body.latitude;
  let hash_password;
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(userpassword, salt, function (err, hash) {
      global.hash_password = hash.replace("$2b$", "$2y$");
    });
  });
  const select_query =
    "INSERT INTO delivery(user_id,first_name, longtuid, latitude,address,last_name,middle_name,phone,password)  VALUES ((?),(?),(?),(?),(?),(?),(?),(?),(?));";
  connection.query(
    select_query,
    [
      user_id_new,
      firstname,
      longtuide,
      latitude,
      address,
      lastname,
      middlename,
      phone,
      hash_password,
    ],
    (err, result) => {
      const insert_relation =
        "INSERT INTO users(user_id, phone_number, password, role) VALUES ((?),(?),(?),(?)) ;";
      connection.query(
        insert_relation,
        [user_id_new, phone, hash_password, "delivery"],
        (err, result) => {
          res.send(result);
        }
      );
    }
  );
});

app.post("/suppliers/new", auth, upload.single("file"), (req, res) => {
  var min = 100000;
  var max = 999999;
  sup_id = Math.floor(Math.random() * (max - min + 1)) + min;
  supplier_id_new = "SU" + sup_id;
  if (!req.file) {
    res.send("failed");
  } else {
    const business_name = req.body.business_name;
    const business_name_amh = req.body.business_name_amh;
    const business_location = req.body.business_location;
    const city = req.body.city;
    const subcity = req.body.subcity;
    const bussiness_owner_name = req.body.bussiness_owner_name;
    const phone = req.body.phone;
    const business_type = req.body.bussiness_type;
    const registration_no = req.body.registration_no;
    const user_phone = req.body.user_phone;
    const user_password = req.body.user_password;
    const longtuide = req.body.longtuide;
    const latitude = req.body.latitude;
    const tin_number = req.body.tin_number;
    const type = req.body.type;

    bcrypt.hash(user_password, 10, (err, hash) => {
      hash = hash.replace("$2b$", "$2y$");
      const select_query =
        "INSERT INTO supplier(suppiler_id, business_name,business_name_amh, bussiness_owner_name, company_registration_number, user_name, user_password, city, subcity,phone_number, latitude, longitude,address,bussiness_type_id,image_path,image_name,tin_number,type) VALUES ((?),(?),(?),(?),(?),(?),(?),(?),(?), (?),(?),(?),(?),(?),(?),(?),(?),(?));";

      connection.query(
        select_query,
        [
          supplier_id_new,
          business_name,
          business_name_amh,
          bussiness_owner_name,
          registration_no,
          user_phone,
          hash,
          city,
          subcity,
          phone,
          latitude,
          longtuide,
          business_location,
          business_type,
          "ecommerce/images/" + req.file.filename,
          req.file.filename,
          tin_number,
          type,
        ],
        (err, result) => {
          const insert_relation =
            "INSERT INTO users(user_id, phone_number, password, role) VALUES ((?),(?),(?),(?)) ;";
          connection.query(
            insert_relation,
            [supplier_id_new, user_phone, hash, "supplier"],
            (err, result) => {
              if (result) {
                res.send("successful");
              } else {
                res.send("failed");
              }
            }
          );
        }
      );
    });
  }
});
business_type = "new";
app.get("/business/new", auth, (req, res) => {
  const select_query =
    "INSERT INTO bussiness_type( bussiness_type_name) VALUES ((?));";
  connection.query(select_query, [business_type], (err, result) => {
    res.send(result);
  });
});

app.get("/orders/all", auth, (req, res) => {
  const select_query =
    "SELECT ROW_NUMBER() OVER() AS id,o.order_id,o.status,o.total_price,o.createdt_at,o.payment_status,p.name,p.Description,p.price,s.business_name,c.multi_vendor,o.address,o.phone_number,c.quantity FROM product_order o INNER JOIN cart c ON c.cart_id = o.cart_id  INNER JOIN product p ON c.product_id=p.product_id INNER JOIN supplier s WHERE s.suppiler_id=c.supplier_id ;";
  connection.query(select_query, (err, result) => {
    res.send(result);
  });
});
app.post("/change_password", auth, async (req, res) => {
  var new_password = req.body.password;
  let encryptedPassword = await bcrypt.hash(new_password, 10);
  const select_query = `UPDATE users SET password='${encryptedPassword}' WHERE role='admin' and user_id ='AD0301' ;`;
  connection.query(select_query, (err, result) => {
    res.send(result);
  });
});
function auth(req, res, next) {
  if (token !== "expired") {
    const decoded = jwt.verify(token, config.TOKEN_KEY, (err, verified) => {
      if (err) {
        return res.status(404).send("Invalid Token");
      } else {
        req.user = verified;
        return next();
      }
    });
    //req.user = decoded;
  } else {
    return res.status(403).send("A token is required for authentication");
  }
}

app.listen(3001, () => {
  console.log("running in port 3001");
});
