const cors = require('cors');
const express = require("express");
const cookieParser = require('cookie-parser');
const errorMiddleware = require("./middleware/error").default;
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");
const session = require('express-session');

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
    credentials:true,
  }));

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

app.use(session({
  resave: false,
  saveUninitialized:false,
  secret:"session",
  cookie: {
    sameSite: 'none',
    secure:true
  }
}));
app.set('trust proxy', 1);

// routes
const products = require("./routes/productRoute");
const user = require('./routes/userRoutes');
const order = require('./routes/orderRoute'); 
const payment = require("./routes/paymentRoute");

app.use("/api/v1", products);
app.use('/api/v1', user);
app.use('/api/v1', order);
app.use('/api/v1', payment);

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

//middleware
app.use(errorMiddleware);

module.exports = app;