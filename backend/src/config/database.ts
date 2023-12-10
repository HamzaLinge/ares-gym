import mongoose from "mongoose";

export async function openDatabaseConnection() {
  try {
    const mongodbURL = process.env.MONGODB_URI as string;
    await mongoose.connect(mongodbURL);
    console.log(
      `Successfully connected to Database${
        process.env.NODE_ENV === "test" ? " Test" : ""
      }`
    );
  } catch (error) {
    throw new Error(`Error connecting to Mongoose: ${error}`);
  }
}

export async function closeDatabaseConnection() {
  try {
    if (process.env.NODE_ENV === "test") {
      // await mongoose.connection.dropDatabase();
    }
    await mongoose.disconnect();
    console.log(
      `Successfully closed Database${
        process.env.NODE_ENV === "test" ? " Test" : ""
      }`
    );
  } catch (error) {
    throw new Error(`Error disconnecting from Mongoose: ${error}`);
  }
}
