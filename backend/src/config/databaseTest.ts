import mongoose from "mongoose";

export async function openDatabaseTestConnection() {
  try {
    const mongodbURI = process.env.MONGODB_URI as string;
    console.log(mongodbURI);
    await mongoose.connect(mongodbURI);
    console.log("Successful connecting to the Test Database");
  } catch (error) {
    throw new Error(`Error connecting to Test Database (Mongoose): ${error}`);
  }
}

export async function closeDatabaseTestConnection() {
  try {
    // await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
    console.log("Test Database connection closed");
  } catch (error) {
    throw new Error(
      `Error disconnecting from Test Database (Mongoose): ${error}`
    );
  }
}
