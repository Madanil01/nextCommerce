import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Please Provide a Name"],
  },
  price: {
    type: Number,
    require: [true, "Please Provide a Price"],
  },
  desc: {
    type: String,
    required: [true, "Please Provide a Description"],
  },
  category: {
    type: String,
    require: [true, "Please Provide a CategoryId"],
  },
  subCategory: {
    type: String,
    require: [true, "Please Provide a CategoryId"],
  },
  image: {
    type: String,
    require: [true, "Please Provide a Image"],
  },
  url: {
    type: String,
    require: [true, "Please Provide a Url"],
  },
});

const Product = mongoose.models.products || mongoose.model("products", productSchema);
export default Product;
