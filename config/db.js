const mongoose = require('mongoose');

const connectToDB = async ()=>{
    try {
        const connectionInstances = await mongoose.connect(`${process.env.MONGODB_URI}/baggy`);
        console.log(`\n DB connected \n DB Host: ${connectionInstances.connection.host}`);
        
    } catch (error) {
        console.log("mongoDB connection error: ", error);
        process.exit(1);
    }
}
module.exports = connectToDB;