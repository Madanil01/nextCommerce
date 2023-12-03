import mongoose from "mongoose";

const sizeSchema = new mongoose.Schema({
  sizeData: {
    type: String,
    require: [true, "Please Provide a Size"],
  },
});

const Size =
  mongoose.models.sizes || mongoose.model("sizes", sizeSchema);
export default Size;
