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
app.get("/api/products/slug/:slug", (req, res) => {
  const product = data.products.find((x) => x.slug === req.params.slug);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Nroduct Not Found" });
  }
});
app.get("/api/products/:id", (req, res) => {
  const product = data.products.find((x) => x._id === req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Nroduct Not Found" });
  }
});
const port = 5000;

app.listen(port, () => {
  console.log(`Server run at http://localhost:${port}`);
});
