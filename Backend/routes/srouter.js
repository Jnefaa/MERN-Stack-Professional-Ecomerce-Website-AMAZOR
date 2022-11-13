import expess from "express";
import Product from "../Models/productModel.js";
import data from "../data.js";
const seedRoute = expess.Router();

seedRoute.get("/", async (req, res) => {
  await Product.remove({});
  const createdProduct = await Product.insertMany(data.products);
  res.send({ createdProduct });
});
export default seedRoute;
