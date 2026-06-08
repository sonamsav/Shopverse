import mongoose from "mongoose";


// this is db code where we are connecting backedn to db
const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URL}/Shopverse`);
    console.log(process.env.MONGO_URL);
    console.log("MongoDB Connected");
    console.log("DB Name:", mongoose.connection.name);
  } catch (error) {
    console.log("Connection failed:", error.message);
  }
};

export default connectDB;
