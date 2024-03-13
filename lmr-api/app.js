var createError = require('http-errors');
var express = require('express');
var fs = require('fs');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const ImageWhitelist = [
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/webp'
]
const multer = require('multer')
const upload = multer({
  dest: '/home/oipoelqh/public_html/construction/LMR/assets/uploads',
  fileFilter: (req, file, cb) => {
    if (!ImageWhitelist.includes(file.mimetype)) {
      return cb(new Error('file is not allowed'));
    }

    cb(null, true)
  }
})

var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'uploads')));

// app.use('/api', require('./routes/api'));

const db = require('./db/lmrDb');

db.connect(function (error) {
  if (error) {
    console.log("Error Connecting to DB.");
  } else {
    console.log("successfully Connected to DB.");
  }
});

app.get("/construction/LMR/API/api/ping", (req, res) => {
  res.send({message:'pong'});
});

// Endpoint for user Admin login
app.post('/construction/LMR/API/api/user/login', (req, res) => {
  const { username, password } = req.body;

  db.query('SELECT * FROM admin_login WHERE username = ?', [username], (error, results) => {
    if (error) throw error;

    if (results.length > 0) {
      const user = results[0];
      if (user.password === password) {
        res.send({ result: user, status: true, message: "Login successful" });
      } else {
        res.send({ status: false, message: "Invalid username or password" });
      }
    } else {
      res.send({ status: false, message: "User not found" });
    }
  });
});

// Endpoint for user User login
app.post('/construction/LMR/API/api/user/userlogin', (req, res) => {
  const { username, password } = req.body;

  db.query('SELECT * FROM user WHERE email = ?', [username], (error, results) => {
    if (error) throw error;

    if (results.length > 0) {
      const user = results[0];
      if (user.password === password) {
        res.send({ result: user, status: true, message: "Login successful" });
      } else {
        res.send({ status: false, message: "Invalid username or password" });
      }
    } else {
      res.send({ status: false, message: "User not found" });
    }
  });
});

// Endpoint for user Supplier login
app.post('/construction/LMR/API/api/user/supplierlogin', (req, res) => {
  const { username, password } = req.body;

  db.query('SELECT * FROM supplier WHERE email = ?', [username], (error, results) => {
    if (error) throw error;

    if (results.length > 0) {
      const user = results[0];
      if (user.password === password) {
        res.send({ result: user, status: true, message: "Login successful" });
      } else {
        res.send({ status: false, message: "Invalid username or password" });
      }
    } else {
      res.send({ status: false, message: "User not found" });
    }
  });
});

//Create the User Records

app.post("/construction/LMR/API/api/user/add", (req, res) => {
  let details = {
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    address: req.body.address,
    password: req.body.password,
    image: req.body.image,
  };
  let sql = "INSERT INTO user SET ?";
  db.query(sql, details, (error) => {
    if (error) {
      res.send({ status: false, message: "User created failed" });
    } else {
      res.send({ status: true, message: "User created successfully" });
    }
  });
});


//Create the Supplier Records

app.post("/construction/LMR/API/api/supplier/add", (req, res) => {
  let details = {
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    address: req.body.address,
    password: req.body.password,
    image: req.body.image,
  };
  let sql = "INSERT INTO supplier SET ?";
  db.query(sql, details, (error) => {
    if (error) {
      res.send({ status: false, message: "User created failed" });
    } else {
      res.send({ status: true, message: "User created successfully" });
    }
  });
});

//view the Records User

app.get("/construction/LMR/API/api/user", (req, res) => {
  var sql = "SELECT * FROM user";
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB");
    } else {
      res.send({ status: true, data: result });
    }
  });
});


//view the Records Supplier

app.get("/construction/LMR/API/api/supplier", (req, res) => {
  var sql = "SELECT * FROM supplier";
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB");
    } else {
      res.send({ status: true, data: result });
    }
  });
});


//Search the Records for User

app.get("/construction/LMR/API/api/user/:id", (req, res) => {
  var userid = req.params.id;
  var sql = "SELECT * FROM user WHERE id=" + userid;
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB");
    } else {
      res.send({ status: true, data: result });
    }
  });
});


//Search the Records for Supplier

app.get("/construction/LMR/API/api/supplier/:id", (req, res) => {
  var userid = req.params.id;
  var sql = "SELECT * FROM supplier WHERE id=" + userid;
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB");
    } else {
      res.send({ status: true, data: result });
    }
  });
});


//Update the Records for User

app.post("/construction/LMR/API/api/user/update/:id", (req, res) => {
  let sql = "UPDATE user SET name='" +
    req.body.name +
    "', phone='" +
    req.body.phone +
    "', email='" +
    req.body.email +
    "', address='" +
    req.body.address +
    "', password='" +
    req.body.password +
    "', image='" +
    req.body.image +
    "'  WHERE id=" +
    req.params.id;

  let a = db.query(sql, (error, result) => {
    if (error) {
      res.send({ status: false, message: "User Updated Failed" });
    } else {
      res.send({ status: true, message: "User Updated successfully" });
    }
  });
});


//Update the Records for Supplier

app.post("/construction/LMR/API/api/supplier/update/:id", (req, res) => {
  let sql = "UPDATE supplier SET name='" +
    req.body.name +
    "', phone='" +
    req.body.phone +
    "', email='" +
    req.body.email +
    "', address='" +
    req.body.address +
    "', password='" +
    req.body.password +
    "', image='" +
    req.body.image +
    "'  WHERE id=" +
    req.params.id;

  let a = db.query(sql, (error, result) => {
    if (error) {
      res.send({ status: false, message: "Supplier Updated Failed" });
    } else {
      res.send({ status: true, message: "Supplier Updated successfully" });
    }
  });
});

//Delete the Records for User

app.delete("/construction/LMR/API/api/user/delete/:id", (req, res) => {
  let sql = "DELETE FROM user WHERE id=" + req.params.id + "";
  let query = db.query(sql, (error) => {
    if (error) {
      res.send({ status: false, message: "User Deleted Failed" });
    } else {
      res.send({ status: true, message: "User Deleted successfully" });
    }
  });
});


//Delete the Records for Supplier

app.delete("/construction/LMR/API/api/supplier/delete/:id", (req, res) => {
  let sql = "DELETE FROM supplier WHERE id=" + req.params.id + "";
  let query = db.query(sql, (error) => {
    if (error) {
      res.send({ status: false, message: "Supplier Deleted Failed" });
    } else {
      res.send({ status: true, message: "Supplier Deleted successfully" });
    }
  });
});


//view the Records User

app.get("/construction/LMR/API/api/ticket", (req, res) => {
  var sql = `SELECT
  T.*,
  S.image AS s_image,
  U.name AS u_name,
  U.image AS u_image
FROM
  ticket AS T
LEFT JOIN supplier AS S
ON
  T.supplier = S.id
LEFT JOIN USER AS U
ON
  T.assigned = U.id`;
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB");
    } else {
      res.send({ status: true, data: result });
    }
  });
});

//Add Ticket Records

app.post("/construction/LMR/API/api/ticket/add", (req, res) => {
  let details = {
    ref_order: req.body.commande,
    description: req.body.description,
    assigned: req.body.user,
    supplier: req.body.sup,
    status: req.body.status,
  };
  let sql = "INSERT INTO ticket SET ?";
  db.query(sql, details, (error) => {
    if (error) {
      res.send({ status: false, message: "Ticket created failed" });
    } else {
      res.send({ status: true, message: "Ticket created successfully" });
    }
  });
});

//Update the Records for Ticket

app.post("/construction/LMR/API/api/ticket/update/:id", (req, res) => {
  let sql = "UPDATE ticket SET ref_order='" +
    req.body.commande +
    "', description='" +
    req.body.description +
    "', assigned='" +
    req.body.user +
    "', supplier='" +
    req.body.sup +
    "', status='" +
    req.body.status +
    "'  WHERE ticket_id=" +
    req.params.id;

  let a = db.query(sql, (error, result) => {
    if (error) {
      res.send({ status: false, message: "Ticket Updated Failed" });
    } else {
      res.send({ status: true, message: "Ticket Updated successfully" });
    }
  });
});

//Search the Ticket Records

app.get("/construction/LMR/API/api/ticket/:id", (req, res) => {
  var userid = req.params.id;
  var sql = "SELECT * FROM ticket WHERE ticket_id=" + userid;
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB");
    } else {
      res.send({ status: true, data: result });
    }
  });
});

//Delete the Records for Ticket

app.delete("/construction/LMR/API/api/ticket/delete/:id", (req, res) => {
  let sql = "DELETE FROM ticket WHERE ticket_id=" + req.params.id + "";
  let query = db.query(sql, (error) => {
    if (error) {
      res.send({ status: false, message: "Ticket Deleted Failed" });
    } else {
      res.send({ status: true, message: "Ticket Deleted successfully" });
    }
  });
});


app.post('/construction/LMR/API/api/file/single', upload.single('thumbnail'), (req, res, next) => {
  var fileExt = path.extname(req.file.originalname);
  fs.renameSync(`${req.file.path}`, `${req.file.path}${fileExt}`);

  res.json({
    success: true,
    fileName: `${req.file.filename}${fileExt}`
  })
});














// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    message:"error"
  })
});

module.exports = app;
