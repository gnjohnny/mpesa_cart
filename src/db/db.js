import mongoose from "mongoose";

export const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("connected to database at: ", conn.connection.host)
    } catch (error) {
        console.log("Error connecting to db", error.message)
        process.exit(1)
    }
}