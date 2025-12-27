import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGO_CONNECTION_STRING || 'mongodb://localhost:27017/profile';

export default async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(MONGODB_URI);
}