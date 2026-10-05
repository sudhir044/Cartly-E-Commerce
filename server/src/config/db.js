import mongoose from "mongoose";
import dns from "dns";
import dotenv from "dotenv";

dotenv.config();

// Fix for querySrv ECONNREFUSED issues on local ISP DNS
dns.setServers(["8.8.8.8", "8.8.4.4"]);

export const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`\n MongoDB Connected: ${connection.connection.host}`);
    }
    catch (error) {
        console.log("Error connecting to MongoDB", error.message);
        process.exit(1);
    }
}


