const mongoose = require('mongoose');
const config = require('config');
const dbgr = require("debug")("development:mongoose");

const connectToDB = async()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/baggy`);
        console.log("DB connection done !! HOST:",connectionInstance.connection.host );
    } catch (error) {
        console.log("DB connection erroe: ", error);
        process.exit(1);
    }
}
    
module.exports = connectToDB;