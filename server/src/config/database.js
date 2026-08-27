const mongoose = require("mongoose");

async function connectDB() {

   try {
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("database connected successfully");

   } catch (error) {
    console.log("failed to connection database :", error.message);
   }

}


module.exports = connectDB;