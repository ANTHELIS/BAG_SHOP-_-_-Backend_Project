const mongoose = require('mongoose');
const config = require('config');
const dbgr = require("debug")("development:mongoose");

function connectToDB () {
    // Use environment variable or config, with env variable taking priority
    const mongoURI = process.env.MONGODB_URI || (config.has("MONGODB_URI") ? config.get("MONGODB_URI") : null);
    
    if (!mongoURI) {
        throw new Error("MONGODB_URI is not defined in environment variables or config");
    }
    
    // Add connection options for better stability
    const options = {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
    };
    
    // Check if URI already contains a database name or is a complete connection string
    // Railway and Atlas URLs with auth are complete, local MongoDB needs database name appended
    const connectionString = mongoURI.includes('mongodb://127.0.0.1') || mongoURI.includes('mongodb://localhost')
        ? `${mongoURI}/baggy`
        : mongoURI;
    
    mongoose.connect(connectionString, options).then(()=>{
        dbgr("Connected to DB");
        console.log("✅ MongoDB connected successfully");
    })
    .catch ((err)=>{
        dbgr(err);
        console.error("❌ MongoDB connection error:", err.message);
        console.error("Please check:");
        console.error("1. Your database credentials are correct");
        console.error("2. Your internet connection");
        console.error("3. Database service is running and accessible");
    })
} 
    
module.exports = connectToDB;