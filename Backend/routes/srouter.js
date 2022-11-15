import expess from "express";
import Product from "../Models/productModel.js";
import data from "../data.js";
import User from "../Models/UserModel.js";
const seedRoute = expess.Router();

seedRoute.get("/", async (req, res) => {
  await Product.remove({});
  const createdProduct = await Product.insertMany(data.products);
  await Product.remove({});
  const createdUser = await User.insertMany(data.users);
  res.send({ createdProduct, createdUser });
});
export default seedRoute;
