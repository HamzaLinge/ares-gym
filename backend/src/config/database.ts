import mongoose from "mongoose";

export async function openDatabaseConnection() {
  try {
    const mongodbURL = (
      process.env.NODE_ENV === "production"
        ? process.env.MONGODB_URL_ATLAS
        : process.env.MONGODB_URL_LOCAL
    ) as string;
    await mongoose.connect(mongodbURL);
    console.log("Successful connecting to the database");
  } catch (error) {
    throw new Error(`Error connecting to Mongoose: ${error}`);
  }
}

export async function closeDatabaseConnection() {
  try {
    await mongoose.disconnect();
    console.log("Database connection closed");
  } catch (error) {
    throw new Error(`Error disconnecting from Mongoose: ${error}`);
  }
}
