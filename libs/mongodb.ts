import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error(
        "❌ MONGODB_URI is not defined in environment variables!"
      );
    }

    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("✅ MongoDB Connected Successfully!");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
  }
};

export default connectMongoDB;
