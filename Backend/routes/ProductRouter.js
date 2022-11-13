import expess from "express";
import Product from "../Models/productModel.js";

const ProductRoute = expess.Router();

ProductRoute.get("/", async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

/*ProductRoute.get("/api/products", (req, res) => {
    res.send(data.products);
  });*/
ProductRoute.get("/slug/:slug", async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Nroduct Not Found" });
  }
});
ProductRoute.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Nroduct Not Found" });
  }
});
export default ProductRoute;
