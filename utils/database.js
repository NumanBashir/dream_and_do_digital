import mongoose from "mongoose";

let isConnected = false;
let MONGODB_URI = "mongodb+srv://sportybashir:password123!@dreamanddodigitalcluste.qo9qu.mongodb.net/?retryWrites=true&w=majority&appName=DreamAndDoDigitalCluster"

export const connectToDB = async () => {
  console.log("Connecting to MongoDB...");
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: "DreamAndDoDigital",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    console.log("MongoDB is connected");
  } catch (error) {
    console.log("MongoDB connection failed", error);
  }
};
