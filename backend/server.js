import dns from "dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);
import cloudinary from "./utils/cloudinary.js";

import express from "express";
import "dotenv/config";
import connectDB from "./database/db.js";
import userRoute from "./routes/userRoute.js";
import cors from "cors";
import productRoute from "./routes/productRoute.js";
import cartRoute from "./routes/cartRoute.js";
import paymentRoute from "./routes/paymentRoute.js";

const app = express();

const PORT = process.env.PORT || 3000;
//this is middleware
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/cart", cartRoute);
app.use("/api/v1/payment", paymentRoute);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is listening:${PORT}`);
});
