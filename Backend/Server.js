import express from "express";
import cors from "express";
import data from "./data.js ";
import mongoose from "mongoose";
import dotenv from "dotenv";
import seedRoute from "./routes/srouter.js";
import ProductRoute from "./routes/ProductRouter.js";
//import seedRouter from "./routes/seeRoutes";
dotenv.config();
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("connected to db ");
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();
app.use(cors());
app.use("/api/seed", seedRoute);
app.use("/api/products", ProductRoute);
//import cors from "express";
app.use(
  cors({
    origin: "http://localhost:3001",

    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  })
);

const port = 5000;

app.listen(port, () => {
  console.log(`Server run at http://localhost:${port}`);
});
