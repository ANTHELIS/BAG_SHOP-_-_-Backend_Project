const mongoose = require('mongoose');
const config = require('config');
const dbgr = require("debug")("development:mongoose");

function connectToDB () {
    mongoose.connect(`${config.get("MONGODB_URI")}/baggy`).then(()=>{
        dbgr("Conneted to DB");
    })
    .catch ((err)=>{
        dbgr(err);
    })
} 
    
module.exports = connectToDB;