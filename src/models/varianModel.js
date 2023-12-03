import mongoose from "mongoose";

const varianSchema = new mongoose.Schema({
  size: {
    type: String,
    require: [true, "Please Provide a Size"],
  },
  color: {
    type: String,
    require: [true, "Please Provide a Price"],
  },
  productId: {
    type: String,
    require: [true, "Please Provide a ProductId"],
  },
  stock: {
    type: Number,
    require: [true, "Please Provide a stock"],
  },
  price: {
    type: Number,
    require: [true, "Please Provide a Price"],
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

const Varian = mongoose.models.varians || mongoose.model("varians", varianSchema);
export default Varian;
