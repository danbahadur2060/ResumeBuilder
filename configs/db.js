import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  const MONGODB_URI = process.env.MONGODB_URI;

  // Avoid crashing during build when env isn't present; throw only when actually connecting at runtime.
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined");
  }

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const options = {
      dbName: process.env.MONGODB_DBNAME || "aiResumebuilder",
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
