import mongoose from "mongoose";
import dotenv from "dotenv";
import { error } from "node:console";

dotenv.config();

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URL as string);
    console.log("Database has been connected");
  } catch {
    console.error("Database Error: ", error);
    process.exit(1);
  }
}
