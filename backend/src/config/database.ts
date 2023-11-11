import mongoose from "mongoose";

async function connectToDatabase() {
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

export default connectToDatabase;
