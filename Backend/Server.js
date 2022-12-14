import express from "express";
import cors from "express";
import data from "./data.js ";

const app = express();
app.use(cors());
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
app.get("/api/products", (req, res) => {
  res.send(data.products);
});

const port = 5000;

app.listen(port, () => {
  console.log(`Server run at http://localhost:${port}`);
});
