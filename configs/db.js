import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "❌ Please define the MONGODB_URI environment variable inside .env.local"
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;
  
  if (!cached.promise) {
    const options = {
      dbName: "aiResumebuilder",
      bufferCommands: false,
      autoIndex: process.env.NODE_ENV !== "production", 
      maxPoolSize: 10, 
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000, 
      family: 4,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, options)
      .then((mongoose) => {
        if (process.env.NODE_ENV !== "production") {
          console.log("✅ MongoDB Connected Successfully");
        }
        return mongoose;
      })
      .catch((err) => {
        console.error("❌ MongoDB Connection Error:", err.message);
        throw err;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    throw err;
  }

  return cached.conn;
}
