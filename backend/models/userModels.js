import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    profilePic: { type: String, default: "" }, //here there will be image url which we will upload on cloudinary
    profilePublicId: { type: String, default: "" }, //for uploading image so so to deleted old image even we wnat to delete it should get deletd fully becoz in cloudinary its getting upload so to delete from there also we store this id
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    token: { type: String, default: null },
    isVerified: { type: Boolean, default: false },
    isLoggedIn: { type: Boolean, default: false },
    otp: { type: String, default: null },
    otpExpiry: { type: Date, default: null },
    address: { type: String },
    city: { type: String },
    zipCode: { type: String },
    phoneNo: { type: String },
  },
  { timestamps: true },
); // by putting timestamp we will get created and updated at date n time

export const User = mongoose.model("User", userSchema);
