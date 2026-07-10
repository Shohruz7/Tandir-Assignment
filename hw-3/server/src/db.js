import mongoose from "mongoose";

// one shared connection for the whole process
export async function connectDB(uri) {
  if (!uri) throw new Error("MONGODB_URI is not set. Add it to server/.env");
  mongoose.set("strictQuery", true);
  await mongoose.connect(uri);
  console.log("MongoDB connected:", mongoose.connection.host);
  return mongoose.connection;
}
