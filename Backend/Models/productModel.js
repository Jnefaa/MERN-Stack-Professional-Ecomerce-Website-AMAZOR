import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    image: { type: String },
    brand: { type: String },
    category: { type: String },
    descrition: { type: String },
    price: { type: Number },
    countInstock: { type: Number },
    raiting: { type: Number },
    numReviews: { type: Number },
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model("product", productSchema);
export default Product;
