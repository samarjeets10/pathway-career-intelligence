const mongoose = require("mongoose");
const MONGODB_URI = process.env.MONGODB_URI;

async function connectDB() {

   try {
    
      const connectionInstance = await mongoose.connect(MONGODB_URI);
      console.log(`Database connected! : DB Host: ${connectionInstance.connection.host}`);

   } catch (error) {
      console.log("Failed to connection Database :", error);
      throw error;
   }

};


module.exports = connectDB;