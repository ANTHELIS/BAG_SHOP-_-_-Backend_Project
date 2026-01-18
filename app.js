const express = require('express');
const app = express();
const dotenv = require('dotenv')
dotenv.config()
const connectToDB = require('./config/db');
connectToDB();
const PORT = process.env.PORT || 3000;
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

// 404 handler - must be after all routes
app.use((req, res, next) => {
    res.status(404).send(`
        <html>
            <head><title>404 - Not Found</title></head>
            <body style="font-family: Arial; text-align: center; padding: 50px;">
                <h1>404 - Page Not Found</h1>
                <p>The page you're looking for doesn't exist.</p>
                <a href="/" style="color: blue;">Go to Home</a>
            </body>
        </html>
    `);
});


app.listen(PORT, ()=>{
    console.log(`🚀 Server is running on port ${PORT}`);
})
