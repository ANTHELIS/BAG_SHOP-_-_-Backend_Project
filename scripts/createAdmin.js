const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const readline = require('readline');
const ownerModel = require('../models/ownerModel');
require('dotenv').config();

// Create readline interface for user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to prompt user for input
const prompt = (question) => {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
};

// Connect to MongoDB
const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI;
        
        if (!mongoURI) {
            throw new Error('MONGODB_URI is not defined in .env file');
        }
        
        // Check if URI is local or remote
        const connectionString = mongoURI.includes('mongodb://127.0.0.1') || mongoURI.includes('mongodb://localhost')
            ? `${mongoURI}/baggy`
            : mongoURI;
        
        await mongoose.connect(connectionString);
        console.log('✅ Connected to MongoDB');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error.message);
        process.exit(1);
    }
};

// Create admin/owner
const createAdmin = async () => {
    try {
        console.log('\n========== CREATE ADMIN/OWNER ==========\n');
        
        // Check if an owner already exists
        const existingOwners = await ownerModel.find();
        if (existingOwners.length > 0) {
            const overwrite = await prompt('⚠️  An owner already exists. Do you want to create another one? (yes/no): ');
            if (overwrite.toLowerCase() !== 'yes') {
                console.log('❌ Operation cancelled.');
                return;
            }
        }
        
        // Get admin details
        const fullname = await prompt('Enter Full Name (min 3 characters): ');
        const email = await prompt('Enter Email (min 8 characters): ');
        const password = await prompt('Enter Password (min 5 characters): ');
        const gstin = await prompt('Enter GSTIN Number (optional, press Enter to skip): ');
        
        // Validate inputs
        if (!fullname || fullname.length < 3) {
            throw new Error('Fullname must be at least 3 characters');
        }
        if (!email || email.length < 8) {
            throw new Error('Email must be at least 8 characters');
        }
        if (!password || password.length < 5) {
            throw new Error('Password must be at least 5 characters');
        }
        
        // Hash password
        console.log('\n🔐 Hashing password...');
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        // Create owner
        console.log('📝 Creating admin/owner...');
        const owner = await ownerModel.create({
            fullname: fullname.trim(),
            email: email.trim().toLowerCase(),
            password: hashedPassword,
            gstin: gstin ? Number(gstin) : undefined
        });
        
        console.log('\n✅ Admin/Owner created successfully!');
        console.log('=====================================');
        console.log('📧 Email:', owner.email);
        console.log('👤 Name:', owner.fullname);
        console.log('🆔 ID:', owner._id);
        console.log('=====================================\n');
        console.log('You can now login at: /owners/login\n');
        
    } catch (error) {
        if (error.code === 11000) {
            console.error('\n❌ Error: Email already exists. Please use a different email.\n');
        } else {
            console.error('\n❌ Error creating admin:', error.message, '\n');
        }
    }
};

// Main function
const main = async () => {
    await connectDB();
    await createAdmin();
    
    rl.close();
    mongoose.connection.close();
    console.log('🔌 Database connection closed.');
    process.exit(0);
};

// Run the script
main();
