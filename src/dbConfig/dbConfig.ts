import mongoose from "mongoose";

export async function connect() {
    try {
        const uri = process.env.MONGO_URL;
        if (!uri) {
            throw new Error('MONGO_URL is not defined in environment variables');
        }

        await mongoose.connect(uri);
        const connection = mongoose.connection;

        connection.on('connected', ()=>{
            console.log("Connected to MongoDB");
        })

        connection.on('error', (err)=>{
            console.error("Error connecting to MongoDB:", err);
        })
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}