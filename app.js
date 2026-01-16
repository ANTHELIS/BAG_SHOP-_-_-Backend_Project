const express = require('express');
const app = express();
const dbgr = require("debug")("development:server");
const config = require('config');
const dotenv = require('dotenv')
dotenv.config()
const connectToDB = require('./config/db');
connectToDB();
// Use environment variable first, then config, then default to 3000
const PORT = process.env.PORT || (config.has("PORT") ? config.get("PORT") : null) || 3000;
const cookieParser = require('cookie-parser');
const path = require('path');
const expressSession = require("express-session");
const flash = require("connect-flash");

const usersRouter = require("./routes/usersRouter");
const ownersRouter = require("./routes/ownersRouter");
const productsRouter = require("./routes/productsRouter");
// const paymentRouter = require("./routes/paymentRouter");


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSession({
  secret: process.env.EXPRESS_SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));
app.use(flash());
app.set("view engine", "ejs");

app.use("/", usersRouter);
app.use("/owners", ownersRouter);
app.use("/products", productsRouter);
// app.use("/payment", paymentRouter);



app.listen(PORT, ()=>{
    dbgr(`Server is running on port ${PORT}`);
})
