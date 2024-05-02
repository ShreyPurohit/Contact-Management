import mongoose from "mongoose";

const connectionString: string = process.env.CONNECTION_STRING || "mongodb://localhost:27017/my-contacts-app"

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(connectionString)
        console.log("Database Connected", connect.connection.host, connect.connection.name)
    } catch (err) {
        console.error(err);
        process.exit(1)
    }
}

export default connectDB