import mongoose from "mongoose";

const connectDB = async () => {
    const mongodbURI = process.env.MONGODB_URI;

    if (!mongodbURI) {
        throw new Error("MONGODB_URI environment variable not set");
    }

    await mongoose.connect(mongodbURI, { dbName: "resume-builder" });
    console.log("Database connected successfully");
};

export default connectDB;